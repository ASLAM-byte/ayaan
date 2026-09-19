# Wedding Invitation — Bilingual (EN / AR) Microsite

An original, premium **bilingual wedding invitation microsite** — romantic editorial art
direction, warm ivory/charcoal palette, elegant serif display type, and a full scroll/motion
system. Genuine **English (LTR)** and **Arabic (RTL)** experiences driven by one config.

> **Original build.** All copy (including the Arabic) is written from scratch; imagery uses
> free-to-use Unsplash photos; the music player uses empty audio placeholders (no copyrighted
> audio). This is an independent design in the romantic-wedding genre — not a copy of any
> specific commercial template.

## Tech

- **Zero dependencies, zero build step.** Plain HTML, CSS, and vanilla JavaScript.

```bash
cd wedding
python3 -m http.server 8080   # http://localhost:8080
```

## Pages

| English | Arabic (RTL) |
|---------|--------------|
| `index.html` | `ar/index.html` |
| `our-story.html` | `ar/our-story.html` |
| `rsvp.html` | `ar/rsvp.html` |
| `youre-in.html` | `ar/youre-in.html` |
| `404.html` | — |

The **language switcher preserves the current page** (`/our-story.html` ↔ `/ar/our-story.html`).

## One central config

Everything a couple needs to change lives in **`js/config.js`** → `weddingConfig`
(couple names, date/time/timezone, venue + map URL, schedule, dress code + swatches, story
timeline, gallery, FAQ, contact, music) plus a `window.i18n` block of EN/AR UI strings.
Change those values and the whole site — both languages — updates. No component edits needed.

## Features

- **Live countdown** (days/hours/minutes/seconds) computed from the config date/time/timezone,
  updating every second, with a subtle digit tick and a graceful post-date state
  ("Today, and always." / "اليوم، وإلى الأبد."). Arabic renders Eastern-Arabic numerals.
- **Cinematic hero** — staggered serif name reveal, botanical ornament, parallax photos.
- **Our Story** — scroll-activated vertical **timeline** with a progress spine and masked image reveals.
- **Schedule, Venue** (working *Get Directions* map link + parallax image), **Dress Code** with color swatches.
- **Editorial gallery** — asymmetric grid + **lightbox** (click, arrow buttons, keyboard ←/→, Esc; RTL-aware arrows).
- **Animated FAQ** accordion (smooth height, +/− icon).
- **Discreet music player** — play/pause/next/prev + animated visualizer; **starts only on user gesture**
  (no autoplay). Ships with silent placeholders — drop in your own licensed audio via `config.music`.
- **Functional RSVP** — validation with default/focus/error/submitting states → saves locally → routes to **You're In**,
  a celebratory confirmation page with drifting petals.
- **Genuine RTL** — mirrored nav, timeline, arrows, spacing, and dedicated Arabic typography (Amiri / Cairo) — not just `direction: rtl`.
- **Motion system** — masked image reveals, line/word text splitting, parallax, floating botanicals,
  magnetic buttons, custom cursor, clip-path page transitions. Full **`prefers-reduced-motion`** support.

## Architecture

```
wedding/
├── css/  base.css   — tokens, type scale, reveal primitives, RTL base, reduced-motion
│         site.css   — all components/sections, RTL mirroring, responsive
├── js/   config.js     — weddingConfig + i18n (the only file most couples edit)
│         partials.js   — injects bilingual nav / mobile menu / footer / music player
│         render.js     — builds schedule, swatches, FAQ, timeline from config
│         page.js       — binds [data-i18n] + config values into each page
│         components.js  — countdown, gallery+lightbox, FAQ, music player, RSVP, petals
│         engine.js      — reveals (IO), text split, parallax, timeline progress, cursor
│         ui.js          — loader, mobile menu, page transitions
├── index / our-story / rsvp / youre-in / 404 .html
└── ar/index / our-story / rsvp / youre-in .html
```

Script order per page: `config → partials → render → page → components → engine → ui`.

## Accessibility

Semantic HTML and heading hierarchy, keyboard-operable nav / mobile menu / FAQ / lightbox
(with `aria-expanded`, `aria-modal`, roles), labelled form fields, visible focus states, alt
text, correct `lang`/`dir`, and a full reduced-motion path.

## Responsive

Recomposed (not just shrunk) and overflow-guarded across 375–1920px: single-column stacks,
timeline reflows to a left/right rail, gallery collapses gracefully, full-screen mobile menu,
disabled parallax and custom cursor on touch.

## Testing

```bash
node smoke-test.mjs
```

Serves the site and verifies all 9 pages return 200, all 9 assets resolve, EN/AR wiring
(lang/dir, `../` paths, Arabic copy), script order, config integrity (incl. empty audio src),
and RSVP form structure. **28/28 checks pass.**
