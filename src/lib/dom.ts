/** Small DOM helpers shared by the render functions. */

/** Escape text that gets interpolated into an HTML string. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Query a required element and fail loudly in dev if the markup drifted. */
export function mount(selector: string): HTMLElement | null {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el && import.meta.env.DEV) {
    console.warn(`[portfolio] mount point not found: ${selector}`);
  }
  return el;
}

/** Zero-padded index for the section and project numbering. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** Arrow glyph used on every outbound link. */
export const ARROW_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 17 17 7M17 7H8M17 7v9"/></svg>';
