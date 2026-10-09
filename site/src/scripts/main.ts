/* Progressive enhancement only. The page is complete without JS. */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

/* ---- reveal on scroll ---- */
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !hasIO) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---- profile deck: swipe, filter, and tick-in when a card is centred ---- */
const deck = document.getElementById('deck');
if (deck) {
  const all = Array.from(deck.querySelectorAll<HTMLElement>('.pcard'));
  const count = document.getElementById('deck-count');
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('.chip[data-filter]'));
  const timers = new WeakMap<HTMLElement, number[]>();
  const visible = () => all.filter((c) => !c.hidden);

  function run(card: HTMLElement) {
    if (card.classList.contains('done')) return;
    const rows = Array.from(card.querySelectorAll<HTMLElement>('.row'));
    if (reduce) { rows.forEach((r) => r.classList.add('done')); card.classList.add('done'); return; }
    const ids = rows.map((r, i) => window.setTimeout(() => r.classList.add('done'), 350 + i * 420));
    ids.push(window.setTimeout(() => card.classList.add('done'), 350 + rows.length * 420 + 150));
    timers.set(card, ids);
  }
  function setActive(card: HTMLElement) {
    all.forEach((c) => c.classList.toggle('active', c === card));
    const list = visible();
    if (count) count.textContent = `${list.indexOf(card) + 1} / ${list.length}`;
    run(card);
  }
  const pad = () => parseFloat(getComputedStyle(deck!).paddingLeft) || 0;
  function nearest(): HTMLElement {
    const edge = deck!.scrollLeft + pad();
    let best = visible()[0], d = Infinity;
    for (const c of visible()) {
      const dd = Math.abs(c.offsetLeft - edge);
      if (dd < d) { d = dd; best = c; }
    }
    return best;
  }
  function goTo(card: HTMLElement | undefined) {
    if (!card) return;
    deck!.scrollTo({ left: card.offsetLeft - pad(), behavior: reduce ? 'auto' : 'smooth' });
    setActive(card);
  }
  function step(dir: 1 | -1) {
    const list = visible();
    const i = list.indexOf(nearest());
    goTo(list[(i + dir + list.length) % list.length]);
  }
  let raf = 0;
  deck.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(nearest()));
  }, { passive: true });
  document.getElementById('deck-prev')?.addEventListener('click', () => step(-1));
  document.getElementById('deck-next')?.addEventListener('click', () => step(1));
  deck.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowRight') { ev.preventDefault(); step(1); }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); step(-1); }
  });

  // mouse drag to scroll (touch already scrolls natively)
  let dragging = false, startX = 0, startLeft = 0, moved = false;
  deck.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    dragging = true; moved = false; startX = ev.clientX; startLeft = deck!.scrollLeft;
    deck!.classList.add('drag');
  });
  window.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    const dx = ev.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    deck!.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false; deck!.classList.remove('drag');
    if (moved) goTo(nearest());
  });

  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter!;
    chips.forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
    all.forEach((c) => { c.hidden = f !== 'all' && c.dataset.type !== f; });
    deck!.scrollLeft = 0;
    goTo(visible()[0]);
  }));

  // every card ticks in once it is mostly on screen; the leftmost one is "active"
  const first = visible()[0];
  if (reduce || !hasIO) { all.forEach(run); if (first) setActive(first); }
  else {
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { run(e.target as HTMLElement); io.unobserve(e.target); }
    }, { threshold: 0.6 });
    all.forEach((c) => io.observe(c));
    const once = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setActive(nearest()); once.disconnect(); }
    }, { threshold: 0.2 });
    once.observe(deck);
  }
}

