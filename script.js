// --- NAV ---
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// --- THEME TOGGLE ---
const modeToggle = document.getElementById('modeToggle');
const docEl = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if (storedTheme) docEl.setAttribute('data-theme', storedTheme);
function updateIcon() {
  modeToggle.textContent = (docEl.getAttribute('data-theme') === 'dark') ? '☀︎' : '☾';
}
if (modeToggle) {
  updateIcon();
  modeToggle.addEventListener('click', () => {
    const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
  });
}

// --- FOOTER YEAR ---
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// --- SLIDESHOW (for weddings page) ---
const slides = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');
const dotsContainer = document.querySelector('.dots');

if (slides.length > 0) {
  let current = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
      dotsContainer.children[idx]?.classList.toggle('active', idx === i);
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => { current = i; showSlide(current); });
    dotsContainer.appendChild(dot);
  });
  showSlide(current);

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto-play
  setInterval(nextSlide, 5000);
}
