// script.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* Year in footer */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* NAV: toggle + outside click + close on link + Esc */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    // Toggle
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const isInMenu = navMenu.contains(e.target);
      const isOnToggle = navToggle.contains(e.target);
      if (!isInMenu && !isOnToggle) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click (for smooth nav)
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* SLIDESHOWS (any .slideshow on the page) */
  document.querySelectorAll('.slideshow').forEach(initSlideshow);
});

function initSlideshow(root) {
  const slides = Array.from(root.querySelectorAll('.slides img'));
  const prevBtn = root.querySelector('.slide-btn.prev');
  const nextBtn = root.querySelector('.slide-btn.next');
  const dotsWrap = root.querySelector('.dots');

  if (!slides.length || !dotsWrap) return;

  // Ensure one active slide
  let index = slides.findIndex((s) => s.classList.contains('active'));
  if (index < 0) { index = 0; slides[0].classList.add('active'); }

  // Build dots fresh each init (prevents duplicates)
  dotsWrap.innerHTML = '';
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function updateUI() {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    updateUI();
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(index + 1));

  // Autoplay with pause on hover/touch
  let timer = setInterval(() => goTo(index + 1), 5000);
  const pause = () => { if (timer) { clearInterval(timer); timer = null; } };
  const resume = () => { if (!timer) { timer = setInterval(() => goTo(index + 1), 5000); } };

  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', resume);
  root.addEventListener('touchstart', pause, { passive: true });
  root.addEventListener('touchend', resume);

  // Keyboard focusable controls
  prevBtn && prevBtn.setAttribute('tabindex', '0');
  nextBtn && nextBtn.setAttribute('tabindex', '0');

  updateUI();
}
