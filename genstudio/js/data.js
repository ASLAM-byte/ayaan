/* ============================================================
   GEN STUDIO — Shared data (projects, articles).
   All copy is original; imagery uses free-to-use Unsplash photos.
   Loaded on pages that need project/article data.
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

  window.GEN_DATA = {
    IMG,
    projects: [
      {
        slug: "time-travel",
        title: "Time Travel",
        date: "Jan 28, 2026",
        category: "Short Form Videos",
        client: "John",
        location: "New York",
        cover: "photo-1478760329108-5c3ed9d495a0",
        gallery: ["photo-1490481651871-ab68de25d43d", "photo-1509631179647-0177331693ae", "photo-1515886657613-9f3515b0c78f"],
        challenge: "Launch a heritage watchmaker into a younger market without losing its archival gravitas.",
        direction: "We built a retro-futurist visual world — analog textures, chrome, and motion that folds decades into a single frame.",
        result: "A launch film and 40+ social cutdowns delivered in nine days, driving a 3× lift in launch-week engagement.",
      },
      {
        slug: "legal-office",
        title: "Legal Office",
        date: "Jan 28, 2026",
        category: "Short Form Videos",
        client: "Steve",
        location: "Dallas",
        cover: "photo-1521737604893-d14cc237f11d",
        gallery: ["photo-1497366754035-f200968a6e72", "photo-1524758631624-e2822e304c36", "photo-1600880292203-757bb62b4baf"],
        challenge: "Make corporate law feel human, precise, and quietly confident.",
        direction: "Muted palette, architectural symmetry, and restrained motion that signals trust over spectacle.",
        result: "A brand system and campaign set that repositioned a regional firm as a national contender.",
      },
      {
        slug: "essence-studio",
        title: "Essence Studio",
        date: "Jan 28, 2026",
        category: "Short Form Videos",
        client: "Andrew",
        location: "Washington",
        cover: "photo-1522337660859-02fbefca4702",
        gallery: ["photo-1596462502278-27bfdc403348", "photo-1571781926291-c477ebfd024b", "photo-1512496015851-a90fb38ba796"],
        challenge: "Give a fragrance house a scent you can almost see.",
        direction: "Liquid light, soft focus, and slow reveals — imagery that behaves like a note unfolding.",
        result: "A campaign that sold through its first drop in 72 hours across three platforms.",
      },
      {
        slug: "brew-district",
        title: "Brew District",
        date: "Jan 28, 2026",
        category: "Short Form Videos",
        client: "Charlotte",
        location: "Delaware",
        cover: "photo-1447933601403-0c6688de566e",
        gallery: ["photo-1461023058943-07fcbe16d735", "photo-1509042239860-f550ce710b93", "photo-1445116572660-236099ec97a0"],
        challenge: "Turn a neighborhood roastery into a lifestyle brand people wear on their sleeve.",
        direction: "Warm grain, honest hands, morning light — craft made cinematic without losing the corner-shop soul.",
        result: "A visual identity and content engine that doubled the roastery's online following in a season.",
      },
    ],

    articles: [
      { slug: "ai-art-direction", cat: "Perspective", date: "Feb 2026", title: "Why Art Direction Still Wins in the Age of AI", img: "photo-1541701494587-cb58502866ab", excerpt: "Generative tools make everything possible — taste is what makes something worth making." },
      { slug: "production-in-days", cat: "Process", date: "Jan 2026", title: "From Brief to Campaign in Days, Not Months", img: "photo-1558655146-9f40138edfeb", excerpt: "How a focused AI pipeline compresses the production calendar without cutting the craft." },
      { slug: "brand-consistency", cat: "Craft", date: "Dec 2025", title: "Keeping a Brand Consistent Across a Thousand Assets", img: "photo-1550439062-609e1531270e", excerpt: "The systems we use to keep every generated frame unmistakably on-brand." },
      { slug: "motion-language", cat: "Motion", date: "Nov 2025", title: "Designing a Motion Language for a Studio", img: "photo-1536240478700-b869070f9279", excerpt: "Easing, rhythm, and restraint — the invisible grammar behind expensive-feeling motion." },
    ],
  };
})();
