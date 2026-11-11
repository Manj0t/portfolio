/**
 * Slow drift on the hero's blurred shapes as the page scrolls.
 * Skipped entirely when the visitor has asked for reduced motion.
 */
export function initParallax(): void {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  const blobs = Array.from(document.querySelectorAll<HTMLElement>('.blob'));
  if (!blobs.length) return;

  let queued = false;

  const update = (): void => {
    const y = window.scrollY;
    // Stop doing work once the hero is well out of view.
    if (y <= window.innerHeight * 1.2) {
      blobs.forEach((blob, i) => {
        blob.style.translate = `0 ${(y * (0.06 + i * 0.045)).toFixed(1)}px`;
      });
    }
    queued = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}
