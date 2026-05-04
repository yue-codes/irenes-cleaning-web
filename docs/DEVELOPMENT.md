# Development Notes — Irene's Cleaning Web

This document serves as the living reference for ongoing work, technical decisions, and future improvements on this project.

---

## Update Roadmap (started 2026-05-04)

### ✅ Phase 0 — Project documentation
- Created `CLAUDE.md` with architecture overview and development guidance
- Created professional `README.md`
- Created this document

### ✅ Phase 1 — Package manager migration
- Replaced npm with **pnpm@10.33.0**
- Removed `package-lock.json`, generated `pnpm-lock.yaml`
- Added `.npmrc` with `shamefully-hoist=true` (required for Astro peer deps)
- Added `pnpm.onlyBuiltDependencies` for `esbuild` and `sharp` (native binaries)
- Updated Node.js from 18 (EOL) to **22 LTS**
- Updated Cloudflare Pages build settings: install command, build command, Node version, `PNPM_VERSION` env var
- **Verified: production deployment successful**

### 🔲 Phase 2 — HTML bug fixes
Files with invalid markup that need correction:
- `Hero.astro:36` — orphaned `</form>` closing tag
- `Footer.astro:28` — orphaned `</svg>` closing tag  
- `Header.astro:22-28` — `<ul>` incorrectly nested inside another `<ul>`
- `Services.astro:18` + `Bento.astro:5` — duplicate `id="services"` breaks anchor nav
- `Hero.astro` frontmatter — unused `Numeros` import
- `Hamburgermenu.tsx` — nav items in Spanish on an English-language site

### 🔲 Phase 3 — SEO fixes + dead code cleanup
SEO:
- `Layout.astro` `og:url` points to wrong domain (`irenescleaning.com` → `mrsirenescleaning.com`)
- `Layout.astro` `og:image` is a relative path — must be an absolute URL for social previews to work

Dead code to delete:
- `src/components/SwitchTheme.astro` — dark mode toggle, fully implemented but never connected to the UI
- `src/assets/astro.svg` — Astro starter template leftover
- `src/assets/background.svg` — Astro starter template leftover
- `tailwindcss-animated` devDependency — different package from `tailwindcss-animations` (the one actually used), never imported

UX improvement:
- `Popup.tsx` — add 2s delay before showing + `sessionStorage` check so it doesn't re-appear within the same browser session

### 🔲 Phase 4 — keen-slider as npm package
`Reviews.astro` currently loads keen-slider from jsDelivr CDN:
```html
<link href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css" rel="stylesheet" />
<script type="module">import KeenSlider from 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm'</script>
```
Replace with `pnpm add keen-slider` and import locally. Eliminates the external CDN dependency and allows Cloudflare to cache it properly.

### 🔲 Phase 5 — Tailwind CSS v3 → v4
Significant migration. Tailwind v4 removes the config file and moves to CSS-based configuration.

Key changes:
- Remove `@astrojs/tailwind` integration (deprecated in Astro 5)
- Install `tailwindcss@^4` + `@tailwindcss/vite`
- Update `astro.config.mjs`: remove tailwind from integrations, add to `vite.plugins`
- Delete `tailwind.config.mjs` — configuration moves to a CSS file using `@theme`
- Run `npx @tailwindcss/upgrade` as starting point for automated migration
- Verify `tailwindcss-animations` plugin compatibility with v4 (may need replacement)
- Review custom CSS variables in `Layout.astro` — some may map to new v4 `@theme` tokens

### 🔲 Phase 6 — Replace Formspree with Resend *(BLOCKED)*
> **Blocked by:** need destination email address (where leads should land)

Architecture change required — the site is currently fully static. Resend requires a secret API key, so form submissions must go through a server-side function:

1. Add `@astrojs/cloudflare` adapter
2. Change `astro.config.mjs` → `output: 'hybrid'`
3. Create `src/pages/api/contact.ts` — handles contact form
4. Create `src/pages/api/discount.ts` — handles popup 20% OFF form
5. Both endpoints call Resend SDK with the lead data
6. Update `FormsContact.astro` and `Popup.tsx` to POST to the new endpoints
7. Add `RESEND_API_KEY` to Cloudflare Pages environment variables
8. Set up Resend account, verify domain `mrsirenescleaning.com`, get API key

**Current Formspree endpoints (keep active until Resend is live):**
- Popup discount: `https://formspree.io/f/movqlyww`
- Contact form: `https://formspree.io/f/xwpkjavo`

---

## Future Improvements

These are not part of the current update cycle but are worth considering:

### Content
- [ ] Add real social media URLs (Facebook, Instagram, TikTok, Yelp) — currently all point to `#contact`
- [ ] Update stats in `Numeros.astro` when needed (currently: 5.0 stars, +2100 services, +8 years)
- [ ] Add more customer reviews to `Reviews.astro`
- [ ] Replace `/public/1.png` (contact section image) with a proper WebP file with a descriptive name

### Features
- [ ] Add a booking/scheduling page or integrate a calendar widget
- [ ] Add a gallery or before/after section
- [ ] Structured data (JSON-LD) for local business SEO — important for a local service business
- [ ] Add Google Analytics or Cloudflare Web Analytics
- [ ] Form confirmation page instead of `alert()` popups

### Technical
- [ ] Add `<meta name="twitter:card">` tags for Twitter/X share previews
- [ ] Explore `@astrojs/image` for automatic image optimization pipeline
- [ ] Add a `404.html` custom error page for Cloudflare Pages

---

## Technical Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-05-04 | Switched to pnpm | Faster installs, strict dependency resolution, better monorepo support if needed later |
| 2026-05-04 | Node 18 → 22 LTS | Node 18 reached EOL April 2025 |
| 2026-05-04 | Dark mode removed | `SwitchTheme.astro` was built but never integrated — design direction moved away from it |
| 2026-05-04 | Formspree → Resend | More control over email templates, no third-party form limits, own domain sending |
| 2026-05-04 | Tailwind v3 → v4 | v3 deprecated, v4 has better performance and native CSS features |
| 2026-05-04 | Social links kept as `#contact` | Real URLs not yet provided — noted as future task |

---

## Domain & Hosting Notes

- **Production domain:** `mrsirenescleaning.com` (managed in Cloudflare DNS)
- **Alternate domain:** `irenescleaning.com` — appears in old `og:url` meta tag, likely an older domain. Verify if it redirects to the main domain.
- **Sitemap:** auto-generated by `@astrojs/sitemap` at `/sitemap-index.xml`
- **robots.txt:** generated dynamically at `src/pages/robots.txt.ts`, allows all crawlers
