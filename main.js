document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');
  const modal = document.getElementById('admin-modal');
  const adminLoginBtn = document.getElementById('admin-login');
  const closeBtn = document.querySelector('.close');
  const adminSubmit = document.getElementById('admin-submit');
  const adminPassword = document.getElementById('admin-password');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
   
  // Check if user is admin (example: check localStorage or API)
 let isAdmin = sessionStorage.getItem('isAdmin') === 'true' || localStorage.getItem('userRole') === 'admin';
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

// Bubble panel toggles
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
  b.addEventListener('click', () => {
    const panelIds = ['panel-one','panel-two','panel-three'];
    const panel = document.getElementById(panelIds[idx]);
    if (!panel) return;
    const wasOpen = panel.classList.contains('open');
    // close others
    closeAllPanels();
    const isOpen = !wasOpen;
    if (isOpen) {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      panel.setAttribute('tabindex', '-1');
      panel.focus();
      if (isAdmin) {
        panel.setAttribute('contenteditable', 'true');
        panel.classList.add('admin-mode');
      }
    } else {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.removeAttribute('tabindex');
    }
  });
});

// Close panels when clicking outside
document.addEventListener('click', (e) => {
  if (![...bubbles].some(b => b.contains(e.target)) &&
      ![...panels].some(p => p.contains(e.target))) {
    closeAllPanels();
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeZoom(); closeAllPanels(); } });
});
