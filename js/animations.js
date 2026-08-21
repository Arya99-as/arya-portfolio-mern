/**
 * Animations Module
 * Typewriter role rotation, scroll reveal IntersectionObserver, & Back-To-Top button
 */

function initHeroTyping() {
  const typedRoleElement = document.getElementById('typed-role-text');
  const terminalTypedElement = document.getElementById('terminal-typed');

  const roles = [
    "Software Developer",
    "Web Developer",
    "AI / ML Enthusiast",
    "Data Science Explorer",
    "Problem Solver"
  ];

  const terminalFocusList = [
    "Machine Learning & AI Prototypes",
    "Full-Stack Web Applications",
    "Data Science Pipelines",
    "Clean & Maintainable Code"
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (typedRoleElement) typedRoleElement.textContent = roles[0];
    if (terminalTypedElement) terminalTypedElement.textContent = terminalFocusList[0];
    return;
  }

  // Hero Role Typewriter
  if (typedRoleElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 50;
    const pauseDelay = 1800;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(typeRole, timeout);
    }

    typeRole();
  }

  // Terminal Window Typewriter
  if (terminalTypedElement) {
    let termIndex = 0;
    let termCharIndex = 0;
    let termIsDeleting = false;

    function typeTerminal() {
      const currentText = terminalFocusList[termIndex];

      if (termIsDeleting) {
        terminalTypedElement.textContent = currentText.substring(0, termCharIndex - 1);
        termCharIndex--;
      } else {
        terminalTypedElement.textContent = currentText.substring(0, termCharIndex + 1);
        termCharIndex++;
      }

      let timeout = termIsDeleting ? 40 : 80;

      if (!termIsDeleting && termCharIndex === currentText.length) {
        timeout = 2200;
        termIsDeleting = true;
      } else if (termIsDeleting && termCharIndex === 0) {
        termIsDeleting = false;
        termIndex = (termIndex + 1) % terminalFocusList.length;
        timeout = 300;
      }

      setTimeout(typeTerminal, timeout);
    }

    typeTerminal();
  }
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
