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
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon   = document.getElementById('mobileThemeIcon');

  const savedTheme = localStorage.getItem('cb-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    const cls = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    if (themeIcon) themeIcon.className = cls;
    if (mobileThemeIcon) mobileThemeIcon.className = cls;
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('cb-theme', next);
    updateThemeIcon(next);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
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
    const normalizedHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
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

  /* ---- Sabong Chicken Walking ---- */
  const chickenWalker = document.getElementById('chickenWalker');
  const chickenTrack  = document.getElementById('chickenTrack');
  const kickLeg       = document.getElementById('chickenKickLeg');
  const normalLegs    = document.getElementById('chickenLegs');
  const codeScatter   = document.getElementById('codeScatter');
  const legLeft       = document.getElementById('legLeft');
  const legRight      = document.getElementById('legRight');
  const heroSubtitle  = document.getElementById('heroSubtitle');

  const originalSubtitle = heroSubtitle ? heroSubtitle.innerHTML : '';

  const glitchLines = [
    'arayyy mo pakak \uD83D\uDC14',
    'edi tepaklong',
    'happy new year!!!',
    'edi wow',
    'huh ?',
    'hakdog \uD83C\uDF2D',
    'sige na nga',
    'ay sus naman',
    'charot lang po',
    'grabe ka talaga',
    'lodi reversi',
    'nako pre',
    'luh? nasaan na yung code?',
    'ate bakit ganun?',
    'sana all may manok',
    'ampotah ng bug na to',
    'patay na si syntax error',
    'char! buhay pa sya',
    'tangina naman oh',
    'ano na naman to pre',
  ];

  let isGlitching = false;

  function glitchSubtitle() {
    if (!heroSubtitle || isGlitching) return;
    isGlitching = true;

    // Shuffle so lines are always random
    const shuffled = [...glitchLines].sort(() => Math.random() - 0.5);
    let html = '';
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const line = shuffled[i % shuffled.length];
      html += `<span class="glitch-line" style="animation-delay:${(Math.random()*0.3).toFixed(2)}s">${line}</span><br>`;
    }
    heroSubtitle.innerHTML = html;
    heroSubtitle.classList.add('glitching');

    // Restore after 8 seconds
    setTimeout(() => {
      heroSubtitle.classList.remove('glitching');
      heroSubtitle.classList.add('restoring');
      heroSubtitle.innerHTML = originalSubtitle;
      setTimeout(() => {
        heroSubtitle.classList.remove('restoring');
        isGlitching = false;
      }, 600);
    }, 8000);
  }

  const codeSnippets = [
    'NullPointerException', 'git push --force', 'undefined is not a function',
    'Stack Overflow', '404 Not Found', 'rm -rf /', 'sudo rm -rf *',
    'segfault', 'BSOD', 'git merge conflict', '500 Internal Error',
    'Cannot read property', 'ERR_CONNECTION', 'heap out of memory',
    'SyntaxError', 'while(true){}', 'DROP TABLE users;', 'arayyy mo pakak'
  ];

  if (chickenWalker && chickenTrack) {
    let posX       = 0;
    let direction  = 1;       // 1 = right, -1 = left
    let isKicking  = false;
    let legPhase   = 0;
    let trackWidth = chickenTrack.offsetWidth;
    const CHICKEN_W = () => chickenWalker.offsetWidth || 72;
    const SPEED     = 1.2;    // px per frame

    window.addEventListener('resize', () => {
      trackWidth = chickenTrack.offsetWidth;
    });

    /* -- Leg bob -- */
    function bobLegs() {
      if (isKicking || !legLeft || !legRight) return;
      legPhase += 0.18;
      const angleL =  Math.sin(legPhase) * 18;
      const angleR = -Math.sin(legPhase) * 18;
      legLeft.style.transform  = `rotate(${angleL}deg)`;
      legRight.style.transform = `rotate(${angleR}deg)`;
    }

    /* -- Kick animation -- */
    function doKick() {
      if (isKicking) return;
      isKicking = true;

      if (chickenWalker) chickenWalker.classList.add('kicking');
      if (normalLegs)    normalLegs.setAttribute('opacity', '0');
      if (kickLeg)       kickLeg.setAttribute('opacity', '1');

      // Glitch the subtitle!
      glitchSubtitle();

      // Scatter code pieces from current chicken position
      if (codeScatter) {
        codeScatter.innerHTML = '';
        const rect  = chickenWalker.getBoundingClientRect();
        const count = 6 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          const piece = document.createElement('span');
          piece.className = 'code-piece';
          piece.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          const baseAngle = direction === 1 ? 200 : -20;
          const angle = baseAngle + (Math.random() - 0.5) * 130;
          const dist  = 80 + Math.random() * 130;
          const rad   = angle * Math.PI / 180;
          const ex    = Math.cos(rad) * dist;
          const ey    = Math.sin(rad) * dist - 40;
          const rot   = (Math.random() - 0.5) * 70 + 'deg';
          piece.style.setProperty('--scatter-end', `translate(${ex}px, ${ey}px)`);
          piece.style.setProperty('--scatter-rot', rot);
          piece.style.left = (rect.left + rect.width / 2) + 'px';
          piece.style.top  = (rect.top  + rect.height / 2) + 'px';
          piece.style.animationDelay = (Math.random() * 0.15) + 's';
          codeScatter.appendChild(piece);
        }
      }

      // Reset kick pose after 700ms
      setTimeout(() => {
        if (normalLegs) normalLegs.setAttribute('opacity', '1');
        if (kickLeg)    kickLeg.setAttribute('opacity', '0');
        if (chickenWalker) chickenWalker.classList.remove('kicking');
        if (legLeft)  legLeft.style.transform  = '';
        if (legRight) legRight.style.transform = '';
        legPhase  = 0;
        isKicking = false;
        if (codeScatter) setTimeout(() => { codeScatter.innerHTML = ''; }, 1000);
      }, 700);
    }

    /* -- Main walk loop -- */
    function walkLoop() {
      if (!isKicking) {
        posX += SPEED * direction;

        // Reached right edge — kick then turn left
        if (posX >= trackWidth - CHICKEN_W()) {
          posX = trackWidth - CHICKEN_W();
          doKick();
          setTimeout(() => {
            direction = -1;
            chickenWalker.classList.remove('flipped');
          }, 700);
        }

        // Reached left edge — kick then turn right
        if (posX <= 0) {
          posX = 0;
          doKick();
          setTimeout(() => {
            direction = 1;
            chickenWalker.classList.add('flipped');
          }, 700);
        }

        chickenWalker.style.transform = `translateX(${posX}px)`;
        bobLegs();
      }

      requestAnimationFrame(walkLoop);
    }

    // Start facing right
    chickenWalker.classList.add('flipped');
    direction = 1;

    // Click to kick manually
    chickenWalker.addEventListener('click', doKick);

    requestAnimationFrame(walkLoop);
  }

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
