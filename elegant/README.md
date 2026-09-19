# Elegant Wedding — Bilingual (EN / AR) Editorial Microsite

An original, luxury **bilingual wedding microsite** — refined editorial art direction, an
ivory / olive / terracotta palette, an editorial serif paired with a clean sans, and a
cinematic scroll/motion system. Genuine **English (LTR)** and **Arabic (RTL)** experiences,
all driven by one config.

> **Original build.** All copy (including the Arabic) is written from scratch; imagery uses
> free-to-use Unsplash photos; the music player uses empty audio placeholders (no copyrighted
> audio). The reference site was used only as creative direction — no proprietary text, images,
> or layouts were reproduced.

## Tech

- **Zero dependencies, zero build step.** Plain HTML, CSS, and vanilla JavaScript.

```bash
cd elegant
python3 -m http.server 8080   # http://localhost:8080
```

## Pages

| English | Arabic (RTL) |
|---------|--------------|
| `index.html` (Home) | `ar/index.html` |
| `our-story.html` | `ar/our-story.html` |
| `wedding.html` (The Wedding) | `ar/wedding.html` |
| `gallery.html` | `ar/gallery.html` |
| `rsvp.html` | `ar/rsvp.html` |
| `faq.html` | `ar/faq.html` |
| `confirmation.html` | `ar/confirmation.html` |
| `404.html` | — |

The **language switcher preserves the current page** (`/gallery.html` ↔ `/ar/gallery.html`).

## One central config

Everything a couple changes lives in **`js/config.js`** → `weddingConfig` (couple, date /
time / timezone, venue + map URL, schedule, story timeline, gallery, FAQ, dress code + palette,
music, contact) plus a `window.i18n` block of EN/AR UI strings. Update those and the whole
site — both languages — follows. No component edits needed.

## Features

- **Asymmetric editorial hero** — staggered serif name reveal, botanical ornament, masked
  photo + parallax accent frame, and a scroll indicator that fades once you scroll.
- **Live countdown** from the config date/time/timezone, ticking each second with a subtle
  digit transition and a graceful post-wedding message. Arabic uses Eastern-Arabic numerals.
- **Our Story** — sticky-progress vertical **timeline** with alternating sides and masked image reveals.
- **The Wedding** — elegant schedule (Ceremony / Cocktails / Dinner / Dancing) + venue with a
  working *Get Directions* map link and parallax image.
- **Dress code** with a tasteful color palette; **editorial gallery** with a mixed-ratio grid
  and a **lightbox** (click, arrow buttons, keyboard ←/→, Esc; RTL-aware).
- **Animated FAQ** accordion (smooth height, +/− icon).
- **Discreet music player** — play/pause/next/prev + animated visualizer; **starts only on a
  user gesture** (no autoplay). Ships silent; add your own licensed audio via `config.music`.
- **Polished RSVP** — validation with default/focus/error/submitting states → saves locally →
  routes to **Confirmation**, a celebratory page with drifting botanical leaves.
- **Genuine RTL** — mirrored nav, timeline, arrows, spacing, and dedicated Arabic typography
  (Reem Kufi / IBM Plex Sans Arabic) — not merely `direction: rtl`.
- **Motion system** — masked image reveals, line/word text splitting, parallax, magnetic
  buttons, custom cursor, clip-path page transitions. Full **`prefers-reduced-motion`** support.

## Architecture

```
elegant/
├── css/  base.css   — tokens, type scale, reveal primitives, RTL base, reduced-motion
│         site.css   — components/sections, sticky timeline, lightbox, player, responsive
├── js/   config.js     — weddingConfig + i18n (the only file most couples edit)
│         partials.js   — injects bilingual nav / mobile menu / footer / music player
│         render.js     — builds schedule, palette, FAQ, timeline from config
│         page.js       — binds [data-i18n] + config values into each page
│         components.js  — countdown, gallery+lightbox, FAQ, music, RSVP, confirmation leaves
│         engine.js      — reveals (IO), text split, parallax, sticky-timeline progress, cursor
│         ui.js          — loader, mobile menu, page transitions
├── index / our-story / wedding / gallery / rsvp / faq / confirmation / 404 .html
└── ar/index / our-story / wedding / gallery / rsvp / faq / confirmation .html
```

Script order per page: `config → partials → render → page → components → engine → ui`.

## Accessibility

Semantic HTML and heading hierarchy, keyboard-operable nav / mobile menu / FAQ / lightbox
(with `aria-expanded`, `aria-modal`, roles), labelled form fields, visible focus states, alt
text, correct `lang`/`dir`, and a full reduced-motion path.

## Responsive

Recomposed (not just shrunk) and overflow-guarded across 375 / 390 / 430 / 768 / 834 / 1024 /
1280 / 1440 / 1920px: hero stacks, timeline reflows to a rail, gallery collapses gracefully,
full-screen mobile menu, disabled parallax and custom cursor on touch.

## Testing

```bash
node smoke-test.mjs
```

Serves the site and verifies all 15 pages return 200, all 9 assets resolve, EN/AR wiring
(lang/dir, `../` paths, Arabic copy), script order, config integrity (incl. empty audio src),
and key section structure. **36/36 checks pass.**
