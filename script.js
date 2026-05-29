/* ────────────────────────────────────────────────────────────────
   Pranay Sharma · Portfolio
   Minimal vanilla JavaScript. Three behaviours:
     1. Pages fade in as they enter the viewport.
     2. A small "running head" updates with the current section.
     3. The constellation responds to hover / keyboard focus.
   ──────────────────────────────────────────────────────────────── */


(() => {
  'use strict';


  /* ── 1. Footer year ─────────────────────────────────────────── */

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 2. Reveal pages on scroll ──────────────────────────────── */

  const pages = document.querySelectorAll('.page');
  const indexNav   = document.getElementById('indexNav');
  const indexLinks = indexNav ? indexNav.querySelectorAll('a[data-target]') : [];
  const toggleBtn  = document.getElementById('contentsToggle');

  // Pages "rise" into view once.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  pages.forEach((p) => revealObserver.observe(p));


  /* ── 3. Section index: highlight current section + jump links ── */

  function setActive(id) {
    // Sections without a matching index link (e.g. the epigraph) are front
    // matter — leave the previous state alone so the nav stays hushed through them.
    const hasLink = Array.from(indexLinks).some((a) => a.dataset.target === id);
    if (!hasLink) return;

    indexLinks.forEach((a) => {
      a.classList.toggle('is-active', a.dataset.target === id);
    });
    // The cover keeps its quiet: the index hides while you're on it.
    document.body.classList.toggle('at-cover', id === 'frontispiece');
  }

  // Track which page occupies the middle of the viewport.
  const headObserver = new IntersectionObserver((entries) => {
    let bestEntry = null;
    let bestRatio = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
        bestRatio = entry.intersectionRatio;
        bestEntry = entry;
      }
    });
    if (bestEntry) setActive(bestEntry.target.id);
  }, {
    rootMargin: '-30% 0px -30% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });

  pages.forEach((p) => headObserver.observe(p));

  // Mobile: the "contents" button opens / closes the panel.
  function closeIndex() {
    document.body.classList.remove('index-open');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = document.body.classList.toggle('index-open');
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Choosing a section, or tapping away, closes the panel.
  indexLinks.forEach((a) => a.addEventListener('click', closeIndex));
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('index-open') &&
        !e.target.closest('#indexNav') &&
        !e.target.closest('#contentsToggle')) {
      closeIndex();
    }
  });


  /* ── 4. Constellation · hover, focus, touch ─────────────────── */

  const stars       = document.querySelectorAll('.constellation .star');
  const lines       = document.querySelectorAll('.constellation .lines line');
  const starNote    = document.getElementById('starNote');
  const noteTitleEl = starNote?.querySelector('.star-note-title');
  const noteBodyEl  = starNote?.querySelector('.star-note-body');

  // Reasons-to-care for each interest. Kept short and personal.
  const notes = {
    cs: {
      title: 'Computer Science',
      body: 'The discipline I build with. Logic, structure, the patience to make ideas executable.'
    },
    philosophy: {
      title: 'Philosophy',
      body: 'Where I learn to question my own premises before someone else does. The first programming language.'
    },
    mathematics: {
      title: 'Mathematics',
      body: 'The grammar everything else borrows from. I keep returning to proofs the way some return to music.'
    },
    astronomy: {
      title: 'Astronomy',
      body: 'A reminder of scale. Useful when the bug feels existential.'
    },
    physics: {
      title: 'Physics',
      body: 'Models of how reality behaves when nobody is looking. Quietly underpins everything I touch.'
    },
    history: {
      title: 'History',
      body: 'Pattern recognition on the largest dataset we have. Every technology has a precedent.'
    },
    law: {
      title: 'Law',
      body: 'Rules systems written for humans. Surprisingly close to writing software, only the compiler is a judge.'
    }
  };

  function highlightStar(id) {
    stars.forEach((s) => s.classList.toggle('is-active', s.dataset.id === id));
    lines.forEach((line) => {
      const linked = (line.dataset.link || '').split(' ');
      line.classList.toggle('is-active', linked.includes(id));
    });

    const n = notes[id];
    if (n) {
      noteTitleEl.textContent = n.title;
      noteBodyEl.textContent  = n.body;
    }
  }

  function clearStars() {
    stars.forEach((s) => s.classList.remove('is-active'));
    lines.forEach((line) => line.classList.remove('is-active'));
    if (noteTitleEl) noteTitleEl.textContent = 'hover or tap a star';
    if (noteBodyEl)  noteBodyEl.textContent  = "Each one is a field I keep returning to. They're not on my résumé, but they shape every project on it.";
  }

  stars.forEach((star) => {
    const id = star.dataset.id;
    star.addEventListener('mouseenter', () => highlightStar(id));
    star.addEventListener('focus',      () => highlightStar(id));
    star.addEventListener('mouseleave', clearStars);
    star.addEventListener('blur',       clearStars);

    // Touch: tap once to activate, anywhere else to clear.
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      if (star.classList.contains('is-active')) {
        clearStars();
      } else {
        highlightStar(id);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.constellation')) clearStars();
  });

})();
