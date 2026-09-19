/* ============================================================
   VELVET PROMISE — Shared partials injected on every page.
   ============================================================ */
(function () {
  "use strict";
  const nav = `
  <div class="pt" aria-hidden="true"></div>
  <nav class="nav" aria-label="Primary">
    <a href="index.html" class="nav__logo">Velvet <i>Promise</i></a>
    <div class="nav__links">
      <a href="index.html" class="ul">Home</a>
      <a href="shop.html" class="ul">Shop</a>
      <a href="about.html" class="ul">Atelier</a>
      <a href="contact.html" class="ul">Contact</a>
    </div>
    <div class="nav__right">
      <a href="shop.html" class="btn btn--wine" data-magnetic="0.3" data-cursor="SHOP">Shop the edit <span class="arw">↗</span></a>
      <button class="nav__burger" aria-label="Open menu" aria-expanded="false" aria-controls="m-menu"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="m-menu" aria-hidden="true">
    <nav class="mobile-menu__links" aria-label="Mobile">
      <a href="index.html"><span>Home</span></a>
      <a href="shop.html"><span>Shop</span></a>
      <a href="about.html"><span>Atelier</span></a>
      <a href="contact.html"><span>Contact</span></a>
    </nav>
    <div class="mobile-menu__foot">
      <span class="meta">Paris · Est. 2025</span>
      <span class="meta">hello@velvetpromise.co</span>
      <span class="meta">@velvetpromise</span>
    </div>
  </div>`;

  const footer = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div class="footer__brand">
          <h3>Velvet <i>Promise</i></h3>
          <p class="meta">Slow-made intimates & eveningwear — Paris, since 2025.</p>
        </div>
        <div class="footer__col">
          <h4>Explore</h4>
          <a href="index.html" class="ul">Home</a>
          <a href="shop.html" class="ul">Shop</a>
          <a href="about.html" class="ul">The Atelier</a>
          <a href="contact.html" class="ul">Contact</a>
        </div>
        <div class="footer__col">
          <h4>Client Care</h4>
          <a href="contact.html" class="ul">Shipping & Returns</a>
          <a href="contact.html" class="ul">Size Guide</a>
          <a href="contact.html" class="ul">Fabric Care</a>
          <a href="contact.html" class="ul">FAQ</a>
        </div>
        <div class="footer__col">
          <h4>Follow</h4>
          <a href="#" class="ul">Instagram</a>
          <a href="#" class="ul">Pinterest</a>
          <a href="#" class="ul">Journal</a>
          <a href="mailto:hello@velvetpromise.co" class="ul">Newsletter</a>
        </div>
      </div>
    </div>
    <div class="footer__mark" aria-hidden="true">Velvet Promise</div>
    <div class="wrap">
      <div class="footer__legal">
        <span>© <span data-year></span> Velvet Promise. All rights reserved.</span>
        <span>Made slowly in Paris</span>
        <a href="#" class="ul">Terms · Privacy</a>
      </div>
    </div>
  </footer>
  <div class="lightbox" aria-hidden="true">
    <div class="lightbox__inner">
      <button class="lightbox__close" aria-label="Close">✕</button>
      <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop" alt="Campaign film still" />
    </div>
  </div>`;

  const body = document.body;
  if (!body.dataset.noNav) body.insertAdjacentHTML("afterbegin", nav);
  if (!body.dataset.noFooter) body.insertAdjacentHTML("beforeend", footer);
})();
