/**
 * Small touches of motion that respond to the visitor: an intro on the
 * greeting, a soft light that follows the pointer across the hero, the
 * hero shapes leaning toward the pointer, and a glow that tracks the
 * cursor inside the experiment cards.
 *
 * Everything here is skipped for visitors who ask for reduced motion, and
 * the pointer effects are skipped on touch screens where there is no
 * pointer to follow.
 */

const motionOK = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const finePointer = (): boolean =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Wraps each word of the greeting so the words can rise in one by one. */
function splitHeading(): void {
  const h1 = document.querySelector<HTMLElement>('.hero h1');
  if (!h1 || h1.dataset.split) return;

  let index = 0;
  const wrap = (node: Node): HTMLElement => {
    const outer = document.createElement('span');
    outer.className = 'w';
    outer.style.setProperty('--i', String(index++));
    const inner = document.createElement('span');
    inner.className = 'w-in';
    inner.appendChild(node);
    outer.appendChild(inner);
    return outer;
  };

  const out = document.createDocumentFragment();
  // The last word span, so punctuation that touches a word ("Manjot.")
  // joins it instead of becoming its own piece that could wrap alone.
  let last: HTMLElement | null = null;

  Array.from(h1.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      (node.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          out.appendChild(document.createTextNode(part));
          last = null;
        } else if (last) {
          last.firstElementChild?.appendChild(document.createTextNode(part));
        } else {
          last = wrap(document.createTextNode(part));
          out.appendChild(last);
        }
      });
    } else {
      last = wrap(node.cloneNode(true));
      out.appendChild(last);
    }
  });

  h1.textContent = '';
  h1.appendChild(out);
  h1.dataset.split = 'true';
  document.documentElement.classList.add('intro');
}

/** A soft light that trails the pointer while it is over the hero. */
function heroLight(): void {
  const hero = document.querySelector<HTMLElement>('header.hero');
  const blobs = hero?.querySelector<HTMLElement>('.blobs');
  if (!hero || !blobs) return;

  const light = document.createElement('div');
  light.className = 'hero-light';
  light.setAttribute('aria-hidden', 'true');
  // After the shapes, so it lights them, and still under the copy.
  blobs.after(light);

  // Target and current positions, eased toward each other every frame so
  // the light trails the pointer instead of snapping to it.
  let tx = 0.5;
  let ty = 0.4;
  let cx = tx;
  let cy = ty;
  let running = false;

  const frame = (): void => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    hero.style.setProperty('--lx', `${(cx * 100).toFixed(2)}%`);
    hero.style.setProperty('--ly', `${(cy * 100).toFixed(2)}%`);
    // The shapes lean a few pixels toward the pointer.
    blobs.style.transform = `translate3d(${((cx - 0.5) * 28).toFixed(1)}px, ${((cy - 0.5) * 22).toFixed(1)}px, 0)`;

    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  };

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    tx = (event.clientX - rect.left) / rect.width;
    ty = (event.clientY - rect.top) / rect.height;
    hero.classList.add('lit');
    if (!running) {
      running = true;
      requestAnimationFrame(frame);
    }
  });

  hero.addEventListener('pointerleave', () => hero.classList.remove('lit'));
}

/** Cursor-tracking glow inside the experiment cards. */
function cardGlow(): void {
  document.addEventListener('pointermove', (event) => {
    const card = (event.target as Element | null)?.closest<HTMLElement>('.repo');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
}

export function initAlive(): void {
  if (!motionOK()) return;
  splitHeading();
  if (finePointer()) {
    heroLight();
    cardGlow();
  }
}
