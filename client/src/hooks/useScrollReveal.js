import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observeElements = () => {
      const elements = containerRef.current?.querySelectorAll('.scroll-reveal:not(.active)');
      if (!elements || !elements.length) return;

      if (prefersReducedMotion) {
        elements.forEach(el => el.classList.add('active'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // MutationObserver to catch dynamic content (e.g. API fetched cards)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return containerRef;
}
