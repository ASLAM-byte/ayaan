/* ============================================================
   SAGE WEDDING — Motion engine (vanilla, GPU-friendly)
   ============================================================ */
(function () {
  "use strict";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const raf = window.requestAnimationFrame.bind(window);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const EASE = "cubic-bezier(0.16,1,0.3,1)";

  /* Text splitting */
  function split(el) {
    if (el.dataset.done) return;
    const mode = el.dataset.split || "word";
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();
    const push = (v, cls) => { const m = document.createElement("span"); m.className = "split-mask"; const i = document.createElement("span"); i.className = cls; i.textContent = v; m.appendChild(i); frag.appendChild(m); };
    if (mode === "char") [...text].forEach((c) => (c === " " ? frag.appendChild(document.createTextNode(" ")) : push(c, "char")));
    else text.split(/(\s+)/).forEach((w) => (/^\s+$/.test(w) ? frag.appendChild(document.createTextNode(w)) : push(w, "word")));
    el.appendChild(frag); el.dataset.done = "1";
  }
  function playSplit(el) {
    el.querySelectorAll(".char, .word").forEach((p, i) => {
      const d = (i * 0.04).toFixed(3);
      p.style.transition = `transform 0.9s ${EASE} ${d}s, opacity 0.6s ease ${d}s`;
      raf(() => { p.style.transform = "translateY(0)"; p.style.opacity = "1"; });
    });
  }
  if (!REDUCED) document.querySelectorAll("[data-split]").forEach(split);

  /* Count-up */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (REDUCED) { el.textContent = target.toLocaleString() + suffix; return; }
    const dur = 1500, start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (t < 1) raf(tick);
    };
    raf(tick);
  }

  /* Reveal observer */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("is-in");
      const delay = parseFloat(el.dataset.stagger) || 0.09;
      el.querySelectorAll("[data-stagger-item]").forEach((k, i) => { k.style.transitionDelay = `${i * delay}s`; k.classList.add("is-in"); });
      if (el.dataset.split && !REDUCED) playSplit(el);
      if (el.hasAttribute("data-count")) countUp(el);
      io.unobserve(el);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("[data-reveal], .fade, .line-mask, .img-mask, .clip-x, [data-split], [data-stagger], [data-count], .hero__names .row, .page-hero h1 .row")
    .forEach((el) => (REDUCED ? (el.classList.add("is-in"), el.hasAttribute("data-count") && countUp(el)) : io.observe(el)));

  /* Parallax + nav + timeline progress + scroll hint */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const nav = document.querySelector(".nav");
  const tlWrap = document.querySelector(".timeline");
  const tlProgress = document.querySelector(".timeline__progress");
  const scrollHint = document.querySelector(".hero__scroll");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (scrollHint) scrollHint.classList.toggle("hide", y > 80);
    if (!ticking) { ticking = true; raf(frame); }
  }
  function frame() {
    const vh = window.innerHeight;
    if (!REDUCED) parallax.forEach((el) => {
      const s = parseFloat(el.dataset.parallax) || 0.1;
      const r = el.getBoundingClientRect();
      const c = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-c * s).toFixed(2)}px, 0)`;
    });
    if (tlWrap && tlProgress) {
      const r = tlWrap.getBoundingClientRect();
      const total = r.height - vh * 0.5;
      const scrolled = Math.min(Math.max(vh * 0.5 - r.top, 0), total);
      tlProgress.style.height = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* Magnetic */
  if (!isTouch && !REDUCED) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const s = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`; });
      el.addEventListener("mouseleave", () => { el.style.transition = "transform 0.5s var(--spring)"; el.style.transform = "translate(0,0)"; setTimeout(() => (el.style.transition = ""), 500); });
    });
  }

  /* Custom cursor */
  if (!isTouch) {
    const cur = document.createElement("div"); cur.className = "cursor";
    cur.innerHTML = '<span class="cursor__t"></span>'; document.body.appendChild(cur);
    const label = cur.querySelector(".cursor__t");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() { cx = lerp(cx, tx, 0.18); cy = lerp(cy, ty, 0.18); cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; raf(loop); })();
    const bind = () => document.querySelectorAll("[data-cursor]").forEach((el) => {
      if (el.dataset.curBound) return; el.dataset.curBound = "1";
      el.addEventListener("mouseenter", () => { cur.classList.add("cursor--lg"); label.textContent = el.dataset.cursor; });
      el.addEventListener("mouseleave", () => { cur.classList.remove("cursor--lg"); label.textContent = ""; });
    });
    bind(); window.WED_bindCursor = bind;
  }

  window.WED = { REDUCED, isTouch, lerp };
})();
