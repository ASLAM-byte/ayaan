# Studio — Full-Stack Designer Portfolio

A minimal, dark, typography-led designer/developer portfolio — **front to back**.
Inspired by the modern minimal-portfolio aesthetic (clean statement hero, a "selected work"
list, an about section, and a working contact form).

> This is an **original build**, not a copy of any specific commercial template.
> Content and design are placeholders you can freely edit.

## Highlights

- **Zero external dependencies.** Backend runs on Node's built-in `http` server and the
  built-in `node:sqlite` database — no `npm install` needed.
- **Real backend:** projects are served from a SQLite database; the contact form actually
  persists messages.
- **Responsive dark frontend** with subtle scroll-reveal animation and a floating-label
  contact form that talks to the API.

## Requirements

- Node.js **22.5+** (for the built-in `--experimental-sqlite` support)

## Getting started

```bash
cd portfolio

# 1. Create + seed the database
npm run seed

# 2. Start the server
npm start
# → http://localhost:3000
```

There are no packages to install.

## API

| Method | Route                   | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/api/health`           | Health check                       |
| GET    | `/api/projects`         | List all projects (ordered)        |
| GET    | `/api/projects/:slug`   | Get one project by slug            |
| POST   | `/api/contact`          | Submit a contact message           |
| GET    | `/api/messages`         | List submitted messages (admin)    |

`POST /api/contact` body:

```json
{ "name": "Ada", "email": "ada@example.com", "body": "Hello!" }
```

Validation errors return `400` with `{ "errors": [ ... ] }`.

## Project structure

```
portfolio/
├── package.json
├── src/
│   ├── server.js       # Node http server + API + static serving
│   ├── db.js           # built-in SQLite setup & schema
│   ├── seed.js         # seed the projects table
│   └── smoke-test.js   # end-to-end check of every endpoint
└── public/
    ├── index.html      # markup
    ├── styles.css      # dark minimal theme
    └── app.js          # fetches projects, handles contact form
```

## Customise

- **Projects:** edit the array in `src/seed.js`, then re-run `npm run seed`.
- **Copy / about text:** edit `public/index.html`.
- **Colors & type:** edit the CSS variables at the top of `public/styles.css`.

## Testing

```bash
node --experimental-sqlite src/smoke-test.js
```

Boots the server, exercises every endpoint (including validation and static files),
prints a pass/fail summary, and shuts down.
