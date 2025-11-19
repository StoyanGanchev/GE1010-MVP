"use strict";

const gradeLevels = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);
const aiPillars = [
  "Foundational Concepts",
  "Data & Algorithms",
  "Software Use",
  "Ethical Awareness",
  "Real-world Applications",
  "Innovation & Project Design",
  "Policy & Community Engagement",
];

const sampleLessons = [
  {
    id: "L-204",
    title: "Ethical AI Storytelling",
    topic: "Bias-aware narratives",
    gradeLevel: "Grade 7",
    pillar: "Ethical Awareness",
    language: "English",
    objectives: [
      "Identify at least two ways AI characters can reinforce or challenge stereotypes.",
      "Develop a short storyboard that includes human feedback for an AI system.",
      "Argue why transparency matters when AI helps tell stories.",
    ],
    outline: [
      "Hook: Analyze a viral AI-generated comic",
      "Mini-lesson: Ethics checklist for creative AI",
      "Studio: Students remix a story using constraints",
      "Reflection: Gallery walk with feedback cards",
    ],
    summary:
      "Students explore how AI storytelling tools make choices, then design a storyboard where the AI has to request human guardrails before it publishes.",
    details:
      "<p><strong>Why it matters:</strong> Storytellers increasingly rely on AI generators. Students review example prompts, find bias, and rewrite instructions to promote inclusion.</p><p><strong>Studio time:</strong> Teams select a scenario card (news, entertainment, education) and use structured prompts to co-create scenes with AI.</p><p><strong>Assessment:</strong> Learners submit a reflection that names one risk, one safeguard, and one big idea for ethical AI narratives.</p>",
    updated: "2024-05-06",
    syllabusName: "ethics-storyboard.pdf",
  },
  {
    id: "L-205",
    title: "Sensor Data Detectives",
    topic: "Patterns in neighborhood sensors",
    gradeLevel: "Grade 6",
    pillar: "Data & Algorithms",
    language: "English",
    objectives: [
      "Explain how labeled data improves anomaly detection.",
      "Use a simple decision tree to classify patterns in sensor logs.",
      "Compare model recommendations with human observations.",
    ],
    outline: [
      "Exploration: Examine real-world temperature + sound readings",
      "Concept build: Demo of decision tree branching",
      "Group challenge: Build an analog decision tree on poster paper",
      "Share-out: Debate when humans should override the AI alert",
    ],
    summary:
      "Learners become community data detectives by training a decision tree to flag unusual noise levels around campus.",
    details:
      "<p><strong>Hook:</strong> Students listen to a mystery audio clip collected by campus sensors.</p><p><strong>Learning path:</strong> Teams label raw data cards, feed them into a branching template, and test the model on surprise scenarios.</p><p><strong>Extension:</strong> Connect data quality issues to careers in smart city design.</p>",
    updated: "2024-05-03",
    syllabusName: null,
  },
  {
    id: "L-206",
    title: "AI Helpers in the Community",
    topic: "Design thinking for civic AI",
    gradeLevel: "Grade 8",
    pillar: "Policy & Community Engagement",
    language: "Arabic",
    objectives: [
      "Map a local civic challenge that could benefit from AI tools.",
      "Co-create guiding principles with stakeholders before building.",
      "Pitch a responsible AI concept and collect peer feedback.",
    ],
    outline: [
      "Warm-up: Gallery walk of current civic tech tools",
      "Empathy interviews: Students read community quotes",
      "Design sprint: Teams sketch an AI helper dashboard",
      "Pitch session: Share solution and risk mitigation plan",
    ],
    summary:
      "Students shift into civic innovators, drafting AI helpers that balance opportunity and community safeguards.",
    details:
      "<p><strong>Empathy first:</strong> Learners assign personas (parents, small business owners, teens) and surface needs.</p><p><strong>Design studio:</strong> Teams storyboard how the AI assistant collects data, flags bias, and routes decisions.</p><p><strong>Community lens:</strong> Students author a policy snippet describing oversight and transparency.</p>",
    updated: "2024-04-28",
    syllabusName: "community-ai-guide.docx",
  },
];

