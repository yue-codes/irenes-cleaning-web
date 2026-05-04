# Irene's Cleaning — Sitio Web Oficial

Sitio web de servicio de limpieza profesional para **Irene's Cleaning**, con cobertura en Jersey City y áreas circundantes de New Jersey.

**Sitio en producción:** [mrsirenescleaning.com](https://mrsirenescleaning.com)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) |
| Componentes interactivos | [Preact](https://preactjs.com) (no React) |
| Estilos | [Tailwind CSS](https://tailwindcss.com) |
| Fuente tipográfica | [Onest Variable](https://fontsource.org/fonts/onest) |
| Despliegue | [Cloudflare Pages](https://pages.cloudflare.com) |
| Formularios | Formspree → migrando a [Resend](https://resend.com) |
| Gestor de paquetes | [pnpm](https://pnpm.io) |

---

## Requisitos previos

- Node.js >= 22
- pnpm >= 10 — instalar con `npm i -g pnpm`

---

## Inicio rápido

```bash
pnpm install
pnpm dev       # http://localhost:4321
```

## Comandos disponibles

```bash
pnpm dev          # Servidor de desarrollo con hot reload
pnpm build        # Build de producción → ./dist/
pnpm preview      # Previsualizar el build de producción en local
pnpm astro check  # Diagnóstico de TypeScript
```

---

## Estructura del proyecto

```
src/
├── components/       # Componentes de UI (.astro + .tsx para los interactivos)
│   ├── icons/        # Componentes de iconos SVG
│   ├── hooks/        # Hooks de Preact (useProgressiveNumber)
│   └── shared/       # Helpers genéricos de maquetación (Container, Paragraph)
├── layouts/
│   └── Layout.astro  # Shell HTML raíz, meta tags, estilos globales
├── pages/
│   ├── index.astro   # Punto de entrada del sitio (una sola página)
│   └── robots.txt.ts # robots.txt generado dinámicamente
└── utils/
    └── data.ts       # Contenido de los servicios
```

Las secciones de la página se renderizan en este orden:
`Popup → Hero → Numeros → Reviews → Services → Bento → FormsContact → Footer`

---

## Despliegue

Alojado en **Cloudflare Pages** con despliegues automáticos:
- Cada push a `main` dispara un build de producción
- Comando de build: `pnpm build`
- Versión de Node.js: 22

**Nunca hacer push directo a `main` sin verificar antes que `pnpm build` pasa en local.**

---

## Variables de entorno

| Variable | Dónde | Propósito |
|---|---|---|
| `PNPM_VERSION` | Cloudflare Pages | Fija la versión de pnpm en los builds de CI |
| `RESEND_API_KEY` | Cloudflare Pages | Envío de correos via Resend *(pendiente de configurar)* |

---

## Servicios externos

| Servicio | Propósito | Notas |
|---|---|---|
| Cloudflare Pages | Hosting + CDN | Auto-deploy desde GitHub |
| Formspree | Envío de formularios | En proceso de reemplazar con Resend |
| jsDelivr CDN | Librería keen-slider | En proceso de mover a paquete npm |

---

## Notas de desarrollo

Ver [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) para el roadmap completo de actualización, decisiones técnicas y lista de tareas futuras.
