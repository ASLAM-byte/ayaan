/* ============================================================
   GEN STUDIO — Homepage rendering
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
  const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
  const mount = (sel, nodes) => { const host = document.querySelector(sel); if (host) nodes.forEach((n) => host.appendChild(n)); };

  /* ---- Brand campaigns contact sheet ---- */
  const sheet = [
    { id: "photo-1469334031218-e382a71b716b", kind: "tall" },
    { id: "photo-1441984904996-e0b6ba687e04", kind: "wide" },
    { id: "photo-1483985988355-763728e1935b", kind: "tall up" },
    { id: "photo-1490481651871-ab68de25d43d", kind: "sq" },
    { id: "photo-1509631179647-0177331693ae", kind: "tall" },
    { id: "photo-1515372039744-b8f02a3ae446", kind: "wide" },
    { id: "photo-1487222477894-8943e31ef7b2", kind: "tall up" },
  ];
  mount(
    "#contactSheet",
    sheet.map((s) =>
      el(`<figure class="cs-item cs-item--${s.kind}"><img src="${IMG(s.id, 900)}" alt="Brand campaign visual" loading="lazy" /></figure>`)
    )
  );

  /* ---- Why: benefits ---- */
  const benefits = [
    { num: "01", title: "Faster Production", img: "photo-1518770660439-4636190af475", copy: "Scalable AI visuals that reduce production costs and accelerate campaigns from brief to delivery." },
    { num: "02", title: "Human Art Direction", img: "photo-1558655146-9f40138edfeb", copy: "Every frame is directed by people. AI is the tool; taste and intent are the product." },
    { num: "03", title: "Brand Asset Consistency", img: "photo-1550439062-609e1531270e", copy: "A visual system that keeps thousands of assets unmistakably, deliberately on-brand." },
  ];
  mount(
    "#benefits",
    benefits.map((b) =>
      el(`
      <div class="benefit" data-reveal>
        <span class="benefit__num fade">${b.num}</span>
        <h3 class="benefit__title fade">${b.title}</h3>
        <div>
          <div class="benefit__media img-mask"><img src="${IMG(b.img, 800)}" alt="${b.title}" loading="lazy" /></div>
          <p class="benefit__copy fade">${b.copy}</p>
        </div>
      </div>`)
    )
  );

  /* ---- Services ---- */
  const services = [
    { name: "Campaign Imagery", img: "photo-1469334031218-e382a71b716b", copy: "Art-directed hero imagery for launches, lookbooks, and platform campaigns." },
    { name: "Product Visuals", img: "photo-1515886657613-9f3515b0c78f", copy: "Premium product visuals — every angle, colorway, and context, generated at scale." },
    { name: "Social Content", img: "photo-1611162617213-7d7a39e9b1d7", copy: "Platform-native content built to move: reels, stories, and scroll-stopping stills." },
    { name: "AI Video", img: "photo-1492691527719-9d1e07e534b4", copy: "Motion and short-form film — cinematic sequences directed frame by frame." },
  ];
  mount(
    "#svcList",
    services.map((s, i) =>
      el(`
      <div class="svc" tabindex="0" data-cursor="VIEW">
        <span class="svc__idx">0${i + 1}</span>
        <span class="svc__name">${s.name}</span>
        <span class="svc__arw" aria-hidden="true">↗</span>
        <div class="svc__media"><img src="${IMG(s.img, 700)}" alt="${s.name}" loading="lazy" /></div>
        <p class="svc__copy">${s.copy}</p>
      </div>`)
    )
  );

  /* ---- Partners logos ---- */
  const logos = ["Aurora", "Meridian", "Nova", "Kinfolk", "Atlas", "Vellum", "Halo", "Onyx", "Verve", "Lumen"];
  mount("#logoTrack", logos.map((l) => el(`<span class="logo-chip">${l}</span>`)));

  /* ---- Portfolio (from shared data) ---- */
  const D = window.GEN_DATA;
  if (D) {
    mount(
      "#pfList",
      D.projects.map((p) =>
        el(`
        <a class="pf" href="projects/${p.slug}.html" data-cursor="VIEW PROJECT">
          <div class="pf__top">
            <span class="pf__title">${p.title}</span>
            <span class="pf__arw" aria-hidden="true">↗</span>
          </div>
          <div class="pf__meta">
            <span>${p.date}</span><span>${p.category}</span><span>Client: ${p.client}</span><span>${p.location}</span>
          </div>
          <div class="pf__media"><img src="${IMG(p.cover, 700)}" alt="${p.title}" loading="lazy" /></div>
        </a>`)
      )
    );
  }

  /* ---- Reviews / results ---- */
  const results = [
    { num: 100, suffix: "+", label: "Campaign Assets", quote: "Delivered in record time, all on-brand.", client: "Mara, Aurora", img: "photo-1494790108377-be9c29b29330" },
    { num: 3, suffix: "×", label: "Faster", quote: "Beautiful visuals delivered with remarkable speed.", client: "Jonas, Meridian", img: "photo-1500648767791-00dcc994a43e" },
    { num: 45, suffix: "%", label: "More Engagement", quote: "Social engagement jumped right after launch.", client: "Priya, Nova", img: "photo-1534528741775-53994a69daeb" },
    { num: 60, suffix: "%", label: "Faster Production", quote: "Cut our creative production time overall.", client: "Theo, Atlas", img: "photo-1506794778202-cad84cf45f1d" },
  ];
  mount(
    "#results",
    results.map((r) =>
      el(`
      <div class="result" data-reveal>
        <div class="result__num fade"><span data-count="${r.num}" data-suffix="${r.suffix}">0${r.suffix}</span></div>
        <div class="result__label fade">${r.label}</div>
        <p class="result__quote fade">"${r.quote}"</p>
        <div class="result__client fade"><img src="${IMG(r.img, 120)}" alt="" /><span>${r.client}</span></div>
      </div>`)
    )
  );

  /* ---- Process steps ---- */
  const steps = [
    { num: "01", label: "Discovery", big: "Vision", title: "Discovery", copy: "Share your brand and goals. We listen, research, and define what success looks like." },
    { num: "02", label: "Direction", big: "Strategy", title: "Direction", copy: "We define the creative approach — references, palette, motion, and tone." },
    { num: "03", label: "Creation", big: "Production", title: "Creation", copy: "AI-generated visual content, art-directed frame by frame until it's right." },
    { num: "04", label: "Handoff", big: "Delivery", title: "Handoff", copy: "Assets exported and organized for every platform, ready to ship." },
  ];
  mount(
    "#steps",
    steps.map((s) =>
      el(`
      <div class="step" data-label="${s.label}" data-big="${s.big}">
        <span class="step__num">${s.num}</span>
        <h3 class="step__title">${s.title}</h3>
        <div class="step__sub">${s.big}</div>
        <p class="step__copy">${s.copy}</p>
      </div>`)
    )
  );

  /* ---- Masonry gallery ---- */
  const masonry = [
    { id: "photo-1524504388940-b1c1722653e1", cap: { b: "Tracy", s: "New York" } },
    { id: "photo-1506863530036-1efeddceb993", cap: null },
    { id: "photo-1519085360753-af0119f7cbe7", cap: { b: "Alex", s: "Frankfurt" } },
    { id: "photo-1517841905240-472988babdf9", cap: null },
    { id: "photo-1487412720507-e7ab37603c6f", cap: { b: "Andrew", s: "Rotterdam" } },
    { id: "photo-1517245386807-bb43f82c33c4", cap: null },
    { id: "photo-1529626455594-4ff0802cfb7e", cap: null },
    { id: "photo-1502378735452-bc7d86632805", cap: null },
    { id: "photo-1521572163474-6864f9cf17ab", cap: null },
  ];
  mount(
    "#masonry",
    masonry.map((m) =>
      el(`
      <figure class="masonry__item img-mask" data-cursor="VIEW">
        <img src="${IMG(m.id, 700)}" alt="${m.cap ? m.cap.b + ", " + m.cap.s : "Project visual"}" loading="lazy" />
        ${m.cap ? `<figcaption class="masonry__cap"><b>${m.cap.b}</b><span>${m.cap.s}</span></figcaption>` : ""}
      </figure>`)
    )
  );

  if (window.GEN_bindCursor) window.GEN_bindCursor();
})();
