const API_BASE_URL = window.PORTFOLIO_API_URL || window.VITE_API_URL || (
  window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : ""
);

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function projectTags(tags) {
  if (Array.isArray(tags)) return tags;
  return String(tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
}

function renderApiProject(project) {
  const tags = projectTags(project.techStack || project.tags).slice(0, 3);
  return `
    <article class="proj-card"
      data-proj-title="${project.title || "Project"}"
      data-proj-emoji="${project.emoji || "🚀"}"
      data-proj-tags="${projectTags(project.techStack || project.tags).join(",")}"
      data-proj-problem="${project.description || ""}"
      data-proj-solution="${project.solution || "Built with a production-focused MERN architecture."}"
      data-proj-results="${project.results || "Live project · GitHub source · Responsive UI"}"
      data-proj-features="${Array.isArray(project.features) ? project.features.join(" | ") : ""}"
      data-proj-github="${project.githubLink || project.github || "https://github.com/kalakonda-akshay"}"
      data-proj-demo="${project.liveLink || project.demoLink || "#"}">
      <div class="pc-thumb fp-bg1"><span class="pc-emoji">${project.emoji || "🚀"}</span><div class="pc-tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div></div>
      <div class="pc-body">
        <h3>${project.title || "Project"}</h3>
        <p>${project.description || ""}</p>
        ${Array.isArray(project.features) && project.features.length ? `<ul class="feature-list">${project.features.slice(0, 3).map((feature) => `<li>${feature}</li>`).join("")}</ul>` : ""}
        <div class="project-actions">
          ${project.liveLink ? `<a class="btn-view-project" href="${project.liveLink}" target="_blank" rel="noopener">Live Demo</a>` : ""}
          <a class="btn-view-project" href="${project.githubLink || project.github || "https://github.com/kalakonda-akshay"}" target="_blank" rel="noopener">GitHub</a>
          <button class="btn-view-project" onclick="openProjectModal(this.closest('[data-proj-title]'))">Details</button>
        </div>
      </div>
    </article>`;
}

async function loadProjects() {
  const container = document.getElementById("project-container");
  const state = document.getElementById("apiProjectState");
  if (!container) return;
  try {
    const projects = await apiRequest("/api/projects");
    if (!projects.length) return;
    container.classList.remove("empty");
    container.innerHTML = `<div class="projects-grid">${projects.map(renderApiProject).join("")}</div>`;
    if (state) state.textContent = "MongoDB-backed project data loaded successfully.";
  } catch (error) {
    if (state) state.textContent = "Static projects are ready. Start the backend to sync MongoDB-backed projects.";
  }
}

function setupSuggestionForm() {
  const form = document.getElementById("suggestionForm");
  const status = document.getElementById("suggestionStatus");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await apiRequest("/api/suggestions", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      status.textContent = "Thanks. Your suggestion was sent to Akshay.";
      form.reset();
    } catch (error) {
      status.textContent = "Could not reach the backend. Please email Akshay directly for now.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  setupSuggestionForm();
});
