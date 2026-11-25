/*
 * The Anatomy of Intelligence — builds the whole page from data.json.
 * To change content, edit data.json only. This file turns data into HTML and draws the figures.
 */

// ---------- Small helpers ----------

// Escape text so nothing in data.json can be interpreted as HTML.
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Only allow web, mailto, in-page and relative links (blocks "javascript:" etc).
const safeUrl = (u) => (/^(https?:|mailto:)/i.test(u) || !/^[a-z]+:/i.test(u) ? esc(u) : '#');

// "DNA Sequence Alignment" -> "dna-sequence-alignment"
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// <a> tag; external links open in a new tab.
const link = (url, label, cls = '') => {
  const ext = /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : '';
  return `<a href="${safeUrl(url)}"${ext}${cls ? ` class="${cls}"` : ''}>${esc(label)}</a>`;
};

const meta = (...parts) => parts.filter(Boolean).map(esc).join(' · ');
const bullets = (list = []) => (list.length ? `<ul class="bullets">${list.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '');
const stack = (list = []) => (list.length ? `<ul class="stack">${list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '');
const fold = (label, inner) => (inner.trim() ? `<details><summary>${esc(label)}</summary>${inner}</details>` : '');

// ---------- Hand-drawn annotation arrows (decorative) ----------
// Each shape is a slightly wobbly curve plus a loose two-stroke arrowhead. CSS flips/rotates them per placement.
const ARROWS = {
  swoop: ['M4 10 C16 4 34 3 48 11 C59 17 66 27 69 39', 'M69 39 C65 36.5 61 35.5 57.5 36 M69 39 C69.5 35 69 31 67.5 27.5'],
  curl: ['M4 44 C8 26 24 12 36 20 C45 26 37 37 30 30 C22 21 40 8 74 12', 'M74 12 C70 9 66 8 62.5 8.5 M74 12 C70.5 14 68 16.5 66.5 19'],
  hook: ['M12 4 C6 18 10 34 30 46', 'M30 46 C26 46.5 22.5 45.5 20 44 M30 46 C28.5 42.5 28 39 28.5 35.5'],
};
const arrow = (shape) => {
  const [body, head] = ARROWS[shape] || ARROWS.swoop;
  return `<svg class="ha" viewBox="0 0 80 50" aria-hidden="true" focusable="false"><path d="${body}"/><path d="${head}"/></svg>`;
};
// Handwritten note + arrow. color: pink | sage | blue. Purely decorative, so hidden from screen readers.
const note = (text, shape, color, cls = '') =>
  text ? `<span class="hn ${color} ${cls}" aria-hidden="true"><span class="hn-t">${esc(text)}</span>${arrow(shape)}</span>` : '';

// ---------- Fig. 1: brain, lateral view (front of the brain on the left) ----------
const BRAIN_PATHS = [
  // cerebrum outline
  'M64 178 C56 128 92 78 150 58 C200 40 262 42 306 64 C346 84 372 120 370 160 C368 190 352 212 330 222 C318 236 296 244 272 242 C262 250 240 254 222 250 C200 262 170 262 150 250 C126 254 98 244 84 226 C70 214 66 198 64 178 Z',
  // lateral fissure, central sulcus, parieto-occipital sulcus
  'M108 214 C140 196 176 186 214 190 C238 192 258 186 282 176',
  'M222 46 C214 70 228 92 218 116 C210 136 222 154 214 176',
  'M318 72 C312 96 324 112 318 130',
  // gyri: frontal
  'M92 120 C110 112 120 126 138 118 C152 112 160 96 176 92',
  'M80 156 C100 150 116 162 136 152 C150 146 164 150 176 140',
  'M120 74 C130 92 150 88 160 104 C168 116 186 112 196 126',
  'M100 190 C116 178 138 186 156 172',
  'M150 64 C160 78 178 70 190 84',
  // gyri: parietal + occipital
  'M240 60 C252 78 270 70 282 88 C292 102 310 98 316 112',
  'M236 130 C254 120 266 136 284 126 C300 118 312 132 330 124',
  'M244 158 C262 150 280 162 298 150 C316 140 332 150 350 140',
  'M336 168 C346 176 356 172 362 160',
  // gyri: temporal
  'M130 232 C160 222 188 230 218 220 C240 214 262 220 280 210',
  'M160 248 C186 240 206 246 232 238',
  // cerebellum + folia
  'M262 240 C266 272 300 290 330 282 C352 276 362 256 352 236 C346 226 336 222 330 222',
  'M276 252 C296 262 322 260 346 248',
  'M280 264 C300 272 324 270 344 260',
  'M292 276 C308 282 326 280 338 272',
  // brain stem
  'M236 250 C234 278 240 302 244 334',
  'M262 246 C264 276 262 304 260 334',
  'M236 268 C228 278 230 292 240 298',
];
// For each labelled region: [anchor x, anchor y, badge x, badge y]
const BRAIN_MARKS = [[120, 112, 58, 64], [272, 94, 300, 24], [196, 234, 150, 302], [346, 166, 394, 150], [316, 266, 374, 304], [250, 300, 204, 332]];

function brainSVG(parts) {
  const paths = BRAIN_PATHS.map((d, i) =>
    `<path class="draw${i === 0 ? ' outline' : ''}" pathLength="1" style="--d:${(i * 0.06).toFixed(2)}s" d="${d}"/>`).join('');
  const marks = parts.slice(0, BRAIN_MARKS.length).map((p, i) => {
    const [ax, ay, bx, by] = BRAIN_MARKS[i];
    return `<g class="mk" data-i="${i}"><line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}"/><circle class="dot" cx="${ax}" cy="${ay}" r="2.6"/>
      <circle class="badge" cx="${bx}" cy="${by}" r="9.5"/><text x="${bx}" y="${by + 3.6}">${i + 1}</text></g>`;
  }).join('');
  return `<svg class="brain" viewBox="0 0 420 345" role="img" aria-label="Line drawing of a human brain, lateral view, with ${parts.length} numbered regions">${paths}${marks}</svg>`;
}

// ---------- Fig. 5: neuron, generated from a fixed seed so it looks the same every time ----------
function neuronSVG() {
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const P = [], dots = [];
  const f = (n) => n.toFixed(1);
  const branch = (x, y, ang, len, depth, tip) => {
    if (depth === 0 || len < 4) { if (tip) dots.push([x, y]); return; }
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    const cx = (x + x2) / 2 + (rnd() - 0.5) * len * 0.35, cy = (y + y2) / 2 + (rnd() - 0.5) * len * 0.35;
    P.push(`M${f(x)} ${f(y)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`);
    const n = depth > 1 ? 2 : 1 + (rnd() > 0.5 ? 1 : 0);
    for (let i = 0; i < n; i++) branch(x2, y2, ang + (rnd() - 0.5) * 1.1, len * (0.6 + rnd() * 0.15), depth - 1, tip);
  };
  // dendrites fan out to the left of the cell body
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.55 + (i / 6) * 0.9) + (rnd() - 0.5) * 0.2;
    branch(80 + Math.cos(a) * 10, 110 + Math.sin(a) * 10, a, 26 + rnd() * 10, 4, false);
  }
  // axon to the right, with myelin sheaths and terminal branches
  P.push('M90 110 Q185 130 280 110');
  const sheaths = [0.22, 0.4, 0.58, 0.76].map((t) =>
    `<ellipse cx="${f(90 + 190 * t)}" cy="${f(110 + 40 * t * (1 - t))}" rx="13" ry="4.2"/>`).join('');
  for (let i = 0; i < 4; i++) branch(280, 110, -0.7 + i * 0.45, 20, 2, true);
  const paths = P.map((d, i) => `<path class="draw" pathLength="1" style="--d:${(i * 0.012).toFixed(3)}s" d="${d}"/>`).join('');
  const tips = dots.map(([x, y]) => `<circle class="tip" cx="${f(x)}" cy="${f(y)}" r="2"/>`).join('');
  return `<svg class="neuron" viewBox="0 0 340 220" role="img" aria-label="Line drawing of a neuron with branching dendrites and an axon">
    ${paths}<circle class="soma" cx="80" cy="110" r="10"/>${sheaths}${tips}</svg>`;
}

