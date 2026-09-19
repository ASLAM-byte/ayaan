/* ============================================================
   OCHA — Article page: related articles
   ============================================================ */
(function () {
  "use strict";

  const IMG = (id, w = 800) =>
    `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

  const related = [
    { cat: "Wellness", date: "Jun 2026", title: "The Calm-Energy Science of Matcha Wellness", excerpt: "How L-theanine and caffeine team up for focus without the crash.", img: "photo-1544787219-7f47ccb76574" },
    { cat: "How-To", date: "May 2026", title: "How to Whisk a Flawless Bowl at Home", excerpt: "Water temperature, the W-motion, and the three mistakes everyone makes.", img: "photo-1515823064-d6e0c04616a7" },
    { cat: "Origin", date: "Apr 2026", title: "From Shade-Grown Leaf to Stone-Ground Powder", excerpt: "A quiet journey from the tea fields of Uji to the bowl in your hands.", img: "photo-1552693673-1bf958298935" },
    { cat: "Culture", date: "Mar 2026", title: "Why the Third Place Still Matters", excerpt: "Not home, not work — the room where a city actually meets itself.", img: "photo-1521017432531-fbd92d768814" },
  ];

  const host = document.getElementById("relatedGrid");
  if (!host) return;

  related.forEach((a) => {
    const t = document.createElement("template");
    t.innerHTML = `
      <article class="article" data-cursor="READ">
        <a href="journal.html" class="article__media img-mask">
          <img src="${IMG(a.img)}" alt="${a.title}" loading="lazy" />
        </a>
        <div class="article__tags"><span>${a.cat}</span><span>${a.date}</span></div>
        <a href="journal.html" class="article__title">${a.title}</a>
        <p class="article__excerpt">${a.excerpt}</p>
        <a href="journal.html" class="article__more ulink">Read more →</a>
      </article>`.trim();
    host.appendChild(t.content.firstChild);
  });
})();