/* ---- showreel: play muted when in view, pause when out ---- */
const reel = document.getElementById('reel');
const video = document.getElementById('reel-video') as HTMLVideoElement | null;
if (reel && video) {
  const toggle = document.getElementById('reel-toggle');
  const sound = document.getElementById('reel-sound');
  const replay = document.getElementById('reel-replay');
  const bigPlay = document.getElementById('reel-play');
  const progress = document.getElementById('reel-progress');
  const time = document.getElementById('reel-time');
  let userPaused = false;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const play = () => video.play().then(() => reel.classList.add('playing')).catch(() => reel.classList.add('paused'));
  const pause = () => { video.pause(); };
  video.addEventListener('play', () => { reel.classList.add('playing'); reel.classList.remove('paused'); toggle?.setAttribute('aria-label', 'Pause'); });
  video.addEventListener('pause', () => { reel.classList.add('paused'); toggle?.setAttribute('aria-label', 'Play'); });
  video.addEventListener('timeupdate', () => {
    const d = video.duration || 10;
    if (progress) progress.style.width = `${(video.currentTime / d) * 100}%`;
    if (time) time.textContent = `${fmt(video.currentTime)} / ${fmt(d)}`;
  });
  toggle?.addEventListener('click', () => { if (video.paused) { userPaused = false; play(); } else { userPaused = true; pause(); } });
  bigPlay?.addEventListener('click', () => { userPaused = false; play(); });
  replay?.addEventListener('click', () => { video.currentTime = 0; userPaused = false; play(); });
  sound?.addEventListener('click', () => {
    video.muted = !video.muted;
    reel.classList.toggle('sound', !video.muted);
    sound.setAttribute('aria-pressed', String(!video.muted));
    sound.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
    if (video.paused) { userPaused = false; play(); }
  });
  if (hasIO && !reduce) {
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) { if (!userPaused) play(); }
        else if (!video.paused) pause();
      }
    }, { threshold: [0, 0.5] });
    io.observe(video);
  } else {
    reel.classList.add('paused');
  }
}

/* ---- verification tiers tablist ---- */
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tier[role="tab"]'));
const panels = Array.from(document.querySelectorAll<HTMLElement>('.panel[role="tabpanel"]'));
function selectTier(idx: number) {
  tabs.forEach((t, i) => {
    const on = i === idx;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
  });
  panels.forEach((p, i) => { p.hidden = i !== idx; });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTier(i));
  t.addEventListener('keydown', (ev) => {
    const dir = ev.key === 'ArrowDown' || ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowUp' || ev.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    ev.preventDefault();
    const next = (i + dir + tabs.length) % tabs.length;
    selectTier(next);
    tabs[next].focus();
  });
});
if (tabs.length) selectTier(0);

/* ---- credibility demo: findings appear when scrolled into view ---- */
const demo = document.getElementById('coherence-demo');
if (demo) {
  if (reduce || !hasIO) demo.classList.add('run');
  else {
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { demo.classList.add('run'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(demo);
  }
}

/* ---- compatibility: marriage / dating toggle ---- */
const modeBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('.mode[data-mode]'));
const reports = Array.from(document.querySelectorAll<HTMLElement>('.report[data-report]'));
modeBtns.forEach((b) => b.addEventListener('click', () => {
  modeBtns.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
  reports.forEach((r) => { r.hidden = r.dataset.report !== b.dataset.mode; });
}));

/* ---- waitlist form ---- */
const form = document.getElementById('waitlist-form') as HTMLFormElement | null;
if (form) {
  const status = form.querySelector<HTMLElement>('.status')!;
  const endpoint = form.dataset.endpoint || '';
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    status.classList.remove('err');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('err');
      form.querySelector<HTMLInputElement>('#wl-email')?.focus();
      return;
    }
    if (data.get('_gotcha')) return; // honeypot
    if (!endpoint) {
      // Demo mode: no endpoint configured in src/config/site.ts yet.
      form.classList.add('sent');
      status.textContent = 'You are on the list. We will write when invites open.';
      return;
    }
    status.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.classList.add('sent');
      status.textContent = 'You are on the list. We will write when invites open.';
    } catch {
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.classList.add('err');
    }
  });
}