// ---------- Vertebra glyph for the skills "spine" ----------
const VERTEBRA = `<svg class="bone" viewBox="0 0 64 40" aria-hidden="true" focusable="false">
  <path d="M20 12 C20 8 44 8 44 12 L45 26 C45 31 19 31 19 26 Z"/>
  <path d="M20 15 C14 13 8 12 3 14 M44 15 C50 13 56 12 61 14"/>
  <path d="M27 30 L30 37 L34 37 L37 30"/><path d="M24 18 C30 20 34 20 40 18"/></svg>`;

// ---------- Faint drafting marks in the page margins (decorative) ----------
function deco(i) {
  const y = 70 + ((i * 53) % 140), len = 120 + ((i * 37) % 90);
  const code = `${String.fromCharCode(65 + i)}-${String(i * 7 + 3).padStart(2, '0')}`;
  return `<svg class="deco deco-l" viewBox="0 0 130 420" aria-hidden="true" focusable="false">
    <line class="guide" x1="64" y1="0" x2="64" y2="420"/>
    <g transform="translate(64 ${y})"><circle r="9"/><line x1="-16" y1="0" x2="16" y2="0"/><line x1="0" y1="-16" x2="0" y2="16"/></g>
    <text x="78" y="${y - 12}">${code}</text>
    <line x1="34" y1="${y + 50}" x2="34" y2="${y + 50 + len}"/>
    <line x1="28" y1="${y + 50}" x2="40" y2="${y + 50}"/><line x1="28" y1="${y + 50 + len}" x2="40" y2="${y + 50 + len}"/>
    <path d="M34 ${y + 50} l-3 7 M34 ${y + 50} l3 7 M34 ${y + 50 + len} l-3 -7 M34 ${y + 50 + len} l3 -7"/>
    <text x="42" y="${y + 54 + len / 2}">${len}</text>
  </svg>
  <svg class="deco deco-r" viewBox="0 0 130 420" aria-hidden="true" focusable="false">
    <circle cx="70" cy="${y + 30}" r="42"/><line x1="10" y1="${y + 64}" x2="126" y2="${y - 4}"/>
    <line x1="70" y1="${y - 30}" x2="70" y2="${y + 90}"/>
    <circle cx="70" cy="${y + 30}" r="2"/>
    <g transform="translate(40 ${y + 150})"><circle r="9"/><text y="3.5" text-anchor="middle">${i + 1}</text></g>
    <path d="M120 ${y + 150} H54 M54 ${y + 150} l7 -3 M54 ${y + 150} l7 3"/>
    <line class="guide" x1="0" y1="${y + 240}" x2="130" y2="${y + 240}"/>
  </svg>`;
}

