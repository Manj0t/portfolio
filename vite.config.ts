import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths, so one build works unchanged whether the site is
  // served from a domain root (custom domain) or a subpath
  // (username.github.io/portfolio/). No change needed when you switch.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: true,
  },
});
