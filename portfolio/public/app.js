(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  /* ---- Load projects from the API ---- */
  async function loadProjects() {
    const list = $("#workList");
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("fetch failed");
      const projects = await res.json();

      if (!projects.length) {
        list.innerHTML = '<p class="loading">No projects yet.</p>';
        return;
      }

      list.innerHTML = projects
        .map(
          (p) => `
        <a class="work-item reveal" href="${esc(p.link || "#")}">
          <div>
            <h3>${esc(p.title)}</h3>
            <p class="work-summary">${esc(p.summary)}</p>
          </div>
          <div class="work-meta">
            <span class="cat">${esc(p.category)}</span>
            <span>${esc(p.role || "")}</span>
            <span>${esc(p.year)}</span>
          </div>
        </a>`
        )
        .join("");

      const count = $("#workCount");
      if (count) count.textContent = `(${projects.length})`;

      observeReveals();
    } catch (err) {
      list.innerHTML =
        '<p class="loading">Could not load projects. Is the server running?</p>';
    }
  }

  /* ---- Contact form ---- */
  function initContact() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const btn = $("#cSubmit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const payload = {
        name: $("#cName").value.trim(),
        email: $("#cEmail").value.trim(),
        body: $("#cBody").value.trim(),
      };

      if (!payload.name || !payload.email || !payload.body) {
        status.classList.add("error");
        status.textContent = "Please fill in every field.";
        return;
      }

      btn.disabled = true;
      status.textContent = "Sending…";

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error((data.errors && data.errors.join(" ")) || "Failed");
        }
        status.classList.add("ok");
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      } catch (err) {
        status.classList.add("error");
        status.textContent = err.message || "Something went wrong. Try again.";
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---- Scroll reveal ---- */
  function observeReveals() {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
    observeReveals();
    initContact();
    loadProjects();
  });
})();
