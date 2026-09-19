/* ============================================================
   WEDDING — Page binding: applies i18n text + config values
   to [data-i18n] and [data-*] hooks. Runs after partials/render.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const t = window.i18n[lang];
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);

  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), t);

  // i18n text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = get(el.dataset.i18n);
    if (typeof val === "string") el.textContent = val;
  });

  // Couple names in hero
  const one = document.querySelector('[data-name="one"]');
  const two = document.querySelector('[data-name="two"]');
  if (one) one.textContent = L(cfg.couple.partnerOne);
  if (two) two.textContent = L(cfg.couple.partnerTwo);

  // Dates / venue
  const setTxt = (sel, val) => { const e = document.querySelector(sel); if (e && val != null) e.textContent = val; };
  setTxt("[data-date]", L(cfg.wedding.dateLabel));
  setTxt("[data-venue-city]", `${L(cfg.venue.name)} · ${L(cfg.venue.city)}`);
  setTxt("[data-venue-name]", L(cfg.venue.name));
  setTxt("[data-venue-address]", L(cfg.venue.address));
  setTxt("[data-venue-city2]", L(cfg.venue.city));
  setTxt("[data-story-intro]", L(cfg.story.intro));
  setTxt("[data-dress-title]", L(cfg.dressCode.title));
  setTxt("[data-dress-desc]", L(cfg.dressCode.description));

  const mapBtn = document.querySelector("[data-venue-map]");
  if (mapBtn) mapBtn.href = cfg.venue.mapUrl;
  const venueImg = document.querySelector("[data-venue-img]");
  if (venueImg) venueImg.src = window.IMG(cfg.venue.image, 1600);

  // Confirmation page details
  setTxt("[data-confirm-names]", `${L(cfg.couple.partnerOne)} ${lang === "ar" ? "و" : "&"} ${L(cfg.couple.partnerTwo)}`);
  setTxt("[data-confirm-meta]", `${L(cfg.wedding.dateLabel)} · ${L(cfg.venue.name)}`);
})();
