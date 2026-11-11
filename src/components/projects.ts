import type { Project, ProjectLink } from '../types';
import { esc, ordinal, ARROW_SVG } from '../lib/dom';

function renderLink(link: ProjectLink): string {
  const cls = link.primary ? 'btn solid' : 'btn';
  return `<a class="${cls}" href="${esc(link.href)}" target="_blank" rel="noopener">${esc(
    link.label,
  )} ${ARROW_SVG}</a>`;
}

function renderProject(project: Project, index: number): string {
  const num = ordinal(index);

  const stack = project.stack.map((item) => `<li>${esc(item)}</li>`).join('');

  const body = project.bodyHtml.map((paragraph) => `<p>${paragraph}</p>`).join('');

  const aside = project.aside
    ? `<p class="aside"><b>${esc(project.aside.heading)}</b> ${esc(project.aside.text)}</p>`
    : '';

  const links = project.links.length
    ? `<div class="p-links">${project.links.map(renderLink).join('')}</div>`
    : '';

  return `
    <details class="proj rv" id="${esc(project.id)}"${project.openByDefault ? ' open' : ''}>
      <summary class="proj-head">
        <span class="p-num">${num}</span>
        <span>
          <span class="p-status ${project.status}"><i aria-hidden="true"></i>${esc(
            project.statusLabel,
          )}</span>
          <h3 class="p-title">${esc(project.title)}</h3>
          <p class="p-tag">${esc(project.tagline)}</p>
        </span>
        <span class="plus" aria-hidden="true"></span>
      </summary>
      <div class="proj-body">
        <span class="p-num" aria-hidden="true"></span>
        <div class="proj-body-in">
          <ul class="stack">${stack}</ul>
          ${body}
          ${aside}
          ${links}
        </div>
      </div>
    </details>`;
}

export function renderProjects(target: HTMLElement, projects: Project[]): void {
  target.innerHTML = projects.map(renderProject).join('');
}
