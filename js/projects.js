/**
 * Projects Module
 * Manages project card interactions and dynamic data binding
 */

function initProjects() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--border-active)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border)';
    });
  });
}
