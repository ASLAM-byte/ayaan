# Velvet Promise — Editorial Fashion Brand Site

An original, romantic **editorial fashion brand website** — a Paris atelier of slow-made silk
intimates and eveningwear. Serif display typography, a burgundy/velvet + cream palette, and a
premium scroll/motion system.

> **Original build.** All copy, layout, and code are written from scratch; imagery uses
> free-to-use Unsplash photos. This is an independent design in the romantic-editorial genre —
> not a copy of any specific commercial template.

## Tech

- **Zero dependencies, zero build step.** Plain HTML, CSS, and vanilla JavaScript.

```bash
cd velvet
python3 -m http.server 8080   # http://localhost:8080
```

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, marquee, the edit, atelier story, campaign film, values, newsletter |
| `shop.html` | Full collection grid (from shared product data) |
| `about.html` | The Atelier — scroll storytelling |
| `contact.html` | Editorial underline-input contact form |
| `404.html` | Not found |

## Motion & interaction system

- Page loader + staggered hero reveal (clipped serif lines rising into view)
- Word/character text splitting with stagger
- Masked image reveals + slow scale-in on scroll (IntersectionObserver)
- Product hover image-swap
- Infinite marquees (slow on hover)
- Scroll-linked parallax (single `requestAnimationFrame` loop)
- Magnetic buttons, animated underlines
- Context-aware **custom cursor** (SHOP / VIEW / READ / PLAY / SEND …) — desktop only
- Clip-path **page transitions** between routes
- Campaign-film **lightbox**
- Full **`prefers-reduced-motion`** path (motion disabled, content shown immediately)

All motion uses GPU-friendly `transform` / `opacity` with cubic-bezier / spring easing.

## Architecture

```
velvet/
├── css/  base.css   — tokens, type scale, buttons, reveal primitives, reduced-motion
│         site.css   — components, sections, inner-page layouts, responsive
├── js/   engine.js    — reveals (IO), text split+stagger, marquee dup, parallax,
│                         magnetic, custom cursor
│         ui.js        — loader/hero intro, mobile menu, page transitions,
│                         film lightbox, newsletter
│         partials.js  — injects nav / mobile menu / footer / overlays on every page
│         data.js      — shared product data (window.VP_DATA)
│         content.js   — homepage collection rendering
└── index.html, shop.html, about.html, contact.html, 404.html
```

Content is **data-driven**: edit `js/data.js` (products) — the homepage edit and shop grid both
render from it.

## Accessibility

Semantic HTML and heading hierarchy, keyboard-operable nav / mobile menu (with `aria-expanded`),
visible focus states, image alt text, an accessible contact form, and the reduced-motion path.

## Responsive

Overflow-guarded and recomposed across 375–1920px: single-column stacks on mobile, hidden
decorative hero images, disabled parallax and custom cursor on touch, full-screen mobile menu.

## Testing

```bash
node smoke-test.mjs
```

Serves the site and verifies all 5 pages return 200, all 7 CSS/JS assets resolve, script order
is correct, and the shared product data is intact. **17/17 checks pass.**
