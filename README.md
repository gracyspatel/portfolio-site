# Gracy Patel — Portfolio

A static portfolio site ("The Anatomy of Intelligence"). Plain HTML, CSS and JavaScript: no framework, no build step.

- `index.html` — page skeleton
- `data.json` — all content (edit this to change the site)
- `css/style.css` — styles
- `js/script.js` — builds the page from `data.json`
- `assets/` — résumé PDF

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Works as-is on GitHub Pages or Vercel. `vercel.json` tells Vercel this is a static site (no Next.js build).

The previous Next.js version of the site lives on the `nextjs-site` branch.
