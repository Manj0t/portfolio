/**
 * Shared content types.
 *
 * Everything the page renders from data is typed here, so adding a project
 * or a role is a matter of filling in an object and letting the compiler
 * tell you what you left out.
 *
 * Note on `html`-suffixed fields: these are rendered with innerHTML so that
 * copy can carry inline <strong> and <a>. They are authored content in this
 * repo, never user input, so there is nothing to sanitise.
 */

export type ProjectStatus = 'live' | 'wip' | 'archived';

export interface ProjectLink {
  /** Button label, e.g. "Visit site" */
  label: string;
  href: string;
  /** Filled style for the primary action. Defaults to outline. */
  primary?: boolean;
}

export interface ProjectAside {
  /** Bolded lead-in, e.g. "Why it matters to me." */
  heading: string;
  text: string;
}

export interface Project {
  /** Stable id, used for the DOM id and the anchor. */
  id: string;
  title: string;
  status: ProjectStatus;
  /** Text shown in the status pill, e.g. "On the App Store". */
  statusLabel: string;
  /** One or two sentences shown in the collapsed row. */
  tagline: string;
  stack: string[];
  /** Body paragraphs. May contain inline HTML. */
  bodyHtml: string[];
  aside?: ProjectAside;
  links: ProjectLink[];
  /** Expanded on first load. Use on the lead project only. */
  openByDefault?: boolean;
}

export interface Experiment {
  title: string;
  description: string;
  /** Short tech label, e.g. "Python · Selenium" */
  tech: string;
  href: string;
}

export interface Role {
  title: string;
  org: string;
  orgHref?: string;
  /** Display string, e.g. "Aug 2025 — May 2026" */
  period: string;
  points: string[];
}
