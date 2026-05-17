// ============================================================
//  CB PORTFOLIO — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero Typewriter ---- */
  const heroTypeEl = document.getElementById('heroTypewriter');
  if (heroTypeEl) {
    const fullText = 'JANMAR ALBIS';

    function typeLoop() {
      let i = 0;
      heroTypeEl.textContent = '';

      function typeForward() {
        if (i < fullText.length) {
          heroTypeEl.textContent += fullText.charAt(i);
          i++;
          setTimeout(typeForward, 100);
        } else {
          setTimeout(eraseBack, 4000);
        }
      }

      function eraseBack() {
        if (heroTypeEl.textContent.length > 0) {
          heroTypeEl.textContent = heroTypeEl.textContent.slice(0, -1);
          setTimeout(eraseBack, 50);
        } else {
          setTimeout(typeLoop, 500);
        }
      }

      typeForward();
    }

    setTimeout(typeLoop, 600);
  }

  /* ---- Theme Toggle ---- */
  const html               = document.documentElement;
  const themeToggle        = document.getElementById('themeToggle');
  const themeIcon          = document.getElementById('themeIcon');
  const mobileThemeToggle  = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon    = document.getElementById('mobileThemeIcon');

  const savedTheme = localStorage.getItem('cb-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    const cls = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    if (themeIcon)       themeIcon.className = cls;
    if (mobileThemeIcon) mobileThemeIcon.className = cls;
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('cb-theme', next);
    updateThemeIcon(next);
  }

  if (themeToggle)       themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  /* ---- Navbar Scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  /* ---- Mobile Menu ---- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu    = document.getElementById('mobileMenu');
  const closeMenu     = document.getElementById('closeMenu');
  const menuOverlay   = document.getElementById('menuOverlay');

  function openMenu() {
    mobileMenu?.classList.add('open');
    menuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenuFn() {
    mobileMenu?.classList.remove('open');
    menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMenu);
  closeMenu?.addEventListener('click', closeMenuFn);
  menuOverlay?.addEventListener('click', closeMenuFn);

  /* ---- Active Nav Link ---- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalizedCurrent = currentPath.replace(/\/+$/, '');
    const normalizedHref    = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
    if (
      normalizedCurrent.endsWith('/' + normalizedHref) ||
      (normalizedHref === 'index.html' && (normalizedCurrent === '' || normalizedCurrent.endsWith('/'))) ||
      normalizedCurrent.endsWith(normalizedHref)
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- Scroll Fade In ---- */
  const fadeEls = document.querySelectorAll(
    '.project-card, .article-card, .skill-tag, .section-header'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });

});