const sampleQuizzes = [
  {
    id: "Q-101",
    title: "Pattern Spotting Quiz",
    lessonId: "L-205",
    gradeLevel: "Grade 6",
    pillar: "Data & Algorithms",
    language: "English",
    questions: [
      {
        prompt: "Why is labeled data important for a decision tree?",
        options: [
          "It reduces the need for sensors.",
          "It lets the model learn how to branch on examples.",
          "It guarantees that predictions are always correct.",
        ],
        answer: 1,
      },
      {
        prompt: "A student notices the model keeps calling normal music an anomaly. What should they do first?",
        options: [
          "Collect more labeled examples of normal music.",
          "Lower the school noise policy.",
          "Turn off the sensors during the day.",
        ],
        answer: 0,
      },
      {
        prompt: "Which statement is true about human oversight?",
        options: [
          "Once trained, AI never needs human review.",
          "Humans should monitor predictions and override when needed.",
          "Humans should only check models once per year.",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "Q-102",
    title: "Ethical Storytelling Check",
    lessonId: "L-204",
    gradeLevel: "Grade 7",
    pillar: "Ethical Awareness",
    language: "English",
    questions: [
      {
        prompt: "What is one risk of AI-written dialogue?",
        options: [
          "AI always writes in perfect rhyme.",
          "Hidden bias can influence how characters are portrayed.",
          "AI refuses to write conversations.",
        ],
        answer: 1,
      },
      {
        prompt: "How can students build transparency into their stories?",
        options: [
          "Hide every reference to AI.",
          "Include a note describing how AI was guided.",
          "Let AI invent the entire plot with no review.",
        ],
        answer: 1,
      },
      {
        prompt: "Which safeguard keeps audiences informed?",
        options: [
          "Never sharing prompts.",
          "Documenting edits made after the AI draft.",
          "Deleting the AI file immediately.",
        ],
        answer: 1,
      },
    ],
  },
];

const sampleGrades = [
  { quizId: "Q-102", quizTitle: "Ethical Storytelling Check", score: 92, status: "Mastered", date: "2024-05-08" },
  { quizId: "Q-101", quizTitle: "Pattern Spotting Quiz", score: 84, status: "On Track", date: "2024-05-05" },
];

const analyticsState = {
  snapshot: {
    totalStudents: 128,
    classPerformance: 87,
    lessonCompletion: 78,
    lowGrades: 6,
    lessonsThisWeek: 4,
    averageGrade: 88,
  },
  attention: [
    { name: "Ali Abdullah", note: "5 lessons", mastery: 58 },
    { name: "Noura Said", note: "6 lessons", mastery: 62 },
    { name: "Lea M.", note: "7 lessons", mastery: 60 },
  ],
  topStudents: [
    { name: "Fatima Al Zaabi", note: "12 lessons", mastery: 95 },
    { name: "Mohammed Hassan", note: "11 lessons", mastery: 92 },
    { name: "Sara Ahmed", note: "10 lessons", mastery: 90 },
  ],
  recommendations: [
    "Share a 15-minute mini-lesson on bias spotting before the next quiz.",
    "Invite top performers to host a peer feedback roundtable.",
    "Send parent updates for students under 65% with targeted practice tips.",
  ],
};

const state = {
  lessons: [...sampleLessons],
  quizzes: [...sampleQuizzes],
  grades: [...sampleGrades],
  analytics: analyticsState,
};

const landingSection = document.getElementById("landing");
const teacherShell = document.getElementById("teacher-shell");
const studentShell = document.getElementById("student-shell");
const quizModal = document.getElementById("quiz-modal");
const modalBody = document.getElementById("modal-body");

const aiConfig = window.OPENAI_CONFIG || {};
const OPENAI_PROXY_URL = aiConfig.proxyUrl || "/api/openai";
const DEFAULT_MODEL = aiConfig.model || "gpt-5-nano";

async function callOpenAI(messages, temperature = 0.75, requestType = "generic") {
  const response = await fetch(OPENAI_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      temperature,
      model: DEFAULT_MODEL,
      requestType,
    }),
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // ignore JSON parse errors below; will surface generic message
  }
  if (!response.ok) {
    const errorMessage =
      payload?.error?.message || payload?.error || response.statusText || "Unknown proxy error";
    throw new Error(`OpenAI proxy error: ${errorMessage}`);
  }
  const content = payload?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI proxy did not return any content.");
  }
  return content.trim();
}

