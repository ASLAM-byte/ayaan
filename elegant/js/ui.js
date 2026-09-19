/* ============================================================
   ELEGANT WEDDING — Shared UI (loader, menu, page transitions)
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.WED ? window.WED.REDUCED : false;

  /* Loader + hero intro */
  const loader = document.querySelector(".loader");
  function reveal() {
    document.querySelectorAll(".hero__names .row i, .hero__names .amp i").forEach((el, i) => {
      el.style.transition = `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`;
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
      const internal = href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto") && !a.target && !href.includes("#");
      if (!internal) return;
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        pt.classList.remove("out"); pt.classList.add("in");
        setTimeout(() => (window.location.href = href), 560);
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
