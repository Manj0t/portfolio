import type { Experiment } from '../types';
import { esc, ARROW_SVG } from '../lib/dom';

function renderExperiment(item: Experiment): string {
  return `
    <a class="repo" href="${esc(item.href)}" target="_blank" rel="noopener">
      <h3>${esc(item.title)} ${ARROW_SVG}</h3>
      <p>${esc(item.description)}</p>
      <span>${esc(item.tech)}</span>
    </a>`;
}

export function renderExperiments(target: HTMLElement, items: Experiment[]): void {
  target.innerHTML = items.map(renderExperiment).join('');
}