function extractJSONPayload(text) {
  if (!text) return "{}";
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const cleaned = (fenced ? fenced[1] : text).trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return cleaned;
  }
  return cleaned.slice(start, end + 1);
}

function parseJSONResponse(text, errorLabel) {
  try {
    return JSON.parse(extractJSONPayload(text));
  } catch (error) {
    throw new Error(`${errorLabel} - invalid JSON: ${error.message}`);
  }
}

function toggleGeneratingState(form, isGenerating, fallbackLabel = "Generate") {
  if (!form) return;
  const button = form.querySelector("button[type='submit']");
  if (!button) return;
  if (isGenerating) {
    button.dataset.original = button.textContent;
    button.textContent = "Generating...";
  } else {
    button.textContent = button.dataset.original || fallbackLabel;
    delete button.dataset.original;
  }
  button.disabled = isGenerating;
  form.classList.toggle("is-generating", isGenerating);
}

async function requestLessonFromOpenAI({ topic, grade, pillar, language, context }) {
  const userPrompt = `
You create AI literacy lessons for K-12 classrooms.
Lesson topic: ${topic}
Grade level: ${grade}
AI curriculum pillar: ${pillar}
Language: ${language}
Teacher notes: ${context || "None"}

Return JSON with this exact shape:
{
  "title": "Lesson title",
  "summary": "2 sentence overview",
  "objectives": ["objective 1", "objective 2", "objective 3"],
  "outline": ["step 1", "step 2", "step 3", "step 4"],
  "detailsHTML": "<p>HTML paragraphs that expand on the lesson.</p>"
}
Only return JSON. Keep the tone encouraging and use ${language}.
  `.trim();

  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "You are an instructional designer specializing in AI curriculum. Always obey the requested JSON schema.",
      },
      { role: "user", content: userPrompt },
    ],
    0.7,
    "lesson"
  );
  const parsed = parseJSONResponse(content, "Lesson generation");
  return {
    title: parsed.title,
    summary: parsed.summary,
    objectives: Array.isArray(parsed.objectives) ? parsed.objectives : null,
    outline: Array.isArray(parsed.outline) ? parsed.outline : null,
    details: parsed.detailsHTML || parsed.details || "",
  };
}

async function requestQuizFromOpenAI({ topic, grade, pillar, language, context }) {
  const userPrompt = `
Create a short quiz that checks understanding of a lesson.
Lesson topic: ${topic}
Grade level: ${grade}
AI curriculum pillar: ${pillar}
Language: ${language}
Teacher notes: ${context || "None"}

Return JSON with this structure:
{
  "title": "Quiz title",
  "questions": [
    {
      "prompt": "question stem in ${language}",
      "options": ["choice A", "choice B", "choice C"],
      "answerIndex": 0
    }
  ]
}
Use 3-4 questions, make distractors plausible, and ensure answerIndex is the zero-based index of the correct option. Only return JSON.
  `.trim();

  const content = await callOpenAI(
    [
      {
        role: "system",
        content:
          "You are an AI tutor who writes tight formative quizzes. Respond only with valid JSON following the schema you were given.",
      },
      { role: "user", content: userPrompt },
    ],
    0.65,
    "quiz"
  );
  const parsed = parseJSONResponse(content, "Quiz generation");
  return {
    title: parsed.title,
    questions: normalizeQuestionSet(parsed.questions),
  };
}

