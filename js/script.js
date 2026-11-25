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

// ---------- Vertebra glyph for the skills "spine" ----------
const VERTEBRA = `<svg class="bone" viewBox="0 0 64 40" aria-hidden="true" focusable="false">
  <path d="M20 12 C20 8 44 8 44 12 L45 26 C45 31 19 31 19 26 Z"/>
  <path d="M20 15 C14 13 8 12 3 14 M44 15 C50 13 56 12 61 14"/>
  <path d="M27 30 L30 37 L34 37 L37 30"/><path d="M24 18 C30 20 34 20 40 18"/></svg>`;

// ---------- Page backdrop (layers 3 + 4): construction geometry and faint engravings ----------
// Drawn at the window's real size so phones get the same composition as desktops, just smaller.

const HEART = `
  <path d="M60 40 C30 40 15 70 22 105 C30 145 70 175 95 192 C110 172 150 142 155 102 C160 66 135 46 110 50 C100 40 80 36 60 40 Z"/>
  <path d="M78 42 C76 20 90 5 110 8 C128 11 134 26 130 42"/>
  <path d="M95 9 L93 -10 M108 7 L108 -12 M120 11 L127 -7"/>
  <path d="M98 48 C104 30 120 26 140 30 C150 32 156 40 152 50"/>
  <path d="M70 70 C90 95 100 120 98 172"/><path d="M122 60 C126 90 120 122 106 162"/>
  <path class="hatch" d="M34 80 L46 92 M30 96 L44 110 M32 112 L48 126 M40 128 L56 142 M50 142 L64 154 M140 74 L150 84 M138 92 L148 102 M132 110 L142 120"/>`;
const FEMUR = `
  <path d="M0 0 C8 -7 20 -3 17 8 L84 72 C96 67 106 78 97 88 C104 98 92 108 84 97 L15 31 C4 37 -7 27 2 19 C-8 11 -6 2 0 0 Z"/>
  <path class="hatch" d="M24 22 L30 18 M34 32 L40 28 M44 42 L50 38 M54 52 L60 48 M64 62 L70 58"/>`;

// A partial spine with ribs curving to the right, like an atlas plate cut by the page edge.
function ribcage() {
  let d = '', hatch = '';
  for (let i = 0; i < 11; i++) {
    const y = 20 + i * 30;
    d += `M30 ${y} h20 v18 h-20 Z `;                                       // vertebra
    d += `M50 ${y + 8} C100 ${y - 14} 165 ${y - 2} ${178 - i * 2} ${y + 34 + i * 2} `;   // rib
    d += `M50 ${y + 14} C96 ${y - 4} 156 ${y + 6} ${168 - i * 2} ${y + 40 + i * 2} `;   // its inner edge
    hatch += `M${110 - i} ${y + 4} l6 -5 M${130 - i} ${y + 9} l6 -5 `;
  }
  return `<path d="${d}"/><path class="hatch" d="${hatch}"/>`;
}

function backdropSVG() {
  const w = innerWidth, h = innerHeight, s = Math.min(1, Math.max(0.5, w / 1300));
  const geo = [], f = (n) => n.toFixed(0);
  const circles = (cx, cy, rs) => rs.map((r) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * s)}"/>`).join('');
  const cross = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="5"/><path d="M${f(x - 16)} ${f(y)} H${f(x + 16)} M${f(x)} ${f(y - 16)} V${f(y + 16)}"/>`;

  const A = [w * 0.8, h * 0.32];
  geo.push(circles(...A, [180, 280]), cross(...A));
  // ruler ticks along the top and left edges (major tick every 5 grid cells)
  let t = '';
  for (let x = 0; x <= w; x += 26) t += `M${x} 0 V${x % 130 === 0 ? 12 : 6} `;
  for (let y = 0; y <= h; y += 26) t += `M0 ${y} H${y % 130 === 0 ? 12 : 6} `;
  geo.push(`<path d="${t}"/>`);

  // faint sepia engravings hugging the edges (never centred behind content)
  const ink = [
    `<g transform="translate(${f(w - 150 * s)} ${f(h - 230 * s)}) scale(${(0.9 * s).toFixed(3)})">${HEART}</g>`,
    `<g transform="translate(${f(-34 * s)} ${f(h * 0.16)}) scale(${(0.95 * s).toFixed(3)})">${ribcage()}</g>`,
    `<g transform="translate(${f(26 * s)} ${f(h - 120 * s)}) scale(${(0.8 * s).toFixed(3)}) rotate(-24)">${FEMUR}</g>`,
  ];
  return `<svg class="backdrop" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
    <g class="geo">${geo.join('')}</g><g class="ink">${ink.join('')}</g></svg>`;
}

function setupBackdrop() {
  const draw = () => {
    const old = document.querySelector('.backdrop');
    const html = backdropSVG();
    if (old) old.outerHTML = html; else document.body.insertAdjacentHTML('afterbegin', html);
  };
  draw();
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(draw, 150); });
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

// Atlas-style contents: each plate with a count, e.g. "4 studies · 7 more". "{key}" counts come from data.json lists.
function contents(d) {
  const all = d.projects || [];
  const n = { skills: (d.skills || []).length, featured: all.filter((p) => p.featured).length, more: all.filter((p) => !p.featured).length,
    experience: (d.experience || []).length, education: (d.education || []).length, research: (d.research || []).length };
  const rows = (d.sections || []).map((s) => `
    <li><a href="#${esc(s.id)}"><span class="nn">${esc(s.num || '')}</span><span class="t">${esc(s.title)}</span>
      <span class="dots" aria-hidden="true"></span><span class="c">${esc((s.count || '').replace(/\{(\w+)\}/g, (m, k) => n[k] ?? ''))}</span></a></li>`).join('');
  return rows ? `<nav class="contents" aria-label="${esc(d.labels.contents)}">
    <p class="spec-head"><span>${esc(d.labels.contents)}</span><span>${esc(d.labels.plate)} I</span></p><ol>${rows}</ol></nav>` : '';
}

// ---------- Hero (Plate I) ----------
function renderHero(d) {
  const p = d.profile, L = d.labels, N = d.notes || {};
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
    ${contents(d)}
  </div>`;
}

