/**
 * Entry point for the /resume page.
 *
 * It shares the home page's chrome (tokens, base, nav) but none of its
 * content rendering, so it only needs the two behaviours that live in the
 * nav itself.
 */
import './styles/resume-main.css';

import { initTheme } from './lib/theme';
import { initNav } from './lib/nav';

initTheme();
initNav();
