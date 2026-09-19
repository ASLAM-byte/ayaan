/* ============================================================
   ELEGANT WEDDING — Shared partials (bilingual, LTR/RTL aware)
   EN pages at root; AR pages in /ar/. Reads body[data-lang].
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const t = window.i18n[lang];
  const isAr = lang === "ar";
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.body.dir = t.dir;

  // Language toggle preserves current page: EN x.html <-> AR ar/x.html
  const page = location.pathname.split("/").pop() || "index.html";
  const langHref = isAr ? `../${page}` : `ar/${page}`;

  const names = `${L(cfg.couple.firstPartner)} <span class="amp">&</span> ${L(cfg.couple.secondPartner)}`;
  const p = (x) => x; // same-folder links

  const nav = `
  <div class="pt" aria-hidden="true"></div>
  <nav class="nav" aria-label="Primary">
    <a href="${p("index.html")}" class="nav__logo">${cfg.couple.monogram}</a>
    <div class="nav__links">
      <a href="${p("our-story.html")}" class="ul">${t.nav.story}</a>
      <a href="${p("wedding.html")}" class="ul">${t.nav.wedding}</a>
      <a href="${p("gallery.html")}" class="ul">${t.nav.gallery}</a>
      <a href="${p("faq.html")}" class="ul">${t.nav.faq}</a>
    </div>
    <div class="nav__right">
      <span class="lang"><b>${t.langLabel}</b><span aria-hidden="true">/</span><a href="${langHref}" class="ul" data-lang-toggle>${t.altLang}</a></span>
      <a href="${p("rsvp.html")}" class="btn btn--olive" data-magnetic="0.3" data-cursor="${t.nav.rsvp}">${t.nav.rsvp} <span class="arw">↗</span></a>
      <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="m-menu"><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="m-menu" aria-hidden="true">
    <nav class="mobile-menu__links" aria-label="Mobile">
      <a href="${p("index.html")}"><span>${t.nav.home}</span></a>
      <a href="${p("our-story.html")}"><span>${t.nav.story}</span></a>
      <a href="${p("wedding.html")}"><span>${t.nav.wedding}</span></a>
      <a href="${p("gallery.html")}"><span>${t.nav.gallery}</span></a>
      <a href="${p("faq.html")}"><span>${t.nav.faq}</span></a>
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
      <div class="footer__invite">${t.footer.invite}</div>
      <div class="footer__mono">${names}</div>
      <div class="footer__meta">${L(cfg.wedding.dateShort)} · ${L(cfg.venue.city)}</div>
      <div class="footer__links">
        <a href="${p("index.html")}" class="ul">${t.nav.home}</a>
        <a href="${p("our-story.html")}" class="ul">${t.nav.story}</a>
        <a href="${p("wedding.html")}" class="ul">${t.nav.wedding}</a>
        <a href="${p("gallery.html")}" class="ul">${t.nav.gallery}</a>
        <a href="${p("rsvp.html")}" class="ul">${t.nav.rsvp}</a>
        <a href="mailto:${cfg.contact.email}" class="ul">${cfg.contact.email}</a>
        <a href="${langHref}" class="ul" data-lang-toggle>${t.altLang}</a>
      </div>
    </div>
    <div class="footer__legal">© <span data-year></span> ${L(cfg.couple.firstPartner)} ${isAr ? "و" : "&"} ${L(cfg.couple.secondPartner)} · ${t.footer.made} · ${cfg.social.hashtag}</div>
  </footer>`;

  const hasTracks = cfg.music && cfg.music.tracks && cfg.music.tracks.length;
  const player = hasTracks ? `
  <div class="player paused" role="region" aria-label="Music player">
    <button class="player__btn" data-player-toggle aria-label="Play music">▶</button>
    <button class="player__nav" data-player-prev aria-label="Previous track">‹</button>
    <button class="player__nav" data-player-next aria-label="Next track">›</button>
    <span class="player__viz" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
    <span class="player__meta"><span class="player__label">${t.player.now}</span><span class="player__title" data-player-title></span></span>
  </div>` : "";

  const body = document.body;
  if (!body.dataset.noNav) body.insertAdjacentHTML("afterbegin", nav);
  if (!body.dataset.noFooter) body.insertAdjacentHTML("beforeend", footer + player);
})();
