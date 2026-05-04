# Irene's Cleaning — Official Website

Professional cleaning service website for **Irene's Cleaning**, serving Jersey City and surrounding areas in New Jersey.

**Live site:** [mrsirenescleaning.com](https://mrsirenescleaning.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) |
| UI components | [Preact](https://preactjs.com) (not React) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Font | [Onest Variable](https://fontsource.org/fonts/onest) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com) |
| Forms | Formspree → migrating to [Resend](https://resend.com) |
| Package manager | [pnpm](https://pnpm.io) |

---

## Prerequisites

- Node.js >= 22
- pnpm >= 10 — install with `npm i -g pnpm`

---

## Getting Started

```bash
pnpm install
pnpm dev       # http://localhost:4321
```

## Available Commands

```bash
pnpm dev          # Development server with hot reload
pnpm build        # Production build → ./dist/
pnpm preview      # Preview production build locally
pnpm astro check  # TypeScript diagnostics
```

---

## Project Structure

```
src/
├── components/       # UI components (.astro + .tsx for interactive)
│   ├── icons/        # SVG icon components
│   ├── hooks/        # Preact hooks (useProgressiveNumber)
│   └── shared/       # Generic layout helpers (Container, Paragraph)
├── layouts/
│   └── Layout.astro  # Root HTML shell, meta tags, global styles
├── pages/
│   ├── index.astro   # Single-page site entry point
│   └── robots.txt.ts # Dynamic robots.txt
└── utils/
    └── data.ts       # Services content data
```

Page sections render in this order:
`Popup → Hero → Numeros → Reviews → Services → Bento → FormsContact → Footer`

---

## Deployment

Hosted on **Cloudflare Pages** with automatic deployments:
- Every push to `main` triggers a production build
- Build command: `pnpm build`
- Node.js version: 22

**Never push directly to `main` without verifying `pnpm build` passes locally.**

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `PNPM_VERSION` | Cloudflare Pages | Pins pnpm version for CI builds |
| `RESEND_API_KEY` | Cloudflare Pages | Email sending via Resend *(pending setup)* |

---

## External Services

| Service | Purpose | Notes |
|---|---|---|
| Cloudflare Pages | Hosting + CDN | Auto-deploy from GitHub |
| Formspree | Form submissions | Being replaced by Resend |
| jsDelivr CDN | keen-slider library | Being moved to npm package |

---

## Development Notes

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for the full update roadmap, technical decisions, and future task list.
