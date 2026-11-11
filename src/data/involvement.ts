import type { Role } from '../types';

/**
 * Clubs, competitions and other unpaid involvement.
 * Kept separate from experience.ts so the page never implies these were jobs.
 */
export const involvement: Role[] = [
  {
    title: 'Training Officer & ICPC Competitor',
    org: 'ACM at UNLV',
    orgHref: 'https://acm.cs.unlv.edu/',
    period: 'Jun 2024 — Aug 2026',
    points: [
      'Placed first in the UNLV Codeathon and competed in the Southern California ICPC Regional.',
      'Delivered technical presentations on algorithms and problem solving to 50+ members.',
    ],
  },
];
