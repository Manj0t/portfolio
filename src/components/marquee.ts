import { esc } from '../lib/dom';

/**
 * Renders the skill track twice so the CSS translateX(-50%) loop is seamless.
 */
export function renderMarquee(target: HTMLElement, skills: string[]): void {
  const once = skills.map((skill) => `<span>${esc(skill)}</span>`).join('');
  target.innerHTML = once + once;
}
