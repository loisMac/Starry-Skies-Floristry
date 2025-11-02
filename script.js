// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Nav toggle logic
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('navMenu');
  
    if (navToggle && navMenu) {
      // Toggle open/close
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent immediate closing
        const open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = navToggle.contains(e.target);
        if (!isClickInsideMenu && !isClickOnToggle) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
  
      // Optional: close on link click (for smoother navigation)
      navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
  