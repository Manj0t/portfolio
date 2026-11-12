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
    // Two pages, each with its own entry script. Adding another page means
    // adding an index.html folder here and one line below.
    rollupOptions: {
      input: {
        main: 'index.html',
        resume: 'resume/index.html',
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
