/* ============================================================
   OCHA — Animation engine (vanilla JS, GPU-friendly)
   ============================================================ */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* -------------------------------------------------- helpers */
  const raf = window.requestAnimationFrame.bind(window);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* -------------------------------------------------- 1. Text splitting
     Wraps words/chars in spans so they can stagger-reveal. */
  function splitText(el) {
    if (el.dataset.split === "done") return;
    const mode = el.dataset.split || "word";
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();

    if (mode === "char") {
      [...text].forEach((ch) => {
        if (ch === " ") { frag.appendChild(document.createTextNode(" ")); return; }
        const mask = document.createElement("span");
        mask.className = "split-mask";
        const inner = document.createElement("span");
        inner.className = "char";
        inner.textContent = ch;
        mask.appendChild(inner);
        frag.appendChild(mask);
      });
    } else {
      text.split(/(\s+)/).forEach((w) => {
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        const mask = document.createElement("span");
        mask.className = "split-mask";
        const inner = document.createElement("span");
        inner.className = "word";
        inner.textContent = w;
        mask.appendChild(inner);
        frag.appendChild(mask);
      });
    }
    el.appendChild(frag);
    el.dataset.split = "done";
  }

  const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
  function animateSplit(el) {
    const parts = el.querySelectorAll(".char, .word");
    parts.forEach((p, i) => {
      const d = (i * 0.03).toFixed(3);
      p.style.transition = `transform 0.8s ${EASE_OUT} ${d}s, opacity 0.6s ease ${d}s`;
      raf(() => { p.style.transform = "translateY(0)"; p.style.opacity = "1"; });
    });
  }

  document.querySelectorAll("[data-split]").forEach((el) => {
    if (REDUCED) return;
    splitText(el);
  });

  /* -------------------------------------------------- 2. Scroll reveal */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-inview");

        // Stagger children with [data-stagger]
        const kids = el.querySelectorAll("[data-stagger-item]");
        kids.forEach((k, i) => {
          k.style.transitionDelay = `${i * (parseFloat(el.dataset.stagger) || 0.08)}s`;
          k.classList.add("is-inview");
        });

        if (el.dataset.split && !REDUCED) animateSplit(el);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  document
    .querySelectorAll("[data-reveal], .fade-up, .line-mask, .img-mask, [data-split], [data-stagger]")
    .forEach((el) => {
      if (REDUCED) { el.classList.add("is-inview"); return; }
      revealObserver.observe(el);
    });

  /* -------------------------------------------------- 3. Marquee duplication
     Duplicate track content so the -50% loop is seamless. */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* -------------------------------------------------- 4. Scroll-linked effects
     Parallax + smooth scroll progress. Uses a single rAF loop. */
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  const scrollXEls = [...document.querySelectorAll("[data-scrollx]")];
  const nav = document.querySelector(".nav");

  let scrollY = window.scrollY;
  let currentY = scrollY;
  let ticking = false;

  function onScroll() {
    scrollY = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", scrollY > 40);
    if (!ticking) { ticking = true; raf(loop); }
  }

  function loop() {
    currentY = lerp(currentY, scrollY, 0.12);
    if (Math.abs(currentY - scrollY) < 0.4) currentY = scrollY;

    const vh = window.innerHeight;
    if (!REDUCED) {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
      });
      scrollXEls.forEach((el) => {
        const speed = parseFloat(el.dataset.scrollx) || 0.1;
        const rect = el.parentElement.getBoundingClientRect();
        const prog = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
        el.style.transform = `translate3d(${((prog - 0.5) * speed * vh).toFixed(2)}px, 0, 0)`;
      });
    }

    if (Math.abs(currentY - scrollY) >= 0.4) { raf(loop); } else { ticking = false; }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------- 5. Magnetic buttons */
  if (!isTouch && !REDUCED) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform 0.5s var(--spring)";
        setTimeout(() => (el.style.transition = ""), 500);
      });
    });
  }

  /* -------------------------------------------------- 6. Custom cursor */
  if (!isTouch) {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.innerHTML = '<span class="cursor__text"></span>';
    document.body.appendChild(cursor);
    const label = cursor.querySelector(".cursor__text");

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    (function cLoop() {
      cx = lerp(cx, tx, 0.2); cy = lerp(cy, ty, 0.2);
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf(cLoop);
    })();

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor--label");
        label.textContent = el.dataset.cursor;
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor--label");
        label.textContent = "";
      });
    });
  }

  /* -------------------------------------------------- 7. Expose small API */
  window.OCHA = window.OCHA || {};
  window.OCHA.reduced = REDUCED;
  window.OCHA.isTouch = isTouch;
})();
