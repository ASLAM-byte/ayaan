/* ============================================================
   JOURNEY WEDDING — Shared partials (nav, mobile menu, footer, overlays)
   Reads body[data-sub] (present on pages one level deep, unused here since
   all pages are at root). Injects consistent chrome on every page.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const IMG = window.IMG;
  const names = `${cfg.couple.partnerOne} <span class="amp">&</span> ${cfg.couple.partnerTwo}`;

  const nav = `
  <div class="pt" aria-hidden="true"></div>
  <nav class="nav" aria-label="Primary">
    <a href="index.html" class="nav__logo">${cfg.couple.monogram}</a>
    <div class="nav__links">
      <a href="index.html" class="ul">Home</a>
      <a href="index.html#journey" class="ul">Our Story</a>
      <a href="index.html#couple" class="ul">Couple</a>
      <a href="index.html#events" class="ul">Our Events</a>
      <a href="blog.html" class="ul">Wedding Blog</a>
    </div>
    <div class="nav__right">
      <a href="index.html#rsvp" class="btn btn--plum" data-magnetic="0.3" data-cursor="RSVP">RSVP <span class="arw">↗</span></a>
      <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="m-menu"><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="m-menu" aria-hidden="true">
    <nav class="mobile-menu__links" aria-label="Mobile">
      <a href="index.html"><span>Home</span></a>
      <a href="index.html#couple"><span>Couple</span></a>
      <a href="index.html#journey"><span>Our Story</span></a>
      <a href="index.html#events"><span>Our Events</span></a>
      <a href="blog.html"><span>Wedding Blog</span></a>
      <a href="index.html#rsvp"><span>RSVP</span></a>
    </nav>
    <div class="mobile-menu__foot">
      <span class="meta">${cfg.venue.city}</span>
      <span class="meta">${cfg.contact.email}</span>
      <span class="meta">${cfg.social.hashtag}</span>
    </div>
  </div>`;

  const g = cfg.gallery;
  const footer = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__collage" data-stagger="0.08">
        <div class="fc img-mask" data-stagger-item><img src="${IMG(g[0], 500)}" alt="A moment from the celebration" loading="lazy" /></div>
        <div class="fc img-mask" data-stagger-item><img src="${IMG(g[1], 500)}" alt="A moment from the celebration" loading="lazy" /></div>
        <div class="fc img-mask" data-stagger-item><img src="${IMG(g[2], 500)}" alt="A moment from the celebration" loading="lazy" /></div>
        <div class="fc img-mask" data-stagger-item><img src="${IMG(g[3], 500)}" alt="A moment from the celebration" loading="lazy" /></div>
      </div>
      <div class="footer__mid">
        <div class="footer__with fade">With love,</div>
        <div class="footer__names fade">${names}</div>
        <div class="footer__meta fade">${cfg.wedding.dateLabel} · ${cfg.venue.name}, ${cfg.venue.city}</div>
        <div class="footer__links">
          <a href="index.html" class="ul">Home</a>
          <a href="index.html#journey" class="ul">Our Story</a>
          <a href="index.html#events" class="ul">Events</a>
          <a href="blog.html" class="ul">Blog</a>
          <a href="index.html#rsvp" class="ul">RSVP</a>
          <a href="mailto:${cfg.contact.email}" class="ul">${cfg.contact.email}</a>
        </div>
      </div>
    </div>
    <div class="footer__legal">© <span data-year></span> ${cfg.couple.partnerOne} & ${cfg.couple.partnerTwo} · ${cfg.social.hashtag}</div>
  </footer>`;

  const body = document.body;
  if (!body.dataset.noNav) body.insertAdjacentHTML("afterbegin", nav);
  if (!body.dataset.noFooter) body.insertAdjacentHTML("beforeend", footer);
})();
