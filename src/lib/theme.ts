/**
 * Light/dark toggle.
 *
 * The initial theme is applied by a small inline script in index.html, before
 * first paint, so the page never flashes the wrong colours. This module only
 * owns the button, the stored preference, and keeping <meta name="theme-color">
 * in step with whichever theme is showing.
 */

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/** Must match the --paper value for each theme in tokens.css. */
const BROWSER_UI_COLOR: Record<Theme, string> = {
  light: '#ebe1cc',
  dark: '#14120e',
};

function current(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    delete document.documentElement.dataset.theme;
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', BROWSER_UI_COLOR[theme]);
}

export function initTheme(): void {
  const button = document.querySelector<HTMLButtonElement>('#themeToggle');
  if (!button) return;

  const label = (theme: Theme): void => {
    const next = theme === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} mode`);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  label(current());

  button.addEventListener('click', () => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    label(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or storage disabled. The toggle still works for
      // this visit, it just will not be remembered.
    }
  });

  // Follow the OS only while the visitor has not made a choice of their own.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* fall through and follow the OS */
    }
    const next: Theme = event.matches ? 'dark' : 'light';
    apply(next);
    label(next);
  });
}
