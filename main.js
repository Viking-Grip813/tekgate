// central script file for all pages

document.addEventListener('DOMContentLoaded', () => {
  // ===== HAMBURGER MENU =====
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click handler
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== COUNTDOWN =====
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
    console.log('countdown element found, starting timer');
    const targetDate = new Date(2026, 2, 20, 19, 0, 0).getTime();
    function updateCountdown() {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance <= 0) {
        countdownElement.textContent = '00:00:00:00';
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownElement.textContent = `${String(days).padStart(2,'0')}:${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  } else {
    console.log('no countdown element found on this page');
  }

  // ===== COOKIE BANNER =====
  function showCookieBanner() {
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookieBanner').classList.add('show');
    }
  }

  window.acceptCookies = function () {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('essentialCookies', 'true');
    localStorage.setItem('analyticsCookies', 'true');
    localStorage.setItem('marketingCookies', 'true');
    document.getElementById('cookieBanner').classList.remove('show');
  };

  window.rejectCookies = function () {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('essentialCookies', 'true');
    localStorage.setItem('analyticsCookies', 'false');
    localStorage.setItem('marketingCookies', 'false');
    document.getElementById('cookieBanner').classList.remove('show');
  };

  window.openCookieSettings = function () {
    document.getElementById('analyticsCookies').checked = localStorage.getItem('analyticsCookies') !== 'false';
    document.getElementById('marketingCookies').checked = localStorage.getItem('marketingCookies') !== 'false';
    document.getElementById('cookieModal').classList.add('show');
  };

  window.closeCookieSettings = function () {
    document.getElementById('cookieModal').classList.remove('show');
  };

  window.saveCookieSettings = function () {
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('essentialCookies', 'true');
    localStorage.setItem('analyticsCookies', document.getElementById('analyticsCookies').checked);
    localStorage.setItem('marketingCookies', document.getElementById('marketingCookies').checked);
    document.getElementById('cookieModal').classList.remove('show');
    document.getElementById('cookieBanner').classList.remove('show');
  };

  showCookieBanner();

  // ===== ADMIN MODAL =====
  const modal = document.getElementById('admin-modal');
  const closeBtn = document.querySelector('.close');
  const adminSubmit = document.getElementById('admin-submit');
  const adminPassword = document.getElementById('admin-password');

  let isAdmin = sessionStorage.getItem('isAdmin') === 'true' ||
                localStorage.getItem('userRole') === 'admin';

  closeBtn?.addEventListener('click', () => modal.style.display = 'none');

  adminSubmit?.addEventListener('click', () => {
    const correctPassword = 'dittlösen';
    if (adminPassword.value === correctPassword) {
      isAdmin = true;
      sessionStorage.setItem('isAdmin', 'true');
      modal.style.display = 'none';
      adminPassword.value = '';
      alert('Admin mode activated');
    } else {
      alert('Wrong password');
      adminPassword.value = '';
    }
  });

  // ===== BUBBLES PANEL =====
  const bubbles = document.querySelectorAll('.bubble');
  const panels = document.querySelectorAll('.bubble-panel');

  function closeAllPanels() {
    panels.forEach(p => {
      p.classList.remove('open');
      p.setAttribute('aria-hidden', 'true');
      p.removeAttribute('contenteditable');
      p.classList.remove('admin-mode');
    });
  }

  bubbles.forEach((b, idx) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const panelIds = ['panel-one', 'panel-two', 'panel-three'];
      const panel = document.getElementById(panelIds[idx]);
      if (!panel) return;

      const wasOpen = panel.classList.contains('open');
      closeAllPanels();

      if (!wasOpen) {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        panel.setAttribute('tabindex', '-1');
        panel.focus();
        if (isAdmin) {
          panel.setAttribute('contenteditable', 'true');
          panel.classList.add('admin-mode');
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (![...bubbles].some(b => b.contains(e.target)) &&
        ![...panels].some(p => p.contains(e.target))) {
      closeAllPanels();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof closeZoom === 'function') closeZoom();
      closeAllPanels();
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});