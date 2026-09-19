# GEN STUDIO — Editorial AI Creative Studio Website

A production-quality, animation-heavy **editorial creative-studio website** — an original
recreation of the "Gen Studio" experience: Human × AI generative visual production, oversized
typography, editorial grids, black/white/neutral palette, and a sophisticated scroll/motion system.

> **Original build.** All code and copy are written from scratch. The visual reference could
> not be scraped, so this is an interpretation of the described design language — not a copy of
> any template's markup or assets. Imagery uses free-to-use Unsplash photos.

## Tech

- **Zero dependencies, zero build step.** Plain HTML, CSS, and vanilla JavaScript.
- Just serve the folder — nothing to install.

```bash
cd genstudio
python3 -m http.server 8080   # http://localhost:8080
```

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Full homepage (all sections below) |
| `projects.html` | Projects listing |
| `projects/<slug>.html` | Reusable **case-study** template (Time Travel, Legal Office, Essence Studio, Brew District) |
| `projects/_template.html` | Source template the case-study pages are generated from |
| `about.html` | About — scroll-storytelling |
| `blog.html` / `article.html` | Journal listing + article reader (`article.html?a=<slug>`) |
| `contact.html` | Editorial underline-input contact form |
| `terms.html` / `privacy.html` / `404.html` | Legal + not-found |

## Homepage sections

Cinematic **hero** (Human × AI label, oversized staggered title, parallax image collage) →
Human × AI **marquee** → **Brand Campaigns** drag-scroll contact sheet → **Why Gen Studio**
(three editorial benefit blocks) → **Services** editorial accordion (image expands on hover;
tap-accordion on mobile) → **Creative Partners** infinite logo marquee → **Portfolio** large
project rows (hover image + `VIEW PROJECT` cursor) → **Reviews** with count-up numbers →
cinematic **Showreel** (play → lightbox) → **Creative Process** sticky scroll-activated timeline
(01–04) → **Project Gallery** masonry → enormous **Imagine More With Us** CTA → editorial footer.

## Architecture

```
genstudio/
├── css/  base.css   — tokens, grid, type scale, reveal primitives, reduced-motion
│         site.css   — components & homepage sections + responsive
│         pages.css  — inner-page layouts
├── js/   engine.js      — reveals (IO), text split+stagger, counters, marquee dup,
│                           parallax, magnetic, custom cursor, drag-scroll
│         ui.js          — loader/hero intro, nav, mobile menu, page transitions,
│                           services accordion, showreel lightbox, process timeline
│         partials.js    — injects nav / mobile menu / footer / overlays on every page
│         data.js        — shared project + article data (window.GEN_DATA)
│         content.js     — homepage rendering
│         case-study.js  — renders a case study from <body data-slug>
├── index.html, projects.html, about.html, blog.html, article.html,
│   contact.html, terms.html, privacy.html, 404.html
└── projects/<slug>.html
```

Content is **data-driven**: edit `js/data.js` (projects/articles) and the arrays in
`js/content.js` (campaigns, benefits, services, results, process, gallery) — no markup changes.

## Animation & interaction system

- Page loader + staggered hero reveal
- Character/word text splitting; line-mask reveals
- Fade-up, clip-path, and image-mask + scale reveals on scroll (IntersectionObserver)
- Number counters that count up in view
- Infinite marquees (left/right, slow on hover)
- Scroll-linked parallax (single rAF loop)
- Magnetic buttons, animated underlines
- Sticky scroll-activated process timeline
- Context-aware **custom cursor** (VIEW / DRAG / PLAY / VIEW PROJECT / READ / EXPLORE …) — desktop only
- Clip-path **page transitions** between routes
- Showreel **lightbox**
- Full **`prefers-reduced-motion`** path (motion disabled, content shown immediately)

All motion uses GPU-friendly `transform` / `opacity` with cubic-bezier / spring easing.

## Accessibility

Semantic HTML and heading hierarchy, keyboard-operable nav / dropdown / mobile menu / accordion
(with `aria-expanded` / `aria-controls`), visible focus states, image alt text, an accessible
contact form, and the reduced-motion path.

## Responsive

Recomposed (not just shrunk) and overflow-guarded across 375 / 390 / 430 / 768 / 1024 / 1280 /
1440 / 1920px. Mobile uses single columns, swipeable horizontal galleries, a full-screen menu,
tap accordions, disabled parallax, and no custom cursor.

## Testing

```bash
node smoke-test.mjs
```

Serves the site and verifies all 13 pages return 200, all 9 CSS/JS assets resolve, script order
is correct, case studies set their slug and use `../` paths, and the shared data is intact.
**28/28 checks pass.**