function normalizeQuestionSet(rawQuestions) {
  if (!Array.isArray(rawQuestions)) return null;
  const cleaned = rawQuestions
    .map((question) => {
      if (!question || !question.prompt) return null;
      const options = Array.isArray(question.options) ? question.options.filter(Boolean) : [];
      if (options.length < 2) return null;
      let answerIndex = Number(
        question.answerIndex ?? question.answer ?? question.correctIndex ?? question.correctOption
      );
      if (!Number.isFinite(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
        answerIndex = 0;
      }
      return {
        prompt: question.prompt,
        options,
        answer: answerIndex,
      };
    })
    .filter(Boolean);
  return cleaned.length ? cleaned : null;
}

function showLanding() {
  landingSection.classList.remove("hidden");
  teacherShell.classList.add("hidden");
  studentShell.classList.add("hidden");
}

function launchRole(role) {
  landingSection.classList.add("hidden");
  if (role === "teacher") {
    teacherShell.classList.remove("hidden");
    studentShell.classList.add("hidden");
    setActivePanel(teacherShell, "teacher-dashboard");
  } else {
    studentShell.classList.remove("hidden");
    teacherShell.classList.add("hidden");
    setActivePanel(studentShell, "student-lessons");
  }
}

function setActivePanel(shell, panelId) {
  const navButtons = shell.querySelectorAll(".nav-btn");
  const panels = shell.querySelectorAll(".panel");
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === panelId);
  });
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
}

function bindNavigation() {
  document.querySelectorAll("[data-launch]").forEach((btn) => {
    btn.addEventListener("click", () => launchRole(btn.dataset.launch));
  });

  document.querySelectorAll("[data-action='return-home']").forEach((btn) => {
    btn.addEventListener("click", showLanding);
  });

  document.querySelectorAll("[data-action='switch-student']").forEach((btn) => {
    btn.addEventListener("click", () => launchRole("student"));
  });

  document.querySelectorAll("[data-action='switch-teacher']").forEach((btn) => {
    btn.addEventListener("click", () => launchRole("teacher"));
  });

  [teacherShell, studentShell].forEach((shell) => {
    if (!shell) return;
    shell.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setActivePanel(shell, btn.dataset.target);
      });
    });
  });
}

function populateSelects() {
  document.querySelectorAll("select[name='grade']").forEach((select) => {
    select.innerHTML = gradeLevels.map((grade) => `<option value="${grade}">${grade}</option>`).join("");
    select.value = "Grade 7";
  });

  document.querySelectorAll("select[name='pillar']").forEach((select) => {
    select.innerHTML = aiPillars.map((pillar) => `<option value="${pillar}">${pillar}</option>`).join("");
    select.value = aiPillars[0];
  });
}

