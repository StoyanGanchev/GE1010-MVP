const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";
const FORCE_DEFAULT_TEMPERATURE = process.env.OPENAI_FORCE_DEFAULT_TEMPERATURE === "true";

const fetch = globalThis.fetch
  ? globalThis.fetch.bind(globalThis)
  : (...args) => import("node-fetch").then(({ default: fetchFn }) => fetchFn(...args));

if (!OPENAI_API_KEY) {
  console.warn(
    "[EDU-AI] OPENAI_API_KEY is not set. API requests will fail until the key is provided."
  );
}

app.use(express.json({ limit: "1mb" }));

// Prevent server files from being served by the static middleware
app.use("/server", (_req, res) => res.sendStatus(404));

const rootDir = path.resolve(__dirname, "..");
app.use(express.static(rootDir, { extensions: ["html"] }));

function requiresDefaultTemperature(modelName) {
  if (FORCE_DEFAULT_TEMPERATURE) return true;
  if (!modelName) return false;
  return /^gpt-5/i.test(modelName);
}

app.post("/api/openai", async (req, res) => {
  const { messages, temperature = 0.7, model = OPENAI_MODEL, requestType = "generic" } =
    req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required." });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
  }

  try {
    const bodyPayload = {
      model,
      messages,
    };

    if (!requiresDefaultTemperature(model)) {
      bodyPayload.temperature = temperature;
    }

    const response = await fetch(OPENAI_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(bodyPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || "OpenAI responded with an error.";
      console.error(`[OpenAI] ${requestType} failed: ${errorMessage}`);
      return res.status(response.status).json(data);
    }

    console.info(
      `[OpenAI] ${requestType} · model=${model} · prompt_tokens=${data?.usage?.prompt_tokens ?? "?"} · completion_tokens=${data?.usage?.completion_tokens ?? "?"}`
    );

    res.setHeader("Cache-Control", "no-store");
    return res.json(data);
  } catch (error) {
    console.error("[OpenAI proxy] Unexpected error:", error);
    return res.status(500).json({ error: "Failed to communicate with OpenAI." });
  }
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }
  if (req.method !== "GET") {
    return next();
  }
  return res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`EDU-AI server running on http://localhost:${PORT}`);
});
