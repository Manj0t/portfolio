import type { Role } from '../types';
import { esc } from '../lib/dom';

function renderOrg(role: Role): string {
  if (!role.orgHref) return esc(role.org);
  return `<a href="${esc(role.orgHref)}" target="_blank" rel="noopener">${esc(role.org)}</a>`;
}

function renderRole(role: Role): string {
  const points = role.points.map((point) => `<li>${esc(point)}</li>`).join('');

  return `
    <div class="xp-row rv">
      <div>
        <h3>${esc(role.title)}</h3>
        <div class="xp-org">${renderOrg(role)}</div>
        <ul>${points}</ul>
      </div>
      <div class="xp-when">${esc(role.period)}</div>
    </div>`;
}

export function renderExperience(target: HTMLElement, roles: Role[]): void {
  target.innerHTML = roles.map(renderRole).join('');
}
