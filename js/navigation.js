/**
 * Floating Glass Capsule Navigation & Modal Subsystem
 * Handles floating capsule scroll transform, mobile glass menu toggle, scroll-spy active state, & Inline Resume Viewer modal
 */

function initNavToggle() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  const capsuleWrapper = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.capsule-nav-link, .mobile-nav-link');

  if (capsuleWrapper) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        capsuleWrapper.classList.add('scrolled');
      } else {
        capsuleWrapper.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (!hamburgerBtn || !mobilePanel) return;

  function toggleMenu() {
    const isOpen = mobilePanel.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    mobilePanel.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    const toggleText = hamburgerBtn.querySelector('.toggle-text');
    if (toggleText) toggleText.textContent = 'CLOSE';
  }

  function closeMenu() {
    mobilePanel.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    const toggleText = hamburgerBtn.querySelector('.toggle-text');
    if (toggleText) toggleText.textContent = 'MENU';
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobilePanel.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobilePanel.classList.contains('open')) {
      closeMenu();
    }
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.capsule-nav-link[data-section], .mobile-nav-link[data-section]');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        updateActiveLink(activeId);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveLink(activeId) {
    navLinks.forEach(link => {
      const sectionTarget = link.getAttribute('data-section');
      if (sectionTarget === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Inline Resume Viewer Modal Logic
   -------------------------------------------------------------------------- */
function initResumeViewer() {
  const openBtns = document.querySelectorAll('.btn-view-resume-trigger');
  const backdrop = document.getElementById('resume-modal-backdrop');
  const card = document.getElementById('resume-modal-card');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!backdrop || !card) return;

  let previousActiveElement = null;

  function openResumeModal(e) {
    if (e) previousActiveElement = e.currentTarget;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();
  }

  function closeResumeModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', openResumeModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeResumeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeResumeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeResumeModal();
    }
  });
}
