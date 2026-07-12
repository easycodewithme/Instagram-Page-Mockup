# judiciarygold — Instagram profile clone

A pixel-faithful, **fully interactive** clone of the Instagram desktop profile page for
*Judiciary Gold by Toprankers* (`@judiciarygold`), built as a study/portfolio project.

Pure static site — plain HTML, CSS, and vanilla JS. No build step, no dependencies.

## Features (real, not mocked)
- **Follow / Following** toggle (syncs between header and post modal) with toast feedback
- **Tab switching** — Posts / Reels (filtered) / Tagged (empty state)
- **Post grid** — 20 posts recreated in CSS (no external images, nothing breaks)
- **Post modal** — click any tile to open; like toggle with live count, comment box, Escape/backdrop to close
- **Hover overlays** showing like & comment counts
- Story highlights, tooltips, notification badges
- Fully **responsive** (desktop rail → mobile bottom bar), keyboard focus states

## Run locally
Any static server works:
```bash
npx serve .
# or
python -m http.server 5173
```
Then open the printed URL.

## Deploy to Vercel
```bash
npm i -g vercel     # once
vercel              # preview deploy (follow the prompts)
vercel --prod       # production URL
```
Zero config needed — Vercel serves `index.html` directly.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Page structure + inline SVG icons |
| `styles.css` | Instagram dark theme + recreated post-tile styles |
| `data.js` | Profile info + the 20 posts |
| `app.js` | Rendering + all interactions |

> Not affiliated with Instagram or Judiciary Gold. Post images are CSS recreations, not the originals.
