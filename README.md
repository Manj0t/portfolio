# Portfolio

Personal site for Manjot Sandhu. Static, no backend, built with Vite and TypeScript.

Live at **[add your domain here]**.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck, then build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit on its own
```

## Where things live

```
index.html              page shell, hero and about copy, contact details
src/
  main.ts               entry point, wires data to components
  types.ts              shared content interfaces
  data/                 all editable content
    projects.ts         featured work
    experiments.ts      smaller repo grid
    experience.ts       paid work history
    involvement.ts      clubs and competitions, kept separate from jobs
    skills.ts           marquee strip
  components/           functions that turn data into markup
  lib/                  behaviour (nav, scroll reveal, accordion, parallax)
  styles/               one stylesheet per section, imported by main.css
```

The split is deliberate. One-off prose (the hero, the about paragraphs,
contact details) lives in `index.html` because that is where prose belongs.
Anything that repeats lives in `src/data/` as typed objects, so adding a
project or a role means filling in one object and letting `tsc` tell you
what is missing.

## Common edits

**Add a project** — append a `Project` to the array in `src/data/projects.ts`.
`status` is `'live' | 'wip' | 'archived'` and drives the colour of the pill.
Set `openByDefault: true` on exactly one project.

**Change the palette** — every colour is a custom property in
`src/styles/tokens.css`. Nothing else hardcodes a hex value.

**Change a font** — swap the Google Fonts `<link>` in `index.html` and the
three font stacks in `tokens.css`.

**Update the about copy or contact details** — `index.html`.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. In the repo's **Settings → Pages**, set
the source to **GitHub Actions**.

For a custom domain, add it under Settings → Pages. GitHub writes a `CNAME`
file and provisions HTTPS. At your registrar, point the domain at GitHub:

- Apex domain — four `A` records to `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- Subdomain — one `CNAME` record to `<username>.github.io`

`base` in `vite.config.ts` is `'./'`, so assets resolve relatively and the
same build works at a domain root or at `username.github.io/portfolio/`
with no change.

## Notes

- Light mode only, by design.
- Respects `prefers-reduced-motion`; the parallax and reveal animations
  turn themselves off.
- The `bodyHtml` fields in `projects.ts` are rendered with `innerHTML` so
  copy can carry inline `<strong>`. That content is authored in this repo
  and never comes from user input, so there is nothing to sanitise. Keep it
  that way if you add a data source later.
