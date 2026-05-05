# Notas de Desarrollo — Irene's Cleaning Web

Este documento es la referencia viva del trabajo en curso, decisiones técnicas y mejoras futuras del proyecto.

---

## Roadmap de actualización (iniciado 2026-05-04)

### ✅ Fase 0 — Documentación del proyecto
- Creación de `CLAUDE.md` con arquitectura y guía de desarrollo
- Creación de `README.md` profesional
- Creación de este documento

### ✅ Fase 1 — Migración de gestor de paquetes
- Reemplazado npm por **pnpm@10.33.0**
- Eliminado `package-lock.json`, generado `pnpm-lock.yaml`
- Agregado `.npmrc` con `shamefully-hoist=true` (requerido por dependencias de Astro)
- Agregado `pnpm.onlyBuiltDependencies` para `esbuild` y `sharp` (binarios nativos)
- Actualizado Node.js de 18 (EOL) a **22 LTS**
- Actualizada la configuración de Cloudflare Pages: comando de instalación, comando de build, versión de Node, variable `PNPM_VERSION`
- **Verificado: despliegue en producción exitoso**

### ✅ Fase 2 — Corrección de bugs de HTML
Archivos con markup inválido que necesitan corrección:
- `Hero.astro:36` — etiqueta `</form>` huérfana (sin apertura)
- `Footer.astro:28` — etiqueta `</svg>` huérfana (sin apertura)
- `Header.astro:22-28` — `<ul>` incorrectamente anidado dentro de otro `<ul>`
- `Services.astro:18` + `Bento.astro:5` — `id="services"` duplicado, rompe la navegación por anclas
- `Hero.astro` frontmatter — import de `Numeros` sin usar
- `Hamburgermenu.tsx` — ítems del menú en español en un sitio en inglés ("Inicio", "Servicios", "ID/About")

### ✅ Fase 3 — Correcciones de SEO y limpieza de código muerto
SEO:
- `Layout.astro` `og:url` apunta al dominio incorrecto (`irenescleaning.com` → `mrsirenescleaning.com`)
- `Layout.astro` `og:image` es una ruta relativa — debe ser una URL absoluta para que funcionen las previsualizaciones en redes sociales

Código muerto a eliminar:
- `src/components/SwitchTheme.astro` — toggle de modo oscuro, completamente implementado pero nunca conectado a la UI
- `src/assets/astro.svg` — archivo sobrante del template de Astro
- `src/assets/background.svg` — archivo sobrante del template de Astro
- `tailwindcss-animated` en devDependencies — paquete diferente al que realmente se usa (`tailwindcss-animations`), nunca importado

Mejora de UX:
- `Popup.tsx` — agregar retraso de 2 segundos antes de mostrarse + verificación con `sessionStorage` para que no reaparezca en la misma sesión del navegador

### ✅ Fase 4 — Slider de reseñas reescrito sin dependencias
Reescrito `Reviews.astro` con CSS Scroll Snap nativo + ~20 líneas de JS vanilla.
- Sin dependencias externas ni paquetes npm
- 0 KB añadido al bundle
- Scroll nativo del navegador (rendimiento óptimo)
- Misma funcionalidad: prev/next, contador, opacidad en slides inactivos, responsive

### ✅ Fase 5 — Astro 5→6 + Tailwind CSS v3→v4
Migración significativa. Tailwind v4 elimina el archivo de configuración y pasa a configuración basada en CSS.

Cambios aplicados:
- Astro 5.18 → 6.2.2, @astrojs/preact 4.x → 5.x
- Eliminado `@astrojs/tailwind` + `tailwindcss@3` + `tailwindcss-animations` (deprecado)
- Instalado `tailwindcss@4.2.4` + `@tailwindcss/vite`
- Eliminado `tailwind.config.mjs` — reemplazado por `src/styles/global.css`
- `astro.config.mjs`: tailwind movido de integrations a `vite.plugins`
- `src/styles/global.css`: `@import "tailwindcss"` + `@custom-variant dark` + `@layer utilities` con las clases custom (`bg-body`, `text-heading-*`, etc.) correctamente mapeadas a las variables CSS del tema
- `Bento.astro`: corregido `transition-scale` (inválido) → `transition-transform` en los 4 fondos de imagen

### ✅ Fase 6 — Reemplazar Formspree con Resend + notificaciones Telegram

El sitio sigue siendo completamente estático. Los formularios se procesan mediante **Cloudflare Pages Functions** (`functions/api/`), que CF Pages detecta y despliega automáticamente junto con los assets estáticos.

Cambios aplicados:
- Creado `functions/api/contact.ts` — procesa el formulario de contacto
- Creado `functions/api/discount.ts` — procesa popup 20% OFF y form del hero
- Ambas functions llaman a Resend y Telegram en paralelo (`Promise.all`)
- `FormsContact.astro`: `action` → `/api/contact`
- `Popup.tsx` y `FormsDescuento.astro`: `action` → `/api/discount`
- `FormsDescuento.astro`: restyling del form del hero (fondo blanco, sin barra rosa)
- Creado `wrangler.toml` con `pages_build_output_dir = "dist"` y vars no-sensibles
- Creado `.env.example` y `.dev.vars` (gitignored) para desarrollo local

