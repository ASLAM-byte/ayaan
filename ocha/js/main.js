/* ============================================================
   OCHA — UI interactions
   ============================================================ */
(function () {
  "use strict";

  /* -------- Page loader reveal + nav intro -------- */
  const loader = document.querySelector(".loader");
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero__word");

  function playIntro() {
    if (hero) {
      hero.querySelectorAll("i").forEach((letter, i) => {
        letter.style.transition = `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.09}s`;
        requestAnimationFrame(() => (letter.style.transform = "translateY(0)"));
      });
    }
    if (nav) nav.classList.add("nav-ready");
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("done");
      playIntro();
    }, 650);
  });
  // Fallback if load already fired / is slow
  setTimeout(() => {
    if (loader && !loader.classList.contains("done")) {
      loader.classList.add("done");
      playIntro();
    }
  }, 1800);

  /* -------- Mobile menu -------- */
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".menu");
  if (burger && menu) {
    const toggle = (open) => {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () =>
      toggle(!menu.classList.contains("open"))
    );
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => toggle(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) toggle(false);
    });
  }

  /* -------- Specials: menu <-> preview -------- */
  const menuItems = document.querySelectorAll(".menu-item");
  const previewFigures = document.querySelectorAll(".specials__preview figure");
  function setActive(idx) {
    menuItems.forEach((it, i) => it.classList.toggle("active", i === idx));
    previewFigures.forEach((f, i) => f.classList.toggle("show", i === idx));
  }
  menuItems.forEach((item, i) => {
    item.addEventListener("mouseenter", () => setActive(i));
    item.addEventListener("click", () => setActive(i));
    item.addEventListener("focus", () => setActive(i));
  });
  if (menuItems.length) setActive(0);

  /* -------- FAQ accordion (animated height) -------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-item__q");
    const panel = item.querySelector(".faq-item__a");
    const inner = item.querySelector(".faq-item__a-inner");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close siblings
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        if (o !== item) {
          o.classList.remove("open");
          o.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
          o.querySelector(".faq-item__a").style.height = "0px";
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.height = isOpen ? "0px" : inner.offsetHeight + "px";
    });
  });
  // Recalculate open panel heights on resize
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        o.querySelector(".faq-item__a").style.height =
          o.querySelector(".faq-item__a-inner").offsetHeight + "px";
      });
    }, 150);
  });

  /* -------- Horizontal scroll drag (merch / journal) -------- */
  document.querySelectorAll("[data-drag]").forEach((track) => {
    let down = false, startX, startScroll;
    track.addEventListener("pointerdown", (e) => {
      down = true; startX = e.pageX; startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      track.scrollLeft = startScroll - (e.pageX - startX);
    });
    const up = () => { down = false; track.style.cursor = ""; };
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
  });

  /* -------- Smooth anchor scroll (accounting for reduced motion) -------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: window.OCHA && window.OCHA.reduced ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* -------- Footer year -------- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
