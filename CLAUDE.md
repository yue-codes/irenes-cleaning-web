# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
pnpm install       # instalar dependencias (usar siempre pnpm, nunca npm)
pnpm dev           # servidor de desarrollo en localhost:4321
pnpm build         # build de producción a ./dist/
pnpm preview       # previsualizar el build de producción en local
pnpm astro check   # diagnóstico de TypeScript en archivos .astro
```

## Arquitectura

Sitio de una sola página (`src/pages/index.astro`) que compone todas las secciones en orden:
`Popup → Hero → Numeros+Reviews → Services → Bento → FormsContact → Footer`

**Layout** (`src/layouts/Layout.astro`) — envuelve todas las páginas, contiene el `<head>` con meta/OG tags, variables CSS globales para el tema claro/oscuro, importación de fuente y `ClientRouter` para las transiciones de vista.

**Los componentes interactivos usan Preact**, no React. El `tsconfig.json` define `jsxImportSource: "preact"`. Los componentes Preact (`.tsx`) deben usar las directivas `client:load` o `client:visible` cuando se usan dentro de archivos `.astro`:
- `Popup.tsx` — modal de captura de leads, siempre `client:load`
- `Hamburgermenu.tsx` — navegación móvil, `client:load`
- `CountUp.tsx` — contador animado, `client:visible` (carga diferida)

**Los datos** están en `src/utils/data.ts` — exporta el array `services` usado por `Services.astro`.

**Los formularios** hacen POST a Formspree (siendo reemplazados por Resend):
- Popup: `https://formspree.io/f/movqlyww`
- Contacto: `https://formspree.io/f/xwpkjavo`

Cuando se implemente Resend, requerirá `output: 'hybrid'` en `astro.config.mjs`, el adaptador `@astrojs/cloudflare`, y endpoints API en `src/pages/api/`.

**Los estilos** son Tailwind CSS (migrando de v3 a v4). Las variables CSS personalizadas del tema están definidas en el `<style is:global>` de `Layout.astro`. El decorador pseudo-elemento `underline-pink` está duplicado en tres archivos — tenerlo en cuenta al refactorizar.

**Despliegue:** Cloudflare Pages, auto-deploy desde la rama `main` en GitHub. Comando de build: `pnpm build`. Nunca hacer push de un build roto a `main`.

## Problemas conocidos (correcciones pendientes)

- **`og:url`** debe ser `https://mrsirenescleaning.com` — actualmente apunta al dominio incorrecto `irenescleaning.com`
- **`og:image`** debe ser una URL absoluta — actualmente es una ruta relativa, las previsualizaciones en redes sociales no funcionan
- `Bento.astro` y `Services.astro` tienen el mismo `id="services"` — IDs duplicados rompen la navegación por anclas
- `keen-slider` se carga via CDN en `Reviews.astro` — debería ser un paquete npm
- Los links sociales en `FormsContact.astro` apuntan a `#contact` — URLs reales pendientes
- `SwitchTheme.astro` — componente sin usar, pendiente de eliminar
- `src/assets/astro.svg`, `src/assets/background.svg` — sobrantes del template de Astro, pendientes de eliminar
- `Hamburgermenu.tsx` — ítems de navegación en español — el sitio es en inglés
- `Hero.astro:36` — etiqueta `</form>` huérfana (HTML inválido)
- `Footer.astro:28` — etiqueta `</svg>` huérfana (HTML inválido)
- `Header.astro` — `<ul>` anidado dentro de `<ul>` (HTML inválido)
- `Popup.tsx` — se muestra en cada carga de página sin retraso ni verificación de sessionStorage
