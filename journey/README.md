# Journey — Editorial Wedding Microsite

An original, premium **editorial wedding website** — warm cream backgrounds, muted plum & gold
accents, an editorial serif paired with a clean sans, and a cinematic scroll/motion system.
Built as a single-page experience plus a wedding blog and reusable article pages.

> **Original build.** All copy and layout are written from scratch; imagery uses free-to-use
> Unsplash photos. The reference site was used only for category and quality direction — no
> proprietary text, photography, logos, or layouts were reproduced.

## Tech

- **Zero dependencies, zero build step.** Plain HTML, CSS, and vanilla JavaScript.

```bash
cd journey
python3 -m http.server 8080   # http://localhost:8080
```

## Pages

| File | Purpose |
|------|---------|
| `index.html` | The full single-page experience (all sections below) |
| `blog.html` | Wedding blog listing |
| `article.html` | Reusable article template (`article.html?a=<slug>`) |
| `404.html` | Not found |

## Homepage sections

Hero (full-bleed photo + oversized names, RSVP CTA, fading scroll indicator) → **Meet the
Couple** (split editorial profiles; carousel with prev/next on mobile) → oversized **quote**
(line-by-line reveal) → **relationship facts** (with a count-up stat) → **Our Journey**
sticky-progress timeline with masked image reveals → **The Big Day** (Ceremony / Reception /
Dress Code editorial blocks) → large **wedding date** visual → **event timeline**
(4:00 → 8:00) → live **countdown** → **RSVP** over a photograph (validation → success state) →
**Gift Registry** (Wedding Registry + Honeymoon Fund) → **Wedding Blog** carousel →
photographic collage **footer**.

## One central config

Everything a couple changes lives in **`js/config.js`** → `weddingConfig` (couple + profiles,
quote, facts, date / time / timezone, venue + map URL, journey timeline, ceremony / reception /
dress code, event timeline, gallery, registry, blog articles, RSVP). Update those and the whole
site follows — no component edits needed.

## Features

- **Live countdown** computed from the config date/time/timezone, ticking each second with a
  subtle digit transition and a graceful post-wedding message.
- **Couple carousel** — split composition on desktop, swipeable prev/next on mobile.
- **Count-up** relationship stat that animates when it enters the viewport.
- **Sticky-progress journey timeline** with alternating sides and masked image reveals.
- **RSVP** — validation with default/focus/error/submitting states → an in-place success
  confirmation (saved locally). Fields: name, email, phone, attending, guest count, dietary, message.
- **Gift registry** with hover image-zoom and arrow movement.
- **Wedding blog** — draggable/swipeable carousel + a listing page + reusable article pages
  (`?a=<slug>`) with a "Next Story" transition.
- **Motion system** — masked image reveals, line/word text splitting, parallax, magnetic
  buttons, custom cursor, clip-path page transitions. Full **`prefers-reduced-motion`** support.

## Architecture

```
journey/
├── css/  base.css   — tokens, type scale, reveal primitives, reduced-motion, guards
│         site.css   — components/sections, sticky timeline, RSVP, blog, footer, responsive
├── js/   config.js     — weddingConfig (the only file most couples edit)
│         partials.js   — injects nav / mobile menu / photographic footer / overlays
│         render.js     — builds every homepage section + binds text from config
│         components.js  — couple carousel, countdown, RSVP states, drag carousels
│         engine.js      — reveals (IO), text split, count-up, parallax, timeline progress, cursor
│         ui.js          — loader, mobile menu, page transitions
├── index.html, blog.html, article.html, 404.html
```

Script order per page: `config → partials → render → components → engine → ui`.

## Accessibility

Semantic HTML and heading hierarchy, keyboard-operable nav / mobile menu (with `aria-expanded`),
labelled form fields with accessible error text, visible focus states, alt text, and a full
reduced-motion path.

## Responsive

Recomposed (not just shrunk) and overflow-guarded across 375 / 390 / 430 / 768 / 1024 / 1280 /
1440 / 1920px: hero type scales down but stays dramatic, couple becomes a carousel, journey and
events reflow to a single-column timeline, blog is swipeable, RSVP is single-column, footer
collage collapses to two columns, full-screen mobile menu.

## Testing

```bash
node smoke-test.mjs
```

Serves the site and verifies all 4 pages return 200, all 8 assets resolve, every render host +
section id is present, script order is correct, and config integrity holds. **20/20 checks pass.**
