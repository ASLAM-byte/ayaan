/* ============================================================
   ELEGANT WEDDING — Config-driven section rendering
   Fills [data-render="..."] hosts present on a page.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);
  const el = (h) => { const tp = document.createElement("template"); tp.innerHTML = h.trim(); return tp.content.firstChild; };
  const mount = (name, nodes) => { const host = document.querySelector(`[data-render="${name}"]`); if (host) nodes.forEach((n) => host.appendChild(n)); };

  /* Schedule (wedding page) */
  mount("schedule", cfg.schedule.map((s) =>
    el(`<div class="sched-item" data-reveal>
      <span class="sched-item__time fade">${isAr ? s.timeAr : s.time}</span>
      <div class="fade">
        <div class="sched-item__title">${L(s.title)}</div>
        <div class="sched-item__place">${L(s.place)}</div>
        <div class="sched-item__desc">${L(s.desc)}</div>
      </div>
    </div>`)
  ));

  /* Dress-code palette */
  mount("palette", cfg.dressCode.palette.map((sw) =>
    el(`<div class="swatch fade" data-stagger-item>
      <span class="swatch__dot" style="background:${sw.hex}"></span>
      <span class="swatch__name">${L(sw.name)}</span>
    </div>`)
  ));

  /* FAQ */
  mount("faq", cfg.faq.map((f, i) =>
    el(`<div class="faq-item">
      <button class="faq-item__q" aria-expanded="false" aria-controls="faq-${i}"><span>${L(f.q)}</span><span class="faq-item__icon" aria-hidden="true"></span></button>
      <div class="faq-item__a" id="faq-${i}" role="region"><div class="faq-item__a-inner">${L(f.a)}</div></div>
    </div>`)
  ));

  /* Story timeline */
  mount("timeline", (function () {
    const nodes = [el(`<div class="timeline__spine" aria-hidden="true"><div class="timeline__progress"></div></div>`)];
    cfg.story.timeline.forEach((c) => {
      nodes.push(el(`<article class="tl-item" data-reveal>
        <div class="tl-item__media img-mask" data-parallax="0.03"><img src="${window.IMG(c.img, 800)}" alt="${L(c.title)}" loading="lazy" /></div>
        <div class="tl-item__body fade">
          <div class="tl-item__year">${c.year}</div>
          <div class="tl-item__place">${L(c.place)}</div>
          <h3 class="tl-item__title">${L(c.title)}</h3>
          <p class="tl-item__desc">${L(c.desc)}</p>
        </div>
        <span class="tl-item__dot" aria-hidden="true"></span>
      </article>`));
    });
    return nodes;
  })());
})();
