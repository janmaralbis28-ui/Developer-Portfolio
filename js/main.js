// ============================================================
//  CB PORTFOLIO — main.js
// ============================================================

// Always scroll to top on page load/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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
  const html                = document.documentElement;
  const themeToggle         = document.getElementById('themeToggle');
  const themeIcon           = document.getElementById('themeIcon');
  const mobileThemeToggle   = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon     = document.getElementById('mobileThemeIcon');
  const mobileNavToggle     = document.getElementById('themeToggleMobileNav');
  const mobileNavIcon       = document.getElementById('themeIconMobileNav');

  const savedTheme = localStorage.getItem('cb-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    const cls = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    if (themeIcon)      themeIcon.className = cls;
    if (mobileThemeIcon) mobileThemeIcon.className = cls;
    if (mobileNavIcon)  mobileNavIcon.className = cls;
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
  if (mobileNavToggle)   mobileNavToggle.addEventListener('click', toggleTheme);

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

  /* ---- Contact Form ---- */
  const SERVICE_ID  = 'service_f9pxjun';
  const TEMPLATE_ID = 'template_ifka6pi';
  const PUBLIC_KEY  = 'ZV9IifKMEpsZRelNP';
  emailjs.init({ publicKey: PUBLIC_KEY });

  const contactModal = document.getElementById('contactModal');
  if (contactModal) {
    contactModal.addEventListener('hidden.bs.modal', () => {
      ['contactName','contactEmail','contactSubject','contactMessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.classList.remove('is-invalid'); }
      });
      ['errName','errEmail','errSubject','errMessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
      });
      document.getElementById('contactAlert')?.classList.add('d-none');
      document.getElementById('contactFormWrap')?.classList.remove('d-none');
      document.getElementById('contactSuccess')?.classList.add('d-none');
      const btn = document.getElementById('contactSubmitBtn');
      if (btn) btn.disabled = false;
      document.getElementById('contactBtnText')?.classList.remove('d-none');
      document.getElementById('contactBtnLoading')?.classList.add('d-none');
    });
  }

  document.getElementById('contactSubmitBtn')?.addEventListener('click', async () => {
    const nameEl    = document.getElementById('contactName');
    const emailEl   = document.getElementById('contactEmail');
    const subjectEl = document.getElementById('contactSubject');
    const messageEl = document.getElementById('contactMessage');
    const alertEl   = document.getElementById('contactAlert');

    [nameEl, emailEl, subjectEl, messageEl].forEach(el => el.classList.remove('is-invalid'));
    ['errName','errEmail','errSubject','errMessage'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
    alertEl.className = 'contact-alert d-none';

    let valid = true;
    if (!nameEl.value.trim()) {
      nameEl.classList.add('is-invalid');
      document.getElementById('errName').textContent = 'Name is required.';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim() || !emailRegex.test(emailEl.value.trim())) {
      emailEl.classList.add('is-invalid');
      document.getElementById('errEmail').textContent = 'Enter a valid email address.';
      valid = false;
    }
    if (!subjectEl.value.trim()) {
      subjectEl.classList.add('is-invalid');
      document.getElementById('errSubject').textContent = 'Subject is required.';
      valid = false;
    }
    if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
      messageEl.classList.add('is-invalid');
      document.getElementById('errMessage').textContent = 'Message must be at least 10 characters.';
      valid = false;
    }
    if (!valid) return;

    const btn = document.getElementById('contactSubmitBtn');
    btn.disabled = true;
    document.getElementById('contactBtnText').classList.add('d-none');
    document.getElementById('contactBtnLoading').classList.remove('d-none');

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  nameEl.value.trim(),
        from_email: emailEl.value.trim(),
        subject:    subjectEl.value.trim(),
        message:    messageEl.value.trim(),
        to_name:    'Janmar',
      });
      document.getElementById('contactFormWrap').classList.add('d-none');
      document.getElementById('contactSuccess').classList.remove('d-none');
    } catch (err) {
      console.error('EmailJS error:', err);
      alertEl.className = 'contact-alert alert-danger';
      alertEl.textContent = 'Something went wrong. Please try again or email me directly.';
      alertEl.classList.remove('d-none');
      btn.disabled = false;
      document.getElementById('contactBtnText').classList.remove('d-none');
      document.getElementById('contactBtnLoading').classList.add('d-none');
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