function renderDashboard() {
  const metricsContainer = document.getElementById("dashboard-metrics");
  const { snapshot } = state.analytics;
  const metrics = [
    {
      label: "Lessons created",
      value: state.lessons.length,
      caption: `+${snapshot.lessonsThisWeek} this week`,
      icon: "📘",
    },
    { label: "Active students", value: snapshot.totalStudents, caption: "Across 6 classes", icon: "👥" },
    { label: "Avg. quiz score", value: `${snapshot.averageGrade}%`, caption: "+5% from last month", icon: "🎯" },
    { label: "Topics explored", value: 18, caption: "Diverse AI strands", icon: "💡" },
  ];
  metricsContainer.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <span class="metric-icon">${metric.icon}</span>
          <h3>${metric.label}</h3>
          <strong>${metric.value}</strong>
          <span>${metric.caption}</span>
        </article>
      `
    )
    .join("");

  const recentContainer = document.getElementById("recent-lessons");
  const recent = [...state.lessons]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, 3);
  recentContainer.innerHTML = recent
    .map(
      (lesson) => `
        <article class="lesson-row">
          <div>
            <h4>${lesson.title}</h4>
            <div class="lesson-meta">
              <span>${lesson.gradeLevel}</span>
              <span>${lesson.pillar}</span>
              <span class="language-pill">${lesson.language.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <div class="lesson-date">
            <span>📅</span>
            <span>${lesson.updated}</span>
          </div>
          <button type="button" class="secondary outline" data-open-lesson="${lesson.id}">View</button>
        </article>
      `
    )
    .join("");
}

function createLessonListMarkup(lesson) {
  return `
    <li data-lesson="${lesson.id}">
      <strong>${lesson.title}</strong>
      <div class="pill">${lesson.gradeLevel} · ${lesson.pillar}</div>
    </li>
  `;
}

function renderLessonLists() {
  const teacherList = document.getElementById("lessons-list");
  const studentList = document.getElementById("student-lessons-list");
  const markup = state.lessons.map((lesson) => createLessonListMarkup(lesson)).join("");
  teacherList.innerHTML = markup;
  studentList.innerHTML = markup;
}

function renderLessonDetails(container, lesson) {
  if (!lesson) {
    container.innerHTML = "<p>Select a lesson to preview objectives and outline.</p>";
    return;
  }
  container.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.summary}</p>
    <p><strong>Grade:</strong> ${lesson.gradeLevel} · <strong>Pillar:</strong> ${lesson.pillar} · <strong>Language:</strong> ${lesson.language}</p>
    <h4>Learning Objectives</h4>
    <ul>${lesson.objectives.map((obj) => `<li>${obj}</li>`).join("")}</ul>
    <h4>Lesson Outline</h4>
    <ul>${lesson.outline.map((step) => `<li>${step}</li>`).join("")}</ul>
    <div class="lesson-details-body">${lesson.details}</div>
    ${
      lesson.syllabusName
        ? `<p class="pill">Syllabus: ${lesson.syllabusName}</p>`
        : `<p class="pill">No syllabus uploaded</p>`
    }
  `;
}

function bindLessonSelection() {
  const teacherList = document.getElementById("lessons-list");
  const studentList = document.getElementById("student-lessons-list");
  const recentList = document.getElementById("recent-lessons");
  const teacherDetails = document.getElementById("lesson-details");
  const studentDetails = document.getElementById("student-lesson-details");

  function handleClick(event, detailsContainer) {
    const item = event.target.closest("li[data-lesson]");
    if (!item) return;
    const lesson = state.lessons.find((entry) => entry.id === item.dataset.lesson);
    renderLessonDetails(detailsContainer, lesson);
  }

  teacherList.addEventListener("click", (event) => handleClick(event, teacherDetails));
  studentList.addEventListener("click", (event) => handleClick(event, studentDetails));
  if (recentList) {
    recentList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-lesson]");
      if (!button) return;
      const lesson = state.lessons.find((entry) => entry.id === button.dataset.openLesson);
      renderLessonDetails(teacherDetails, lesson);
    });
  }
}

function renderQuizzes() {
  const teacherContainer = document.getElementById("quiz-list");
  teacherContainer.innerHTML = state.quizzes
    .map(
      (quiz) => `
        <article class="card">
          <h4>${quiz.title}</h4>
          <p>${quiz.questions.length} questions · ${quiz.gradeLevel}</p>
          <div class="pill">${quiz.pillar}</div>
          <small>Language: ${quiz.language}</small>
          <div class="card-actions">
            <button type="button" class="secondary outline" data-preview-quiz="${quiz.id}">View test</button>
          </div>
        </article>
      `
    )
    .join("");

  const studentContainer = document.getElementById("student-quiz-list");
  studentContainer.innerHTML = state.quizzes
    .map(
      (quiz) => `
        <article class="card">
          <h4>${quiz.title}</h4>
          <p>${quiz.gradeLevel} · ${quiz.pillar}</p>
          <button class="primary" data-take-quiz="${quiz.id}">Take quiz</button>
        </article>
      `
    )
    .join("");
}

function renderGrades() {
  const tbody = document.getElementById("grades-body");
  tbody.innerHTML = state.grades
    .map(
      (grade) => `
        <tr>
          <td>${grade.quizTitle}</td>
          <td class="${grade.score >= 70 ? "score-pass" : "score-review"}">${grade.score}%</td>
          <td>${grade.status}</td>
          <td>${grade.date}</td>
        </tr>
      `
    )
    .join("");
}

function getPillarCounts() {
  const counts = aiPillars.reduce((acc, pillar) => ({ ...acc, [pillar]: 0 }), {});
  state.lessons.forEach((lesson) => {
    counts[lesson.pillar] += 1;
  });
  const max = Math.max(...Object.values(counts), 1);
  return Object.entries(counts).map(([pillar, value]) => ({
    pillar,
    value,
    percent: Math.round((value / max) * 100),
  }));
}

