/* ============================================================
   VELVET PROMISE — Shared UI (loader, nav, menu, transitions, lightbox)
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.VP ? window.VP.REDUCED : false;

  /* Loader + hero intro */
  const loader = document.querySelector(".loader");
  function reveal() {
    document.querySelectorAll(".hero__title .row i").forEach((el, i) => {
      el.style.transition = `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.1}s`;
      requestAnimationFrame(() => (el.style.transform = "translateY(0)"));
    });
  }
  const finish = () => { if (loader && !loader.classList.contains("done")) { loader.classList.add("done"); reveal(); } };
  window.addEventListener("load", () => setTimeout(finish, loader ? 950 : 0));
  setTimeout(finish, 2300);
  if (!loader) reveal();

  /* Mobile menu */
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    const toggle = (open) => {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("no-scroll", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) toggle(false); });
  }

  /* Page transitions */
  const pt = document.querySelector(".pt");
  if (pt && !reduced) {
    pt.classList.add("out");
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      const internal = href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto") && !a.target;
      if (!internal) return;
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        pt.classList.remove("out"); pt.classList.add("in");
        setTimeout(() => (window.location.href = href), 620);
      });
    });
  }

  /* Campaign film lightbox */
  const film = document.querySelector(".film");
  const lb = document.querySelector(".lightbox");
  if (film && lb) {
    const open = () => { lb.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    film.addEventListener("click", open);
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* Newsletter (local) */
  const nf = document.querySelector(".newsletter__form");
  if (nf) {
    const status = document.querySelector(".newsletter__status");
    nf.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = nf.querySelector("input").value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = "Please enter a valid email address."; return; }
      status.textContent = "Thank you — welcome to the Promise.";
      nf.reset();
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
