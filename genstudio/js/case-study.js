/* ============================================================
   GEN STUDIO — Case study renderer
   Reads slug from <body data-slug> and renders from GEN_DATA.
   ============================================================ */
(function () {
  "use strict";
  var D = window.GEN_DATA;
  if (!D) return;
  var slug = document.body.dataset.slug;
  var idx = D.projects.findIndex(function (p) { return p.slug === slug; });
  if (idx < 0) return;
  var p = D.projects[idx];
  var next = D.projects[(idx + 1) % D.projects.length];

  document.title = p.title + " — GEN STUDIO";

  var set = function (sel, val) { var e = document.querySelector(sel); if (e) e.textContent = val; };
  set("#csTitle .line-in", p.title);
  set("#csClient", p.client);
  set("#csDate", p.date);
  set("#csCategory", p.category);
  set("#csLocation", p.location);
  set("#csChallenge", p.challenge);
  set("#csDirection", p.direction);
  set("#csResult", p.result);

  var cover = document.querySelector("#csCover img");
  if (cover) { cover.src = D.IMG(p.cover, 1600); cover.alt = p.title + " — cover"; }

  var gal = document.querySelector("#csGallery");
  if (gal) {
    p.gallery.forEach(function (g, i) {
      var fig = document.createElement("figure");
      fig.className = "img-mask";
      var im = document.createElement("img");
      im.src = D.IMG(g, 1100);
      im.alt = p.title + " visual " + (i + 1);
      im.loading = "lazy";
      fig.appendChild(im);
      gal.appendChild(fig);
    });
  }

  var np = document.querySelector("#nextProject");
  if (np) {
    np.href = next.slug + ".html";
    var npt = np.querySelector(".next-project__title");
    if (npt) npt.textContent = next.title;
    var npb = np.querySelector(".next-project__bg img");
    if (npb) { npb.src = D.IMG(next.cover, 1400); npb.alt = ""; }
  }

  if (window.GEN_bindCursor) window.GEN_bindCursor();
})();