function renderAnalytics() {
  const { snapshot, attention, topStudents } = state.analytics;
  const metricsContainer = document.getElementById("analytics-metrics");
  const metricData = [
    { label: "Total students", value: snapshot.totalStudents, caption: "Pilot cohort" },
    { label: "Class performance", value: `${snapshot.classPerformance}%`, caption: "Mean mastery" },
    { label: "Lesson completion", value: `${snapshot.lessonCompletion}%`, caption: "Student log-ins" },
    { label: "Students <65%", value: snapshot.lowGrades, caption: "Needs attention" },
  ];
  metricsContainer.innerHTML = metricData
    .map(
      (metric) => `
        <article class="metric-card">
          <h3>${metric.label}</h3>
          <strong>${metric.value}</strong>
          <span>${metric.caption}</span>
        </article>
      `
    )
    .join("");

  const topList = document.getElementById("top-students");
  topList.innerHTML = topStudents
    .map(
      (item, index) => `
        <li>
          <span class="avatar-pill">${index + 1}</span>
          <div class="details">
            <strong>${item.name}</strong>
            <p>${item.note}</p>
          </div>
          <span class="score-pill">${item.mastery}%</span>
        </li>
      `
    )
    .join("");

  const attentionList = document.getElementById("attention-list");
  attentionList.innerHTML = attention
    .map(
      (item, index) => `
        <li>
          <span class="avatar-pill">${index + 1}</span>
          <div class="details">
            <strong>${item.name}</strong>
            <p>${item.note}</p>
          </div>
          <span class="score-pill">${item.mastery}%</span>
        </li>
      `
    )
    .join("");

  const pillarList = document.getElementById("pillar-progress");
  pillarList.innerHTML = getPillarCounts()
    .map(
      (item) => `
        <li class="progress-item">
          <span>
            ${item.pillar}
            <strong>${item.value}</strong>
          </span>
          <div class="progress-bar">
            <div style="width:${item.percent}%"></div>
          </div>
        </li>
      `
    )
    .join("");

  const recommendationsList = document.getElementById("recommendations-list");
  recommendationsList.innerHTML = state.analytics.recommendations
    .map(
      (item, index) => `
        <li>
          <span>${index + 1}</span>
          <p>${item}</p>
        </li>
      `
    )
    .join("");
}

function updateAllViews() {
  renderDashboard();
  renderLessonLists();
  renderQuizzes();
  renderGrades();
  renderAnalytics();
}

async function handleLessonForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  toggleGeneratingState(form, true, "Generate Lesson");
  let newLesson;
  try {
    newLesson = await generateLessonPlan(formData);
  } finally {
    toggleGeneratingState(form, false, "Generate Lesson");
  }
  state.lessons.unshift(newLesson);
  state.analytics.snapshot.lessonsThisWeek += 1;
  updateAllViews();
  renderLessonDetails(document.getElementById("lesson-details"), newLesson);
  renderLessonDetails(document.getElementById("student-lesson-details"), newLesson);
  displayLessonOutput(newLesson);
  form.reset();
  populateSelects();
}