// ---------- Shared pieces ----------
const resumeBtn = (d, cls) => (d.profile.resume ? link(d.profile.resume, d.labels.resume, `btn ${cls} resume-link`) : '');
const primaryLinks = (d, cls) => (d.profile.links || []).filter((l) => l.primary).map((l) => link(l.url, l.label, cls)).join('');

function projectLinks(d, p) {
  const gh = (d.profile.links || []).find((l) => l.label.toLowerCase() === 'github');
  return [
    p.repo && gh ? link(`${gh.url.replace(/\/$/, '')}/${p.repo}`, `${d.labels.code} ↗`) : '',
    p.link ? link(p.link, `${d.labels.link} ↗`) : '',
  ].filter(Boolean).join('');
}

// Technical figure for a project: a labelled flow or a bar comparison (drawn to scale).
function figure(f, num) {
  let body = '';
  if (f.type === 'flow') {
    body = `<ol class="flow">${(f.steps || []).map((s, i) => `
      <li><span class="k">${String.fromCharCode(65 + i)}</span><span class="lbl">${esc(s.label)}</span>${s.note ? `<span class="fn">${esc(s.note)}</span>` : ''}</li>`).join('')}</ol>`;
  } else if (f.type === 'bars') {
    const max = Math.max(...f.bars.map((b) => b.value));
    body = `<ul class="bars">${f.bars.map((b) => `
      <li><span class="lbl">${esc(b.label)}</span>
        <span class="track"><i style="width:${Math.max(0.6, (b.value / max) * 100).toFixed(2)}%"></i></span>
        <span class="val">${esc(b.value)} ${esc(f.unit || '')}</span></li>`).join('')}</ul>`;
  }
  return `<figure class="plate fig"><div class="fig-body">${body}</div>
    <figcaption><span class="fig-no">Fig. ${num}</span> ${esc(f.caption)}</figcaption></figure>`;
}