// Plate number of a section as a figure prefix: Plate I is the hero, so the first section is 2.
const plateNo = (d, id) => (d.sections || []).findIndex((s) => s.id === id) + 2;

// A dated record (job or degree): first two bullets shown, the rest and any coursework under "More".
function record(d, list = []) {
  const L = d.labels;
  const items = list.map((t) => {
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
  return items ? `<ol class="tl">${items}</ol>` : '';
}

// ---------- Section renderers ----------
const render = {
  // Featured projects become "studies" (text + technical figure); the rest go into an appendix list.
  work: (d) => {
    const L = d.labels, N = d.notes || {}, all = d.projects || [], P = plateNo(d, 'work');
    const spec = (label, v) => (v && v.length ? `<dt>${esc(label)}</dt><dd>${Array.isArray(v) ? bullets(v) : esc(v)}</dd>` : '');

    const studies = all.filter((p) => p.featured).map((p, i) => `
      <article class="study" id="p-${slug(p.name)}">
        <p class="kicker">${esc(L.study)} ${P}.${i + 1}${p.status ? ` · <span class="live">${esc(p.status)}</span>` : ''}</p>
        <h3>${esc(p.name)}</h3>
        <p class="meta">${meta(p.context, p.team, p.dates)}</p>
        ${p.summary ? `<p class="summary">${esc(p.summary)}</p>` : ''}
        <dl class="specs">${spec(L.results, p.results)}</dl>
        <details><summary>${esc(L.details)}${i === 0 ? note(N.study, 'swoop', 'sage', 'hn-inline') : ''}</summary>
          <dl class="specs">${spec(L.problem, p.problem)}${spec(L.contribution, p.contribution)}</dl>
          ${p.figure ? figure(p.figure, `${P}.${i + 1}`) : ''}
        </details>
        <div class="study-foot">${stack(p.tags)}<p class="links">${projectLinks(d, p)}</p></div>
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

    return (studies ? `<div class="studies">${studies}</div>` : '') + (rest ? `<h3 class="appendix-title">${esc(L.appendix)}</h3><ol class="appendix">${rest}</ol>` : '');
  },

  // Skills as seven compact rows (C1–C7), each with a small vertebra on one spine line.
  anatomy: (d) => `<ol class="spine">${(d.skills || []).map((s, i) => `
    <li class="vert">
      ${VERTEBRA}
      <p class="sys-name"><span class="kicker">C${i + 1}</span> ${esc(s.group)}</p>
      <p class="items">${(s.items || []).map(esc).join(' · ')}</p>
    </li>`).join('')}</ol>`,

  // Work history and education share one record layout; certificates follow education.
  experience: (d) => record(d, d.experience),
  education: (d) => {
    const certs = (d.certificates || []).map((c) =>
      `<li>${c.link ? link(c.link, c.name) : esc(c.name)} <span class="meta">${esc(c.issuer)}</span></li>`).join('');
    return record(d, d.education) + (certs ? `<h3 class="appendix-title">${esc(d.labels.certificates)}</h3><ul class="certs">${certs}</ul>` : '');
  },

  research: (d) => `
    <div class="research">
      <ol class="notes">${(d.research || []).map((r, i) => `
        <li><p class="kicker">${plateNo(d, 'research')}.${i + 1} · ${esc(r.status)}</p><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>
        ${r.link ? `<p class="links">${link(r.link, 'Read ↗')}</p>` : ''}</li>`).join('')}</ol>
    </div>`,

  about: (d) => `
    <div class="about">
      <div class="about-text">${(d.about || []).map((t) => `<p>${esc(t)}</p>`).join('')}</div>
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

  setupBackdrop();
  setupMenu();
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
