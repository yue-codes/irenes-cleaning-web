# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install       # install dependencies (migrated from npm — use pnpm only)
pnpm dev           # dev server at localhost:4321
pnpm build         # production build to ./dist/
pnpm preview       # preview the production build locally
pnpm astro check   # TypeScript diagnostics across all .astro files
```

## Architecture

Single-page site (`src/pages/index.astro`) that composes all sections in order:
`Popup → Hero → Numeros+Reviews → Services → Bento → FormsContact → Footer`

**Layout** (`src/layouts/Layout.astro`) — wraps every page, contains `<head>` with meta/OG tags, global CSS variables for light/dark theming, font import, and `ClientRouter` for view transitions.

**Interactive components use Preact**, not React. The `tsconfig.json` sets `jsxImportSource: "preact"`. Preact components (`.tsx`) must use `client:load` or `client:visible` directives when used inside `.astro` files:
- `Popup.tsx` — lead capture modal, always `client:load`
- `Hamburgermenu.tsx` — mobile nav, `client:load`
- `CountUp.tsx` — animated number counter, `client:visible` (lazy)

**Data** lives in `src/utils/data.ts` — exports the `services` array used by `Services.astro`.

**Forms** POST to Formspree (being replaced by Resend):
- Popup: `https://formspree.io/f/movqlyww`
- Contact: `https://formspree.io/f/xwpkjavo`

When Resend is implemented, this will require `output: 'hybrid'` in `astro.config.mjs` and the `@astrojs/cloudflare` adapter, plus API endpoints at `src/pages/api/`.

**Styling** is Tailwind CSS (migrating v3 → v4). Custom CSS variables for theming are defined in `Layout.astro`'s `<style is:global>`. The `underline-pink` pseudo-element decoration is duplicated in three files — keep in mind when refactoring.

**Deployment:** Cloudflare Pages, auto-deploys from `main` branch on GitHub push. Build command: `pnpm build`. Never push a broken build to `main`. Node.js version set to 22 in the Cloudflare dashboard and `.nvmrc`.

## Known issues (pending fixes)

- **`og:url`** must be `https://mrsirenescleaning.com` — currently points to wrong domain `irenescleaning.com`
- **`og:image`** must be an absolute URL — currently a relative path, social sharing previews break
- `Bento.astro` and `Services.astro` both have `id="services"` — duplicate IDs break anchor navigation
- `keen-slider` loaded via CDN in `Reviews.astro` — should be an npm package
- Social links in `FormsContact.astro` point to `#contact` — real URLs pending
- `SwitchTheme.astro` — unused component, scheduled for deletion
- `src/assets/astro.svg`, `src/assets/background.svg` — Astro template leftovers, scheduled for deletion
- `Hamburgermenu.tsx` nav items in Spanish — site language is English
- `Hero.astro:36` — orphaned `</form>` tag (invalid HTML)
- `Footer.astro:28` — orphaned `</svg>` tag (invalid HTML)
- `Header.astro` — `<ul>` nested inside `<ul>` (invalid HTML)
- `Popup.tsx` — shows on every page load with no delay and no sessionStorage check
