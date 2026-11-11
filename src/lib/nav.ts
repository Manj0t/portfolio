/**
 * Scroll progress bar plus the nav's condensed state once the page moves.
 * Both read scroll position, so they share one rAF-throttled handler.
 */
export function initNav(): void {
  const bar = document.querySelector<HTMLElement>('#progBar');
  const nav = document.querySelector<HTMLElement>('#nav');
  if (!bar || !nav) return;

  let queued = false;

  const update = (): void => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    bar.style.width = `${progress * 100}%`;
    nav.classList.toggle('stuck', window.scrollY > 40);
    queued = false;
  };

  const onScroll = (): void => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