// ---------- Hero (Plate I) ----------
function renderHero(d) {
  const p = d.profile, L = d.labels, N = d.notes || {}, parts = d.anatomy || [];
  return `
  <div class="hero-grid">
    <div class="hero-text">
      <p class="kicker">${esc(L.plate)} I · ${esc(L.concept)}</p>
      <h1>${esc(p.name)}</h1>
      <ul class="roles">${(p.roles || []).map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      ${p.intro ? `<p class="intro">${esc(p.intro)}</p>` : ''}
      ${p.status ? `<p class="status">${esc(p.status)}</p>` : ''}
      <div class="cta">
        ${link('#work', L.explore, 'btn primary')}
        ${resumeBtn(d, '')}
        ${primaryLinks(d, 'btn ghost')}
      </div>
      ${note(N.hero, 'swoop', 'pink', 'hn-hero')}
    </div>
    ${parts.length ? `
    <figure class="plate hero-fig">
      <div class="dim" aria-hidden="true"><span>${esc(L.dimension)}</span></div>
      ${brainSVG(parts)}
      <figcaption><span class="fig-no">Fig. 1</span> ${esc(L.heroCaption)}</figcaption>
      <ol class="key">${parts.map((a, i) => `
        <li data-i="${i}" tabindex="0"><span class="n">${i + 1}</span><span><em>${esc(a.part)}</em><br>${esc(a.maps)}</span></li>`).join('')}</ol>
      ${note(N.heroFigure, 'hook', 'blue', 'hn-fig')}
    </figure>` : ''}
  </div>`;
}

