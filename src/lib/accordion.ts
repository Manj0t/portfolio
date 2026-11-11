/**
 * Height animation for the <details> project rows.
 *
 * <details> has no animatable open state on its own, so the body is measured
 * and driven with max-height. Re-synced on resize and once webfonts land,
 * since both change the measured height.
 */
export function initAccordion(): void {
  const panels = Array.from(document.querySelectorAll<HTMLDetailsElement>('.proj'));
  if (!panels.length) return;

  const syncers = panels.map((details) => {
    const body = details.querySelector<HTMLElement>('.proj-body');
    if (!body) return () => {};

    const sync = (): void => {
      body.style.maxHeight = details.open ? `${body.scrollHeight + 48}px` : '0px';
    };

    details.addEventListener('toggle', sync);
    requestAnimationFrame(sync);
    return sync;
  });

  const syncAll = (): void => syncers.forEach((sync) => sync());

  window.addEventListener('resize', syncAll, { passive: true });
  window.addEventListener('load', syncAll);
  void document.fonts?.ready.then(syncAll);
}
