import type { Role } from '../types';

/**
 * Paid work, most recent first.
 * Club and competition involvement lives in involvement.ts, not here.
 */
export const experience: Role[] = [
  {
    title: 'Operating Systems Teaching Assistant',
    org: 'University of Nevada, Las Vegas',
    period: 'Aug 2025 — May 2026',
    points: [
      'Supported 100+ students across two semesters as a TA for a section that grew from 30 to 40 up to 60 to 70 students, by grading xv6 kernel projects and debugging student implementations of MLFQ scheduling and shared-memory syscalls.',
      "Unblocked an entire course cohort on a segmented paging assignment, by reverse-engineering xv6's undocumented memory allocator and writing line-level annotations of the source that students used as the project reference.",
    ],
  },
  {
    title: 'IT Technician',
    org: 'Top Notch Computer Solutions',
    period: 'May 2025 — Jul 2026',
    points: [
      'Resolved hardware, software, and network failures for 50+ Las Vegas businesses, by diagnosing issues on-site under live client conditions with no escalation path.',
      'Provisioned Active Directory accounts and deployed printers, PoE phones, and camera systems across client sites.',
      'Explained what went wrong and how to avoid it to owners and staff with no technical background, and stayed on site until they could work the system themselves.',
    ],
  },
];
