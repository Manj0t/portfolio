/**
 * Fades elements in as they enter the viewport.
 * Call after the data-driven sections have rendered, so their children
 * are already in the DOM and can be observed.
 */
export function initReveal(root: ParentNode = document): void {
  const items = root.querySelectorAll<HTMLElement>('.rv:not(.in)');

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );

  items.forEach((el, i) => {
    // Stagger siblings slightly instead of hard-coding delay classes.
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.08}s`;
    observer.observe(el);
  });
}
