/* ============================================================
   SAGE WEDDING — Config-driven rendering + text binding
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const IMG = window.IMG;
  const el = (h) => { const tp = document.createElement("template"); tp.innerHTML = h.trim(); return tp.content.firstChild; };
  const mount = (name, nodes) => { const host = document.querySelector(`[data-render="${name}"]`); if (host) nodes.forEach((n) => host.appendChild(n)); };
  const setTxt = (sel, v) => { const e = document.querySelector(sel); if (e && v != null) e.textContent = v; };

  setTxt("[data-bind='p1']", cfg.couple.partnerOne);
  setTxt("[data-bind='p2']", cfg.couple.partnerTwo);
  setTxt("[data-bind='date']", cfg.wedding.dateLabel);
  setTxt("[data-bind='day']", cfg.wedding.day);
  setTxt("[data-bind='dateDay']", cfg.wedding.day);
  setTxt("[data-bind='dateLine']", cfg.wedding.dateLine);
  setTxt("[data-bind='dateYear']", cfg.wedding.date.slice(0, 4));
  setTxt("[data-bind='rsvpNote']", `Kindly respond before ${cfg.rsvp.byDate}.`);
  const map = document.querySelector("[data-bind='map']"); if (map) map.href = cfg.venue.mapUrl;

  /* Couple */
  mount("couple", cfg.profiles.map((p, i) =>
    el(`<article class="profile ${i === 0 ? "active" : ""}" data-profile="${i}" data-reveal>
      <div class="profile__media img-mask"><img src="${IMG(p.img, 700)}" alt="${p.name}" loading="lazy" /></div>
      <div class="fade">
        <div class="profile__role">${p.role}</div>
        <h3 class="profile__name">${p.name}</h3>
        <p class="profile__desc">${p.desc}</p>
      </div>
    </article>`)
  ));

  /* Facts */
  mount("facts", cfg.facts.map((f) =>
    el(`<div class="fact fade" data-stagger-item>
      <div class="fact__value">${f.count ? `<span data-count="${f.value}" data-suffix="${f.suffix || ""}">0</span>` : f.value}</div>
      <div class="fact__label">${f.label}</div>
    </div>`)
  ));

  /* Journey */
  mount("journey", (function () {
    const nodes = [el(`<div class="timeline__spine" aria-hidden="true"><div class="timeline__progress"></div></div>`)];
    cfg.journey.forEach((c) => {
      nodes.push(el(`<article class="tl-item" data-reveal>
        <div class="tl-item__media img-mask" data-parallax="0.03"><img src="${IMG(c.img, 800)}" alt="${c.title}" loading="lazy" /></div>
        <div class="tl-item__body fade">
          <div class="tl-item__year">${c.year}</div>
          <h3 class="tl-item__title">${c.title}</h3>
          <p class="tl-item__desc">${c.desc}</p>
        </div>
        <span class="tl-item__dot" aria-hidden="true"></span>
      </article>`));
    });
    return nodes;
  })());

  /* The Big Day */
  const bd = cfg.bigDay;
  mount("bigday", [
    el(`<article class="bigcard fade" data-stagger-item>
      <div class="bigcard__media img-mask"><img src="${IMG(bd.ceremony.img, 700)}" alt="Ceremony" loading="lazy" /></div>
      <h3 class="bigcard__title">${bd.ceremony.title}</h3>
      <div class="bigcard__row"><b>Date</b>${bd.ceremony.date}</div>
      <div class="bigcard__row"><b>Time</b>${bd.ceremony.time}</div>
      <div class="bigcard__row"><b>Location</b>${bd.ceremony.location}</div>
    </article>`),
    el(`<article class="bigcard fade" data-stagger-item>
      <div class="bigcard__media img-mask"><img src="${IMG(bd.reception.img, 700)}" alt="Reception" loading="lazy" /></div>
      <h3 class="bigcard__title">${bd.reception.title}</h3>
      <div class="bigcard__row"><b>Time</b>${bd.reception.time}</div>
      <div class="bigcard__row"><b>Venue</b>${bd.reception.venue}</div>
      <div class="bigcard__row">${bd.reception.desc}</div>
    </article>`),
    el(`<article class="bigcard fade" data-stagger-item>
      <div class="bigcard__media img-mask"><img src="${IMG(bd.dressCode.img, 700)}" alt="Dress code" loading="lazy" /></div>
      <h3 class="bigcard__title">${bd.dressCode.title}</h3>
      <div class="bigcard__row"><b>Dress code</b>${bd.dressCode.desc}</div>
    </article>`),
  ]);

  /* Events */
  mount("events", cfg.events.map((e) =>
    el(`<div class="event" data-reveal>
      <span class="event__time fade">${e.time}</span>
      <span class="event__icon fade" aria-hidden="true">${e.icon}</span>
      <div class="fade">
        <div class="event__title">${e.title}</div>
        <div class="event__desc">${e.desc}</div>
      </div>
    </div>`)
  ));

  /* Registry */
  mount("registry", cfg.registry.map((r) =>
    el(`<a class="reg fade" href="#" data-stagger-item data-cursor="OPEN">
      <img src="${IMG(r.img, 800)}" alt="${r.title}" loading="lazy" />
      <div>
        <h3 class="reg__title">${r.title}</h3>
        <p class="reg__desc">${r.desc}</p>
        <span class="reg__cta">${r.cta} <span class="arw">→</span></span>
      </div>
    </a>`)
  ));

  /* Blog */
  mount("blog", cfg.blog.map((a) =>
    el(`<article class="article-card" data-cursor="READ">
      <a href="article.html?a=${a.slug}" class="article-card__media img-mask"><img src="${IMG(a.img, 700)}" alt="${a.title}" loading="lazy" /></a>
      <div class="article-card__tags meta"><span>${a.cat}</span><span>${a.date}</span></div>
      <a href="article.html?a=${a.slug}" class="article-card__title">${a.title}</a>
      <p class="article-card__excerpt">${a.excerpt}</p>
      <a href="article.html?a=${a.slug}" class="ul meta" style="color:var(--sage)">Read story →</a>
    </article>`)
  ));

  const rb = document.querySelector("[data-rsvp-bg]");
  if (rb) rb.src = IMG(cfg.rsvp.bg, 1600);

  if (window.WED_bindCursor) window.WED_bindCursor();
})();
