/* ============================================================
   GEN STUDIO — Animation & interaction engine (vanilla, GPU-friendly)
   Exposes window.GEN for page scripts.
   ============================================================ */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const raf = window.requestAnimationFrame.bind(window);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const EASE = "cubic-bezier(0.16,1,0.3,1)";

  /* -------------------- Text splitting -------------------- */
  function split(el) {
    if (el.dataset.done) return;
    const mode = el.dataset.split || "word";
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();
    const push = (val, cls) => {
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const inner = document.createElement("span");
      inner.className = cls;
      inner.textContent = val;
      mask.appendChild(inner);
      frag.appendChild(mask);
    };
    if (mode === "char") {
      [...text].forEach((c) => (c === " " ? frag.appendChild(document.createTextNode(" ")) : push(c, "char")));
    } else {
      text.split(/(\s+)/).forEach((w) => (/^\s+$/.test(w) ? frag.appendChild(document.createTextNode(w)) : push(w, "word")));
    }
    el.appendChild(frag);
    el.dataset.done = "1";
  }
  function playSplit(el) {
    el.querySelectorAll(".char, .word").forEach((p, i) => {
      const d = (i * 0.035).toFixed(3);
      p.style.transition = `transform 0.85s ${EASE} ${d}s, opacity 0.6s ease ${d}s`;
      raf(() => { p.style.transform = "translateY(0)"; p.style.opacity = "1"; });
    });
  }
  if (!REDUCED) document.querySelectorAll("[data-split]").forEach(split);

  /* -------------------- Reveal observer -------------------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("is-in");
        const delay = parseFloat(el.dataset.stagger) || 0.08;
        el.querySelectorAll("[data-stagger-item]").forEach((k, i) => {
          k.style.transitionDelay = `${i * delay}s`;
          k.classList.add("is-in");
        });
        if (el.dataset.split && !REDUCED) playSplit(el);
        io.unobserve(el);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );
  document
    .querySelectorAll("[data-reveal], .fade, .line-mask, .img-mask, .clip, [data-split], [data-stagger], .page-hero h1 .row")
    .forEach((el) => (REDUCED ? el.classList.add("is-in") : io.observe(el)));

  /* -------------------- Number counters -------------------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        if (REDUCED) { el.textContent = target + suffix; counterIO.unobserve(el); return; }
        const start = performance.now();
        const tick = (now) => {
          const t = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) raf(tick);
        };
        raf(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

  /* -------------------- Marquee duplication -------------------- */
  document.querySelectorAll(".marquee__track").forEach((t) => (t.innerHTML += t.innerHTML));

  /* -------------------- Scroll-linked (parallax + nav state) -------------------- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const nav = document.querySelector(".nav");
  let sy = window.scrollY, ticking = false;
  function onScroll() {
    sy = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", sy > 30);
    if (!ticking && !REDUCED) { ticking = true; raf(frame); }
  }
  function frame() {
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
    });
    ticking = false;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* -------------------- Magnetic -------------------- */
  if (!isTouch && !REDUCED) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const s = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.5s var(--spring)";
        el.style.transform = "translate(0,0)";
        setTimeout(() => (el.style.transition = ""), 500);
      });
    });
  }

  /* -------------------- Custom cursor -------------------- */
  if (!isTouch) {
    const cur = document.createElement("div");
    cur.className = "cursor";
    cur.innerHTML = '<span class="cursor__t"></span>';
    document.body.appendChild(cur);
    const label = cur.querySelector(".cursor__t");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx = lerp(cx, tx, 0.18); cy = lerp(cy, ty, 0.18);
      cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf(loop);
    })();
    const bind = () => document.querySelectorAll("[data-cursor]").forEach((el) => {
      if (el.dataset.curBound) return;
      el.dataset.curBound = "1";
      el.addEventListener("mouseenter", () => { cur.classList.add("cursor--lg"); label.textContent = el.dataset.cursor; });
      el.addEventListener("mouseleave", () => { cur.classList.remove("cursor--lg"); label.textContent = ""; });
    });
    bind();
    window.GEN_bindCursor = bind;
  }

  /* -------------------- Drag-scroll -------------------- */
  document.querySelectorAll("[data-drag]").forEach((track) => {
    let down = false, sx, ss;
    track.addEventListener("pointerdown", (e) => { down = true; sx = e.pageX; ss = track.scrollLeft; track.setPointerCapture(e.pointerId); track.style.cursor = "grabbing"; });
    track.addEventListener("pointermove", (e) => { if (down) track.scrollLeft = ss - (e.pageX - sx); });
    const up = () => { down = false; track.style.cursor = "grab"; };
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
  });

  window.GEN = { REDUCED, isTouch, split, io, lerp, clamp };
})();
