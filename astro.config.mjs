// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: "https://mrsirenescleaning.com/",
  adapter: cloudflare(),
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    }
  }
});
