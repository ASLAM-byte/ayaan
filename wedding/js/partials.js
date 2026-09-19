/* ============================================================
   WEDDING — Shared partials (bilingual, LTR/RTL aware)
   Reads body[data-lang] (en|ar). AR pages live in /ar/, so
   links resolve with a path prefix.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const t = window.i18n[lang];
  const isAr = lang === "ar";
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);

  // Path prefix: AR pages are in /ar/, so same-language links have no prefix,
  // but the language toggle needs to cross folders.
  const home = isAr ? "index.html" : "index.html";
  const p = (page) => page; // same-folder links
  const names = `${L(cfg.couple.partnerOne)} <span class="amp">&</span> ${L(cfg.couple.partnerTwo)}`;

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.body.dir = t.dir;

  // Language toggle target (preserve page). EN files: x.html ; AR files: ar/x.html
  const path = location.pathname.split("/").pop() || "index.html";
  const langHref = isAr ? `../${path}` : `ar/${path}`;

  const nav = `
  <div class="pt" aria-hidden="true"></div>
  <nav class="nav" aria-label="Primary">
    <a href="${p("index.html")}" class="nav__logo">${cfg.couple.monogram}</a>
    <div class="nav__links">
      <a href="${p("our-story.html")}" class="ul">${t.nav.story}</a>
      <a href="${p("index.html")}#schedule" class="ul">${t.nav.day}</a>
      <a href="${p("index.html")}#gallery" class="ul">${t.nav.gallery}</a>
      <a href="${p("index.html")}#faq" class="ul">${t.nav.faq}</a>
    </div>
    <div class="nav__right">
      <span class="lang"><b>${t.langLabel}</b><span aria-hidden="true">/</span><a href="${langHref}" class="ul" data-lang-toggle>${t.altLang}</a></span>
      <a href="${p("rsvp.html")}" class="btn btn--accent" data-magnetic="0.3" data-cursor="${t.nav.rsvp}">${t.nav.rsvp} <span class="arw">↗</span></a>
      <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="m-menu"><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="m-menu" aria-hidden="true">
    <nav class="mobile-menu__links" aria-label="Mobile">
      <a href="${p("index.html")}"><span>${isAr ? "الرئيسية" : "Home"}</span></a>
      <a href="${p("our-story.html")}"><span>${t.nav.story}</span></a>
      <a href="${p("index.html")}#schedule"><span>${t.nav.day}</span></a>
      <a href="${p("index.html")}#gallery"><span>${t.nav.gallery}</span></a>
      <a href="${p("index.html")}#faq"><span>${t.nav.faq}</span></a>
      <a href="${p("rsvp.html")}"><span>${t.nav.rsvp}</span></a>
    </nav>
    <div class="mobile-menu__foot">
      <span class="meta">${L(cfg.venue.city)}</span>
      <span class="meta">${cfg.contact.email}</span>
      <a href="${langHref}" class="meta ul" data-lang-toggle>${t.altLang}</a>
    </div>
  </div>`;

  const footer = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__mono">${cfg.couple.monogram}</div>
      <div class="footer__names">${names}</div>
      <div class="footer__meta">${L(cfg.wedding.dateLabel)} · ${L(cfg.venue.name)}</div>
      <div class="footer__links">
        <a href="${p("index.html")}" class="ul">${isAr ? "الرئيسية" : "Home"}</a>
        <a href="${p("our-story.html")}" class="ul">${t.nav.story}</a>
        <a href="${p("rsvp.html")}" class="ul">${t.nav.rsvp}</a>
        <a href="mailto:${cfg.contact.email}" class="ul">${cfg.contact.email}</a>
        <a href="${langHref}" class="ul" data-lang-toggle>${t.altLang}</a>
      </div>
    </div>
    <div class="footer__legal">© <span data-year></span> ${L(cfg.couple.partnerOne)} ${isAr ? "و" : "&"} ${L(cfg.couple.partnerTwo)} · ${t.footer.made} · ${cfg.social.hashtag}</div>
  </footer>`;

  // Floating music player (built here; behavior in components.js)
  const hasTracks = cfg.music && cfg.music.tracks && cfg.music.tracks.length;
  const player = hasTracks ? `
  <div class="player paused" role="region" aria-label="Music player">
    <button class="player__btn" data-player-toggle aria-label="Play music">▶</button>
    <button class="player__nav" data-player-prev aria-label="Previous track">‹</button>
    <button class="player__nav" data-player-next aria-label="Next track">›</button>
    <span class="player__viz" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
    <span class="player__meta">
      <span class="player__label">${t.player.now}</span>
      <span class="player__title" data-player-title></span>
    </span>
  </div>` : "";

  const body = document.body;
  if (!body.dataset.noNav) body.insertAdjacentHTML("afterbegin", nav);
  if (!body.dataset.noFooter) body.insertAdjacentHTML("beforeend", footer + player);
})();
