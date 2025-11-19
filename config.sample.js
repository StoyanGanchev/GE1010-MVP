// Optional client config loaded before app.js.
// Never store private API keys in this file—the secure key belongs in server/.env.
window.OPENAI_CONFIG = {
  model: "gpt-5-nano",
  proxyUrl: "/api/openai",
};
