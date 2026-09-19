/* ============================================================
   ELEGANT WEDDING — Page binding: applies i18n text + config
   to [data-i18n] and [data-*] hooks. Runs after partials/render.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const t = window.i18n[lang];
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), t);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = get(el.dataset.i18n);
    if (typeof v === "string") el.textContent = v;
  });

  const one = document.querySelector('[data-name="one"]');
  const two = document.querySelector('[data-name="two"]');
  if (one) one.textContent = L(cfg.couple.firstPartner);
  if (two) two.textContent = L(cfg.couple.secondPartner);

  const set = (sel, val) => { const e = document.querySelector(sel); if (e && val != null) e.textContent = val; };
  set("[data-date]", L(cfg.wedding.dateLabel));
  set("[data-date-short]", L(cfg.wedding.dateShort));
  set("[data-venue-city]", L(cfg.venue.city));
  set("[data-venue-name]", L(cfg.venue.name));
  set("[data-venue-address]", L(cfg.venue.address));
  set("[data-venue-city2]", L(cfg.venue.city));
  set("[data-story-intro]", L(cfg.story.intro));
  set("[data-invite]", L(t.home.invite));
  set("[data-dress-title]", L(cfg.dressCode.title));
  set("[data-dress-desc]", L(cfg.dressCode.description));

  const mapBtn = document.querySelector("[data-venue-map]");
  if (mapBtn) mapBtn.href = cfg.venue.mapUrl;
  const venueImg = document.querySelector("[data-venue-img]");
  if (venueImg) venueImg.src = window.IMG(cfg.venue.image, 1600);

  set("[data-confirm-names]", `${L(cfg.couple.firstPartner)} ${lang === "ar" ? "و" : "&"} ${L(cfg.couple.secondPartner)}`);
  set("[data-confirm-meta]", `${L(cfg.wedding.dateShort)} · ${L(cfg.venue.name)}`);
})();