**Variables:**
- `wrangler.toml [vars]`: `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`
- CF Pages Secrets (dashboard): `RESEND_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Nota: con `wrangler.toml` presente, CF Pages solo permite agregar Secrets via dashboard — las vars planas DEBEN ir en el archivo

**Dev local:** `pnpm dev` (UI) + `pnpm dev:pages` (wrangler proxy en :8788 con functions). Ver CLAUDE.md para detalle.

Configuración de Resend: usando `onboarding@resend.dev`. Verificar `mrsirenescleaning.com` en Resend cuando se quiera enviar desde dominio propio.

**Lecciones aprendidas:**
- El adapter `@astrojs/cloudflare` genera `dist/server/` + `dist/client/` que el pipeline de GitHub integration de CF Pages no despliega correctamente como Functions. La solución correcta es `functions/` en la raíz del proyecto.
- `@astrojs/cloudflare@13.3.1` + `wrangler@4.87` son incompatibles: el adapter genera un binding `ASSETS` que wrangler ahora reserva. No activar el adapter en `astro.config.mjs` hasta que se corrija. Esto impide que `pnpm dev` sirva rutas API — usar `pnpm dev:pages` para probar formularios localmente.
- Con `wrangler.toml` en el proyecto, CF Pages gestiona vars via archivo. El dashboard solo acepta Secrets. Las vars planas no-sensibles deben estar en `wrangler.toml [vars]`.

**Seguridad del bot de Telegram:**
El bot está protegido: el token es un Secret en CF Pages (no en el código ni en GitHub), y solo el `CHAT_ID` configurado recibe mensajes. El único riesgo es spam en los endpoints públicos — documentado en la sección anti-spam de mejoras futuras.

---

## Mejoras futuras

No forman parte del ciclo de actualización actual, pero vale la pena considerar:

### Contenido
- [ ] Agregar URLs reales de redes sociales (Facebook, Instagram, TikTok, Yelp) — actualmente todas apuntan a `#contact`
- [ ] Actualizar estadísticas en `Numeros.astro` cuando sea necesario (actualmente: 5.0 estrellas, +2100 servicios, +8 años)
- [ ] Agregar más reseñas de clientes a `Reviews.astro`
- [ ] Reemplazar `/public/1.png` (imagen de la sección de contacto) por un archivo WebP con nombre descriptivo

### Funcionalidades
- [ ] Agregar una página o widget de reservas/agenda
- [ ] Agregar una sección de galería o antes/después
- [ ] Datos estructurados (JSON-LD) para SEO local — importante para un negocio de servicios locales
- [ ] Integrar Google Analytics o Cloudflare Web Analytics
- [ ] Páginas de confirmación en lugar de popups con `alert()`

### Anti-spam en formularios
La validación actual es solo client-side (JS del navegador) — un bot que haga POST directo a `/api/discount` o `/api/contact` la salta por completo. Mejoras pendientes por orden de prioridad:

- [ ] **Honeypot** — agregar un campo oculto con CSS (`display:none`) en los tres formularios. Los bots lo llenan, los humanos no. Si llega con valor → descartar silenciosamente en el servidor. Costo: cero, implementación: 15 min.
- [ ] **Validación server-side** — replicar en los endpoints API las mismas reglas que ya existen en el frontend: formato 10 dígitos, sin repeticiones excesivas, sin secuencias. Actualmente solo se valida en el navegador.
- [ ] **Cloudflare Turnstile** — CAPTCHA invisible de Cloudflare, gratis, sin fricciones para el usuario. Requiere agregar el widget al HTML y verificar el token en el servidor con la API de Turnstile.
- [ ] **Rate limiting por IP** — máx. N envíos por ventana de tiempo. Se puede implementar con Cloudflare Workers KV o con las reglas de Rate Limiting del dashboard de Cloudflare Pages (sin código).

### Técnico
- [ ] Agregar tags `<meta name="twitter:card">` para previsualizaciones en Twitter/X
- [ ] Explorar `@astrojs/image` para optimización automática de imágenes
- [ ] Agregar página de error 404 personalizada para Cloudflare Pages
- [ ] Verificar dominio `mrsirenescleaning.com` en Resend para enviar desde el dominio propio en lugar de `onboarding@resend.dev`

---

## Registro de decisiones técnicas

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-05-04 | Cambio a pnpm | Instalaciones más rápidas, resolución estricta de dependencias, mejor soporte para monorepo si se necesita en el futuro |
| 2026-05-04 | Node 18 → 22 LTS | Node 18 llegó a su fin de vida en abril de 2025 |
| 2026-05-04 | Modo oscuro eliminado | `SwitchTheme.astro` estaba construido pero nunca integrado — la dirección de diseño se alejó de esa funcionalidad |
| 2026-05-04 | Formspree → Resend + Telegram | Mayor control sobre correos, notificaciones instantáneas al negocio, sin límites de terceros |
| 2026-05-04 | Tailwind v3 → v4 | v3 en deprecación, v4 tiene mejor rendimiento y usa características nativas de CSS |
| 2026-05-04 | Links sociales mantenidos como `#contact` | URLs reales no proporcionadas aún — registrado como tarea futura |
| 2026-05-04 | Resend con `onboarding@resend.dev` | Dominio propio no verificado aún — suficiente para producción inicial |
| 2026-05-04 | Validación anti-spam solo client-side | Cubre casos manuales básicos; mejoras server-side documentadas para futuro |
| 2026-05-05 | `functions/` en lugar de `src/pages/api/` | Adapter `@astrojs/cloudflare` incompatible con CF Pages GitHub integration y con wrangler v4.87 |
| 2026-05-05 | Bot de Telegram para notificaciones de leads | Tiempo real, gratis, sin configuración adicional — token guardado como Secret en CF Pages |

---

## Notas de dominio y hosting

- **Dominio de producción:** `mrsirenescleaning.com` (gestionado en Cloudflare DNS)
- **Dominio alternativo:** `irenescleaning.com` — aparece en el antiguo meta tag `og:url`, probablemente un dominio anterior. Verificar si redirige al dominio principal.
- **Sitemap:** generado automáticamente por `@astrojs/sitemap` en `/sitemap-index.xml`
- **robots.txt:** generado dinámicamente en `src/pages/robots.txt.ts`, permite todos los crawlers
