/**
 * Master Application Coordinator
 * Initializes all modular subsystems on DOM ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation, Scroll Spy & Resume Viewer Modal
  if (typeof initNavToggle === 'function') initNavToggle();
  if (typeof initScrollSpy === 'function') initScrollSpy();
  if (typeof initResumeViewer === 'function') initResumeViewer();

  // Animations & Typewriter
  if (typeof initHeroTyping === 'function') initHeroTyping();
  if (typeof initScrollReveal === 'function') initScrollReveal();
  if (typeof initBackToTop === 'function') initBackToTop();

  // Projects Subsystem
  if (typeof initProjects === 'function') initProjects();

  // Terminal Chatbot Subsystem
  if (typeof initChatbot === 'function') initChatbot();

  // Form & Footer
  initContactForm();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   Contact Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!contactForm || !formStatus) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all fields before sending.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    showStatus('✓ Message sent successfully! Arya will get back to you soon.', 'success');
    contactForm.reset();

    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  });

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }
}

/* --------------------------------------------------------------------------
   Footer Dynamic Copyright Year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
