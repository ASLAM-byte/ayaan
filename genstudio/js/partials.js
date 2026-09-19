/* ============================================================
   GEN STUDIO — Shared partials injected into every page.
   Keeps nav / mobile menu / footer / overlays consistent.
   Runs before engine.js and ui.js.
   ============================================================ */
(function () {
  "use strict";

  // Resolve link prefix: pages inside /projects use "../"
  const inSub = /\/projects\//.test(location.pathname);
  const P = inSub ? "../" : "";

  const nav = `
  <div class="pt" aria-hidden="true"></div>
  <nav class="nav" aria-label="Primary">
    <a href="${P}index.html" class="nav__logo"><span class="nav__dot"></span> GEN<b>STUDIO</b></a>
    <div class="nav__links">
      <a href="${P}index.html" class="ul">Home</a>
      <a href="${P}projects.html" class="ul">Projects</a>
      <a href="${P}about.html" class="ul">About Us</a>
      <a href="${P}blog.html" class="ul">Blog</a>
      <a href="${P}contact.html" class="ul">Contact</a>
      <div class="nav__drop">
        <button class="nav__drop-btn ul" aria-haspopup="true" aria-expanded="false">Others +</button>
        <div class="nav__drop-menu">
          <a href="${P}terms.html" class="ul">Terms</a>
          <a href="${P}privacy.html" class="ul">Policy</a>
          <a href="${P}404.html" class="ul">404</a>
        </div>
      </div>
    </div>
    <div class="nav__cta">
      <a href="${P}contact.html" class="btn" data-magnetic="0.3" data-cursor="LET'S TALK">Get in touch <span class="arw">↗</span></a>
      <button class="nav__burger" aria-label="Open menu" aria-expanded="false" aria-controls="m-menu"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="m-menu" aria-hidden="true">
    <nav class="mobile-menu__links" aria-label="Mobile">
      <a href="${P}index.html"><span>Home</span></a>
      <a href="${P}projects.html"><span>Projects</span></a>
      <a href="${P}about.html"><span>About</span></a>
      <a href="${P}blog.html"><span>Blog</span></a>
      <a href="${P}contact.html"><span>Contact</span></a>
    </nav>
    <div class="mobile-menu__foot meta">
      <span>Keizersgracht 241, Amsterdam</span>
      <span>hello@genstudio.co</span>
      <span>Since 2025</span>
    </div>
  </div>`;

  const footer = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div class="footer__brand">
          <h3>GEN STUDIO</h3>
          <p class="meta">Since 2025 — Human × AI visual studio</p>
        </div>
        <div class="footer__col">
          <h4>Menu</h4>
          <a href="${P}index.html" class="ul">Home</a>
          <a href="${P}projects.html" class="ul">Projects</a>
          <a href="${P}about.html" class="ul">About Us</a>
          <a href="${P}contact.html" class="ul">Contact</a>
          <a href="${P}blog.html" class="ul">Journal</a>
        </div>
        <div class="footer__col">
          <h4>Studio</h4>
          <p>Keizersgracht 241</p>
          <p>1016 EA Amsterdam</p>
          <p>Netherlands</p>
        </div>
        <div class="footer__col">
          <h4>Legal</h4>
          <a href="${P}terms.html" class="ul">Terms</a>
          <a href="${P}privacy.html" class="ul">Privacy Policy</a>
          <a href="${P}404.html" class="ul">404</a>
        </div>
      </div>
    </div>
    <div class="footer__mark" aria-hidden="true">GEN STUDIO</div>
    <div class="wrap">
      <div class="footer__legal">
        <span>© <span data-year></span> Gen Studio. All rights reserved.</span>
        <span>Amsterdam — Worldwide</span>
        <a href="${P}contact.html" class="ul">Start a project ↗</a>
      </div>
    </div>
  </footer>
  <div class="lightbox" aria-hidden="true">
    <div class="lightbox__inner">
      <button class="lightbox__close" aria-label="Close">✕</button>
      <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop" alt="Showreel preview" />
    </div>
  </div>`;

  // Inject nav at top of body, footer at end (unless page opts out)
  const body = document.body;
  if (!body.dataset.noNav) body.insertAdjacentHTML("afterbegin", nav);
  if (!body.dataset.noFooter) body.insertAdjacentHTML("beforeend", footer);
})();