// ---------- Section renderers ----------
const render = {
  // Featured projects become "studies" (text + technical figure); the rest go into an appendix list.
  work: (d) => {
    const L = d.labels, N = d.notes || {}, all = d.projects || [];
    const spec = (label, v) => (v && v.length ? `<dt>${esc(label)}</dt><dd>${Array.isArray(v) ? bullets(v) : esc(v)}</dd>` : '');

    const studies = all.filter((p) => p.featured).map((p, i) => `
      <article class="study${i % 2 ? ' flip' : ''}" id="p-${slug(p.name)}">
        <div class="study-text">
          <p class="kicker">${esc(L.study)} 2.${i + 1}${p.status ? ` · <span class="live">${esc(p.status)}</span>` : ''}</p>
          <h3>${esc(p.name)}</h3>
          <p class="meta">${meta(p.context, p.team, p.dates)}</p>
          ${p.summary ? `<p class="summary">${esc(p.summary)}</p>` : ''}
          <dl class="specs">
            ${spec(L.problem, p.problem)}${spec(L.contribution, p.contribution)}${spec(L.results, p.results)}
            ${p.tags?.length ? `<dt>${esc(L.stack)}</dt><dd>${stack(p.tags)}</dd>` : ''}
          </dl>
          <p class="links">${projectLinks(d, p)}</p>
        </div>
        <div class="study-fig">
          ${p.figure ? figure(p.figure, `2.${i + 1}`) : ''}
          ${i === 0 ? note(N.study, 'curl', 'sage', 'hn-study') : ''}
        </div>
      </article>`).join('');

    let scratchNoted = false;
    const rest = all.filter((p) => !p.featured).map((p, i) => {
      const n = p.scratch && !scratchNoted ? ((scratchNoted = true), note(N.scratch, 'swoop', 'pink', 'hn-scratch')) : '';
      return `
      <li id="p-${slug(p.name)}">${n}
        <span class="idx">A.${i + 1}</span>
        <div><div class="row-head"><h4>${esc(p.name)}</h4>${p.dates ? `<span class="meta">${esc(p.dates)}</span>` : ''}</div>
        ${p.description ? `<p>${esc(p.description)}</p>` : ''}
        <p class="row-foot">${(p.tags || []).map(esc).join(' · ')}${projectLinks(d, p)}</p></div>
      </li>`;
    }).join('');

    return studies + (rest ? `<h3 class="appendix-title">${esc(L.appendix)}</h3><ol class="appendix">${rest}</ol>` : '');
  },

  // Skills as seven vertebrae (C1–C7) on a spine, systems alternating left and right.
  anatomy: (d) => `<div class="spine">${(d.skills || []).map((s, i) => `
    <div class="vert ${i % 2 ? 'r' : 'l'}">
      <div class="sys">
        <p class="kicker">C${i + 1}</p>
        <h3>${esc(s.group)}</h3>
        <p class="items">${(s.items || []).map(esc).join(' · ')}</p>
        ${s.seenIn ? `<p class="seen"><span>${esc(d.labels.seenIn)}</span> ${esc(s.seenIn)}</p>` : ''}
      </div>
      ${VERTEBRA}
    </div>`).join('')}</div>`,

  // One chronological record: education, work, research, distinctions. Certificates follow.
  timeline: (d) => {
    const L = d.labels;
    const items = (d.timeline || []).map((t) => {
      const b = t.bullets || [];
      const extra = bullets(b.slice(2)) + (t.coursework?.length ? `<p class="course"><span>${esc(L.coursework)}</span> ${t.coursework.map(esc).join(' · ')}</p>` : '');
      return `
      <li class="tl-item t-${slug(t.type)}">
        <p class="tl-date">${esc(t.dates)}</p>
        <div class="tl-body">
          <p class="kicker">${esc(t.type)}</p>
          <h3>${esc(t.title)}</h3>
          <p class="meta">${meta(t.org, t.location)}</p>
          ${bullets(b.slice(0, 2))}
          ${fold(L.more, extra)}
          ${stack(t.tags)}
        </div>
      </li>`;
    }).join('');
    const certs = (d.certificates || []).map((c) =>
      `<li>${c.link ? link(c.link, c.name) : esc(c.name)} <span class="meta">${esc(c.issuer)}</span></li>`).join('');
    return `<ol class="tl">${items}</ol>${certs ? `<h3 class="appendix-title">${esc(L.certificates)}</h3><ul class="certs">${certs}</ul>` : ''}`;
  },

  research: (d) => `
    <div class="research">
      <figure class="plate neuron-fig">${neuronSVG()}
        <figcaption><span class="fig-no">Fig. 5</span> ${esc(d.labels.neuronCaption)}</figcaption></figure>
      <ol class="notes">${(d.research || []).map((r, i) => `
        <li><p class="kicker">5.${i + 1} · ${esc(r.status)}</p><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>
        ${r.link ? `<p class="links">${link(r.link, 'Read ↗')}</p>` : ''}</li>`).join('')}</ol>
    </div>`,

  about: (d) => `
    <div class="about">
      <div class="about-text">${(d.about || []).map((t) => `<p>${esc(t)}</p>`).join('')}</div>
      ${(d.facts || []).length ? `<aside class="facts"><p class="kicker">${esc(d.labels.fieldNotes)}</p>
        <dl>${d.facts.map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`).join('')}</dl></aside>` : ''}
    </div>`,

  contact: (d) => {
    const p = d.profile, L = d.labels;
    return `
      <div class="contact">
        <p class="contact-title">${esc(L.contactTitle)}</p>
        ${L.contactMessage ? `<p class="contact-msg">${esc(L.contactMessage)}</p>` : ''}
        ${p.email ? `<p class="email-row">${link('mailto:' + p.email, p.email, 'email')}
          <button type="button" class="btn small" id="copy-email">${esc(L.copy)}</button>
          <span class="status-msg" role="status" aria-live="polite"></span></p>` : ''}
        <div class="cta">${primaryLinks(d, 'btn ghost')}${resumeBtn(d, '')}</div>
      </div>`;
  },
};

// Which handwritten note sits beside which section heading.
const SECTION_NOTES = { work: ['work', 'hook', 'pink'], anatomy: ['anatomy', 'swoop', 'blue'], research: ['research', 'swoop', 'sage'], about: ['about', 'hook', 'blue'] };

// ---------- Interactions ----------

// Mobile menu: the "Index" button opens and closes the list of sections.
function setupMenu() {
  const btn = document.getElementById('menu-btn'), list = document.getElementById('nav-links');
  const set = (open) => { btn.setAttribute('aria-expanded', String(open)); list.classList.toggle('open', open); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  list.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
}

// Hovering or focusing a key entry highlights its number on the brain, and vice versa.
function setupFigureKey() {
  const fig = document.querySelector('.hero-fig');
  if (!fig) return;
  const toggle = (i, on) => fig.querySelectorAll(`[data-i="${i}"]`).forEach((el) => el.classList.toggle('on', on));
  fig.querySelectorAll('[data-i]').forEach((el) => {
    const i = el.dataset.i;
    ['mouseenter', 'focus'].forEach((ev) => el.addEventListener(ev, () => toggle(i, true)));
    ['mouseleave', 'blur'].forEach((ev) => el.addEventListener(ev, () => toggle(i, false)));
  });
}

// Copy email; if the clipboard is blocked, select the address so it can be copied by hand.
function setupCopy(d) {
  const btn = document.getElementById('copy-email');
  if (!btn) return;
  const status = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(d.profile.email)
      .then(() => { status.textContent = d.labels.copied; setTimeout(() => (status.textContent = ''), 2000); })
      .catch(() => getSelection().selectAllChildren(btn.previousElementSibling));
  });
}

// Mark the nav link of the section on screen.
function setupActiveNav() {
  const links = [...document.querySelectorAll('#nav-links a')];
  if (!('IntersectionObserver' in window) || !links.length) return;
  const obs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => (a.hash === '#' + e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.hash); if (s) obs.observe(s); });
}

// ---------- Build the page ----------
function build(d) {
  d.labels = d.labels || {};
  const p = d.profile || (d.profile = {}), L = d.labels, N = d.notes || {};

  document.title = [p.name, L.concept].filter(Boolean).join(' · ');
  document.querySelector('meta[name="description"]').content = [p.tagline, p.status].filter(Boolean).join(' ');
  document.getElementById('brand').textContent = p.name || '';
  document.getElementById('skip').textContent = L.skip || 'Skip to content';
  document.getElementById('menu-btn').textContent = L.menu || 'Index';
  document.getElementById('top').innerHTML = renderHero(d);
  document.getElementById('nav-cta').innerHTML = resumeBtn(d, 'small');

  let nav = '', html = '';
  (d.sections || []).forEach((s, i) => {
    const body = render[s.id] ? render[s.id](d) : '';
    if (!body.trim()) return; // empty sections (and their nav links) are skipped
    const sn = SECTION_NOTES[s.id];
    html += `
    <section id="${esc(s.id)}" class="sec" aria-labelledby="h-${esc(s.id)}">
      ${deco(i)}
      <div class="wrap">
        <header class="sec-head">
          <p class="sec-num">${esc(s.num || '')}</p>
          <div><h2 id="h-${esc(s.id)}">${esc(s.title)}</h2>${s.caption ? `<p class="sec-cap">${esc(s.caption)}</p>` : ''}</div>
          ${sn ? note(N[sn[0]], sn[1], sn[2], 'hn-head') : ''}
        </header>
        ${body}
      </div>
    </section>`;
    nav += `<li><a href="#${esc(s.id)}">${s.num ? `<span class="nn">${esc(s.num)}</span>` : ''}${esc(s.nav || s.title)}</a></li>`;
  });
  document.getElementById('sections').innerHTML = html;
  document.getElementById('nav-links').innerHTML = nav;

  const others = (p.links || []).filter((l) => !l.primary);
  document.getElementById('footer').innerHTML = `
    <p class="colophon">${esc(L.colophon)}</p>
    ${others.length ? `<p class="elsewhere">${others.map((l) => link(l.url, l.label)).join('')}</p>` : ''}
    <p>© ${new Date().getFullYear()} ${esc(p.name)}</p>`;

  setupMenu();
  setupFigureKey();
  setupCopy(d);
  setupActiveNav();

  // Hide résumé buttons if the file is missing
  if (p.resume) {
    fetch(p.resume, { method: 'HEAD' })
      .then((r) => { if (!r.ok) throw 0; })
      .catch(() => document.querySelectorAll('.resume-link').forEach((el) => el.remove()));
  }
}

fetch('data.json')
  .then((r) => r.json())
  .then(build)
  .catch((err) => {
    console.error(err);
    document.getElementById('top').innerHTML =
      '<p>Could not load data.json. If you opened this file directly, run a local server, e.g. <code>python3 -m http.server</code>.</p>';
  });
