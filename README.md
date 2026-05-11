# Sunset d'Engenharias 2026

Microsite for **Sunset d'Engenharias**, a festival organised by the 10 student bodies of the engineering faculties at Universidade de Aveiro.

Live: <https://sunset-eng.vercel.app>

## Stack

- **Vite 5** + **React 18**
- **Tailwind CSS v4** (CSS-first `@theme`, `@tailwindcss/vite`)
- **p5.js** — animated sun rays on the hero
- **react-leaflet** — venue map
- Hosted on **Vercel**

## Project structure

```
public/
  gallery/          photos and drone video from previous editions
  nucleos/          logos of the 10 organising student bodies
  sponsors/         logos grouped by tier (main / gold / silver / bronze)
  logo.png          festival logo
src/
  App.jsx           root layout, language toggle, theme/palette state
  content.js        bilingual PT/EN copy + structured data (lineup, sponsors, gallery)
  styles.css        design tokens, palettes, theme overrides, custom animations
  main.jsx          Vite entry
  components/
    Nav.jsx                top nav with mobile slide-in sidebar
    Hero.jsx               headline, countdown, sun
    SunFlames.jsx          p5.js sketch for animated rays
    Lineup.jsx             event schedule
    About.jsx              about copy
    Team.jsx               organising team with núcleo shields
    Gallery.jsx            grid + lightbox dialog
    Location.jsx           venue info
    Sponsors.jsx           sponsors section
    MainSponsor.jsx        emphasised headline sponsor card
    SponsorCarousel.jsx    infinite marquee carousel for gold/silver tiers
    Footer.jsx             contacts, núcleos grid, credits
```

## Running locally

```sh
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve the production build
```

## Deployment

Every push to `master` triggers a Vercel deployment. Production is aliased to <https://sunset-eng.vercel.app>.

Manual deploy:

```sh
vercel --prod
```

## Theming

Theme (`light` / `dark`) and accent palette are stored on `<html>` as `data-theme` and `data-palette` attributes; CSS custom properties in `src/styles.css` re-cascade from there. To add a palette, drop a new `[data-palette="…"]` block with the relevant `--sun-*` and `--line*` overrides.

## Content

All copy and structured data live in `src/content.js` under `pt` and `en` keys — edit there to update lineup, sponsors, gallery captions, etc.

## Credits

Built by [Hugo Correia](https://github.com/hugocorreia15) for the NEI · Universidade de Aveiro.
