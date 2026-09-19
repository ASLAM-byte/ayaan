# OCHA — Editorial Matcha Brand Site

A production-quality, animation-heavy **editorial matcha brand website**, built as an
original recreation of the OCHA reference experience: brutalist/editorial art direction,
oversized typography, cream backgrounds, matcha-green accents, structured grids, and a
premium scroll/animation system.

> **Original build.** All code and copy are written from scratch. The visual reference
> could not be scraped, so this is an interpretation of the described design language —
> not a copy of any template's markup or assets. Imagery uses free-to-use Unsplash photos.

## Tech

- **Zero build step, zero dependencies.** Plain HTML, CSS, and vanilla JavaScript.
- Just open the files (or serve the folder) — nothing to install.

## Run it

```bash
cd ocha
python3 -m http.server 8080   # then open http://localhost:8080
```

Or open `index.html` directly in a browser.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Full single-page experience (all sections below) |
| `journal.html` | Editorial article detail page ("Daily Ritual") |

## Sections (homepage)

Navigation (sticky, scroll-transforming) + full-screen mobile menu → oversized **hero**
with progressive wordmark reveal → matcha ticker → **Specials** menu with editorial
hover/click preview → **Reviews** (oversized testimonials) → **Inside (the) Ocha** team
(asymmetric grid, hover zoom, staggered reveal) → **Merch** (draggable horizontal gallery,
image-swap on hover) → **Community** events grid → **Daily Ritual** journal carousel →
animated **FAQ** accordion → large **Location/footer** with an enormous OCHA wordmark and
final CTA.

## Animation system (`js/anim.js`)

- Page-load reveal + nav intro
- Character/word text splitting with staggered reveals
- Fade + vertical movement on scroll (IntersectionObserver)
- Image reveal masks + scale-in
- Marquee / infinite ticker loops
- Scroll-linked parallax + horizontal type drift (single `requestAnimationFrame` loop)
- Magnetic buttons
- Context-aware **custom cursor** (VIEW / DRAG / ORDER / EXPLORE / READ / MEET) — desktop only
- **Respects `prefers-reduced-motion`** (all motion disabled, content shown immediately)

All animation uses GPU-friendly `transform`/`opacity` and cubic-bezier/spring easing.

## Editing content

All copy and imagery are data-driven — edit the arrays at the top of:

- `js/content.js` — menu, reviews, team, merch, events, articles, FAQ
- `js/article.js` — related articles on the journal page

No markup changes needed.

## Accessibility

Semantic HTML, heading hierarchy, keyboard-operable nav/menu/FAQ (with `aria-expanded`
/ `aria-controls`), visible focus states, image alt text, and a full reduced-motion path.

## Responsive

Tuned and overflow-guarded across 375 / 390 / 430 / 768 / 1024 / 1440 / 1920 px.
Mobile uses single-column layouts, swipeable horizontal galleries, a full-screen menu,
reduced parallax, and no horizontal overflow.

## Testing

```bash
node smoke-test.mjs
```

Serves the folder, verifies both pages return 200, all CSS/JS assets resolve, and key
sections/hooks are present. **16/16 checks pass.**
