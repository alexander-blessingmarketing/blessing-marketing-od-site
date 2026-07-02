import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://alexander-blessingmarketing.github.io',
  base: '/blessing-marketing-od-site',
  vite: { plugins: [tailwindcss()] },
});
