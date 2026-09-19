/* ============================================================
   VELVET PROMISE — Homepage rendering
   ============================================================ */
(function () {
  "use strict";
  const D = window.VP_DATA;
  if (!D) return;
  const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
  const host = document.querySelector("#collectionGrid");
  if (host) {
    D.products.slice(0, 6).forEach((p) => {
      host.appendChild(
        el(`
        <a class="product" href="shop.html" data-cursor="VIEW" data-reveal>
          <div class="product__media img-mask">
            ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ""}
            <img class="main" src="${D.IMG(p.main, 800)}" alt="${p.name}" loading="lazy" />
            <img class="alt" src="${D.IMG(p.alt, 800)}" alt="${p.name} alternate view" loading="lazy" />
          </div>
          <div class="product__meta">
            <span class="product__name">${p.name}</span>
            <span class="product__price">${p.price}</span>
          </div>
          <span class="product__cat">${p.cat}</span>
        </a>`)
      );
    });
  }
  if (window.VP_bindCursor) window.VP_bindCursor();
})();
