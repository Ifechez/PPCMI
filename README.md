# PPCMI website — Vercel demo (front-end only)

A **self-contained preview** of the PPCMI web app for showing people what is being built.
Every page works — Home, About, Programs, Gallery (photos + videos), Blogs, Devotion, Prayer, Events, Contact, Testimonies,
Support the Gospel, the chatbox and **the whole admin console** — with **no server and no database needed**.

How: this build includes a small "demo engine" (`src/demo/`) that plays the part of the real Laravel backend inside the visitor's browser.

* **Admin console:** open `/admin` (a "Demo preview" badge has a link). The login is pre-filled — just press *Sign in*
  (`admin@ppcmi.org` / `ChangeMe123!`).
* Anything added in the demo (a blog post, a video link, a branch, a message from the Contact form) shows up right away, and is kept
  **only while that browser tab stays open** — it is never shared with other visitors and never stored on a server.
* Photos/videos uploaded in the demo only last for the session. Emails are not actually sent.
* The small "● Demo preview" badge explains this to visitors: the full app (real database, daily emails, message inbox, uploads)
  goes live once hosting and a domain are in place.

## Deploy on Vercel
1. Put this folder in a GitHub repository (or use the Vercel CLI).
2. Vercel → **Add New → Project** → import it. It detects Vite automatically (build `npm run build`, output `dist`). No settings needed.
3. **Deploy.** Share the link.

Or with the CLI: `npm i -g vercel` → `vercel` → `vercel --prod`.

## Run on your computer
```bash
npm install
npm run dev
```

## Remove the demo badge later
Delete `<DemoBadge />` from `src/main.jsx`. (To connect this front-end to the real Laravel backend instead, remove `install()`
in `src/main.jsx` and use the "ppcmi-frontend-vercel" package with a backend address.)
