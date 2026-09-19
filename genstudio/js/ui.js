/* ============================================================
   GEN STUDIO — Shared UI (loader, nav, menu, transitions, etc.)
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.GEN ? window.GEN.REDUCED : false;

  /* -------- Loader + hero intro -------- */
  const loader = document.querySelector(".loader");
  function reveal() {
    document.querySelectorAll(".hero__title .row i").forEach((el, i) => {
      el.style.transition = `transform 1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.09}s`;
      requestAnimationFrame(() => (el.style.transform = "translateY(0)"));
    });
  }
  const finish = () => { if (loader && !loader.classList.contains("done")) { loader.classList.add("done"); reveal(); } };
  window.addEventListener("load", () => setTimeout(finish, loader ? 900 : 0));
  setTimeout(finish, 2200);
  if (!loader) reveal();

  /* -------- Nav: Others dropdown keyboard -------- */
  const dropBtn = document.querySelector(".nav__drop-btn");
  if (dropBtn) {
    dropBtn.addEventListener("click", () => {
      const drop = dropBtn.closest(".nav__drop");
      drop.classList.toggle("open");
    });
  }

  /* -------- Mobile menu -------- */
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    const toggle = (open) => {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("no-scroll", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.classList.toggle("is-open", open);
    };
    burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) toggle(false); });
  }

  /* -------- Page transitions (internal links) -------- */
  const pt = document.querySelector(".pt");
  if (pt && !reduced) {
    // Play out-transition on load
    pt.classList.add("out");
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute("href");
      const internal = href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto") && !a.target;
      if (!internal) return;
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        pt.classList.remove("out");
        pt.classList.add("in");
        setTimeout(() => (window.location.href = href), 620);
      });
    });
  }

  /* -------- Services accordion (touch) -------- */
  document.querySelectorAll(".svc").forEach((svc) => {
    svc.addEventListener("click", () => {
      if (window.matchMedia("(hover: none)").matches) {
        document.querySelectorAll(".svc.open").forEach((o) => o !== svc && o.classList.remove("open"));
        svc.classList.toggle("open");
      }
    });
  });

  /* -------- Showreel lightbox -------- */
  const showreel = document.querySelector(".showreel");
  const lb = document.querySelector(".lightbox");
  if (showreel && lb) {
    const open = () => { lb.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    showreel.addEventListener("click", open);
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* -------- Process timeline (scroll activation) -------- */
  const steps = [...document.querySelectorAll(".step")];
  const bigStage = document.querySelector(".process__big");
  const stageLabel = document.querySelector(".process__stage-label");
  const stageImgs = [...document.querySelectorAll(".process__media img")];
  if (steps.length && bigStage) {
    const setStage = (idx) => {
      steps.forEach((s, i) => s.classList.toggle("active", i === idx));
      const s = steps[idx];
      bigStage.textContent = s.dataset.big || s.querySelector(".step__title").textContent;
      if (stageLabel) stageLabel.textContent = s.dataset.label || "";
      stageImgs.forEach((im, i) => im.classList.toggle("show", i === idx));
    };
    const stepIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setStage(steps.indexOf(e.target)); });
      },
      { threshold: 0.6 }
    );
    steps.forEach((s) => stepIO.observe(s));
    setStage(0);
  }

  /* -------- Footer year -------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
