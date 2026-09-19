import db from "./db.js";

// Original placeholder content — not copied from any template.
const projects = [
  {
    slug: "atlas-analytics",
    title: "Atlas Analytics",
    category: "Product Design",
    year: "2025",
    summary:
      "A data platform rebuilt around clarity — turning dense dashboards into calm, readable surfaces that teams actually trust.",
    role: "Lead Product Designer",
    link: "#",
    sort_order: 1,
  },
  {
    slug: "north-banking",
    title: "North Banking",
    category: "Design & Development",
    year: "2024",
    summary:
      "A mobile banking experience focused on restraint: fewer taps, honest numbers, and motion that never gets in the way.",
    role: "Design Engineer",
    link: "#",
    sort_order: 2,
  },
  {
    slug: "meridian-os",
    title: "Meridian OS",
    category: "Interface System",
    year: "2024",
    summary:
      "A component system and design language built for long-term thinking — consistent, documented, and quietly powerful.",
    role: "Systems Design",
    link: "#",
    sort_order: 3,
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    category: "Editorial & Web",
    year: "2023",
    summary:
      "A writing tool for researchers that treats performance as a feature — instant, offline-first, distraction-free.",
    role: "Design & Frontend",
    link: "#",
    sort_order: 4,
  },
];

const insert = db.prepare(
  `INSERT INTO projects (slug, title, category, year, summary, role, link, sort_order)
   VALUES (:slug, :title, :category, :year, :summary, :role, :link, :sort_order)
   ON CONFLICT(slug) DO UPDATE SET
     title=:title, category=:category, year=:year, summary=:summary,
     role=:role, link=:link, sort_order=:sort_order`
);

for (const row of projects) insert.run(row);

console.log(`Seeded ${projects.length} projects.`);
