document.addEventListener('DOMContentLoaded', function () {
  // ===== HAMBURGER MENU =====
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation(); // Förhindra bubbla upp till document
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Klick utanför menyn stänger den
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== ADMIN MODAL =====
  const modal = document.getElementById('admin-modal');
  const closeBtn = document.querySelector('.close');
  const adminSubmit = document.getElementById('admin-submit');
  const adminPassword = document.getElementById('admin-password');

  let isAdmin = sessionStorage.getItem('isAdmin') === 'true' ||
                localStorage.getItem('userRole') === 'admin';

  closeBtn?.addEventListener('click', () => modal.style.display = 'none');

  adminSubmit?.addEventListener('click', () => {
    const correctPassword = 'dittlösen'; // byt ut eller gör server-side
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
      e.stopPropagation(); // så att document click inte stänger direkt
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

  // Klick utanför paneler stänger dem
  document.addEventListener('click', (e) => {
    if (![...bubbles].some(b => b.contains(e.target)) &&
        ![...panels].some(p => p.contains(e.target))) {
      closeAllPanels();
    }
  });

  // Escape stänger alla paneler och eventuell zoom (om du har den funktionen)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof closeZoom === 'function') closeZoom();
      closeAllPanels();
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('primary-menu');

    if (toggle && menu) {
        // Klick på hamburgaren öppnar/stänger menyn
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.toggle('open');
        });

        // Klick utanför menyn stänger den
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('open');
            }
        });
    }
});