function displayLessonOutput(lesson) {
  const output = document.getElementById("lesson-output");
  output.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.summary}</p>
    <h4>Learning Objectives</h4>
    <ul>${lesson.objectives.map((obj) => `<li>${obj}</li>`).join("")}</ul>
    <h4>Lesson Outline</h4>
    <ul>${lesson.outline.map((step) => `<li>${step}</li>`).join("")}</ul>
    <div class="lesson-details-body">${lesson.details}</div>
  `;
  output.classList.remove("hidden");
}

async function handleQuizForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  toggleGeneratingState(form, true, "Generate Quiz");
  let quiz;
  try {
    quiz = await generateQuiz(formData);
  } finally {
    toggleGeneratingState(form, false, "Generate Quiz");
  }
  state.quizzes.unshift(quiz);
  updateAllViews();
  displayQuizOutput(quiz);
  form.reset();
  populateSelects();
}

function displayQuizOutput(quiz) {
  const output = document.getElementById("quiz-output");
  output.innerHTML = `
    <h3>${quiz.title}</h3>
    <p>${quiz.gradeLevel} · ${quiz.pillar} · ${quiz.language}</p>
    <ol>
      ${quiz.questions
        .map(
          (question) => `
        <li>
          <p>${question.prompt}</p>
          <ul>
            ${question.options.map((opt) => `<li>${opt}</li>`).join("")}
          </ul>
        </li>
      `
        )
        .join("")}
    </ol>
  `;
  output.classList.remove("hidden");
}

function randomElement(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function buildObjectives(topic, pillar) {
  const verbs = ["Design", "Explain", "Prototype", "Evaluate", "Justify", "Compare"];
  return [
    `${randomElement(verbs)} how ${topic.toLowerCase()} supports ${pillar.toLowerCase()}.`,
    `${randomElement(verbs)} a real-world example that shows the impact of ${pillar.toLowerCase()}.`,
    `Reflect on how classmates experienced ${topic.toLowerCase()} and document next steps.`,
  ];
}

function buildOutline(topic) {
  const starters = [
    `Launch: Quick story that grounds ${topic.toLowerCase()}`,
    "Investigation: Students rotate through AI mini-stations",
    "Workshop: Draft solutions with rapid feedback from peers",
    "Reflection: Students track progress in their AI journal",
  ];
  return starters;
}

function buildDetails(topic, context) {
  return `<p><strong>Briefing:</strong> ${context || `Students dive into ${topic}.`} We highlight how human creativity partners with AI suggestions.</p>
  <p><strong>Guided practice:</strong> Learners apply a mini-framework (Observe → Plan → Prompt → Reflect) to refine their output.</p>
  <p><strong>Showcase:</strong> Teams publish a short update that names an aha moment, a risk, and next steps.</p>`;
}

function buildLessonFallback(topic, pillar, context) {
  return {
    title: `${topic} (${pillar})`,
    summary: context || `AI lesson generated for ${topic}.`,
    objectives: buildObjectives(topic, pillar),
    outline: buildOutline(topic),
    details: buildDetails(topic, context),
  };
}

function buildFallbackQuizQuestions(topic) {
  const topicText = topic.toLowerCase();
  return [
    {
      prompt: `What is a real-world impact of focusing on ${topicText}?`,
      options: [
        `It helps students connect ${topicText} to authentic community needs.`,
        `It means teachers no longer review AI outputs.`,
        `It removes the need for planning or discussion.`,
      ],
      answer: 0,
    },
    {
      prompt: `How would you improve an AI system built around ${topicText}?`,
      options: [
        `Launch it with zero data checks.`,
        `Review the training data, collect feedback, and add clear guardrails.`,
        `Let it replace human collaboration entirely.`,
      ],
      answer: 1,
    },
    {
      prompt: `Which statement best describes ${topicText}?`,
      options: [
        `It works best when students mix creativity, ethics, and data literacy.`,
        `It is only useful if AI acts with no human oversight.`,
        `It means ignoring every district policy.`,
      ],
      answer: 0,
    },
  ];
}

async function generateLessonPlan(formData) {
  const topic = formData.get("topic").trim();
  const grade = formData.get("grade");
  const pillar = formData.get("pillar");
  const language = formData.get("language");
  const context = formData.get("context")?.trim();
  const syllabusFile = formData.get("syllabus");
  const fallback = buildLessonFallback(topic, pillar, context);
  let aiLesson = null;
  try {
    aiLesson = await requestLessonFromOpenAI({ topic, grade, pillar, language, context });
  } catch (error) {
    console.error("Lesson generation failed:", error);
    alert("OpenAI lesson generation failed. A template lesson was created instead.");
  }
  const merged = { ...fallback, ...(aiLesson || {}) };
  const syllabusName = syllabusFile && syllabusFile.name ? syllabusFile.name : null;
  return {
    id: `L-${Date.now()}`,
    topic,
    title: merged.title || fallback.title,
    gradeLevel: grade,
    pillar,
    language,
    objectives:
      Array.isArray(merged.objectives) && merged.objectives.length ? merged.objectives : fallback.objectives,
    outline: Array.isArray(merged.outline) && merged.outline.length ? merged.outline : fallback.outline,
    summary: merged.summary || fallback.summary,
    details: merged.details || merged.detailsHTML || fallback.details,
    updated: new Date().toISOString().slice(0, 10),
    syllabusName,
  };
}

async function generateQuiz(formData) {
  const topic = formData.get("topic").trim();
  const grade = formData.get("grade");
  const pillar = formData.get("pillar");
  const language = formData.get("language");
  const context = formData.get("context")?.trim();
  let aiQuiz = null;
  try {
    aiQuiz = await requestQuizFromOpenAI({ topic, grade, pillar, language, context });
  } catch (error) {
    console.error("Quiz generation failed:", error);
    alert("OpenAI quiz generation failed. A template quiz was created instead.");
  }
  const fallbackQuestions = buildFallbackQuizQuestions(topic);
  const questions =
    aiQuiz?.questions && aiQuiz.questions.length ? aiQuiz.questions : fallbackQuestions;
  return {
    id: `Q-${Date.now()}`,
    title: aiQuiz?.title || `${topic} Quiz`,
    gradeLevel: grade,
    pillar,
    language,
    questions,
  };
}

function bindForms() {
  const lessonForm = document.getElementById("lesson-form");
  const quizForm = document.getElementById("quiz-form");
  lessonForm.addEventListener("submit", handleLessonForm);
  quizForm.addEventListener("submit", handleQuizForm);
}

function bindQuizInteractions() {
  document.getElementById("student-quiz-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-take-quiz]");
    if (!button) return;
    const quiz = state.quizzes.find((q) => q.id === button.dataset.takeQuiz);
    if (!quiz) return;
    openQuizModal(quiz);
  });

  document.getElementById("quiz-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-preview-quiz]");
    if (!button) return;
    const quiz = state.quizzes.find((q) => q.id === button.dataset.previewQuiz);
    if (!quiz) return;
    openQuizModal(quiz);
  });

  quizModal.addEventListener("click", (event) => {
    if (event.target === quizModal) {
      closeModal();
    }
  });

  document.querySelector("[data-modal-close]").addEventListener("click", closeModal);
}

function closeModal() {
  quizModal.classList.add("hidden");
  modalBody.innerHTML = "";
}

function openQuizModal(quiz) {
  modalBody.innerHTML = `
    <h3>${quiz.title}</h3>
    <form id="take-quiz-form">
      ${quiz.questions
        .map(
          (question, qIndex) => `
        <div class="quiz-question">
          <p>${qIndex + 1}. ${question.prompt}</p>
          ${question.options
            .map(
              (option, index) => `
            <label>
              <input type="radio" name="q-${qIndex}" value="${index}" required>
              ${option}
            </label>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
      <button type="submit" class="primary">Submit quiz</button>
    </form>
  `;
  quizModal.classList.remove("hidden");
  const form = document.getElementById("take-quiz-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const responses = new FormData(form);
    const score = gradeQuiz(quiz, responses);
    const entry = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      status: score >= 80 ? "Mastered" : score >= 65 ? "On Track" : "Needs Review",
      date: new Date().toISOString().slice(0, 10),
    };
    state.grades.unshift(entry);
    renderGrades();
    closeModal();
    alert(`Quiz submitted! You scored ${score}%.`);
  });
}

function gradeQuiz(quiz, responses) {
  let correct = 0;
  quiz.questions.forEach((question, index) => {
    const answer = Number(responses.get(`q-${index}`));
    if (answer === question.answer) {
      correct += 1;
    }
  });
  return Math.round((correct / quiz.questions.length) * 100);
}

function init() {
  populateSelects();
  bindNavigation();
  bindForms();
  bindLessonSelection();
  bindQuizInteractions();
  updateAllViews();
}

document.addEventListener("DOMContentLoaded", init);
