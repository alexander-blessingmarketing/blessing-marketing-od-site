import type { LookPreset } from '../../lib/theme/schema';

// blessing-marketing-od — Astro-Port des finalisierten Open-Design Blessing-Marketing
// Landingpage-Designs (photo-led / full-bleed, dunkles Stats-Band, Cases mit
// Ausgangssituation/Ergebnis). Quelle der Wahrheit für den Look ist Page.astro;
// dieses Preset liefert nur die self-hosted Fonts (Oswald/Inter/JetBrains Mono via
// @fontsource-variable) und die Palette aus den OD-Tokens. Die layout-Enums werden
// vom bespoke Page.astro umgangen — sie müssen nur gegen lookPresetSchema validieren.
export const preset: LookPreset = {
  meta: {
    id: 'blessing-marketing-od',
    name: 'Blessing-Marketing (Open Design)',
    description: 'Photo-led, full-bleed Landingpage einer datengetriebenen Marketing- & Recruiting-Agentur aus Starnberg — weißes Paper, dunkles Stats-Band, royalblauer Akzent.',
    industryTags: ['agency', 'media', 'consulting'],
    toneTags: ['modern', 'bold', 'confident'],
  },
  mode: 'light',
  palette: {
    bg: '#ffffff',
    surface: '#eef0f4',
    ink: '#1c1c1c',
    muted: '#6b6e78',
    line: '#e0e0e0',
    accent: '#0a65aa',
    accentInk: '#ffffff',
    accent2: '#15264a',
    accent2Ink: '#ffffff',
  },
  typography: {
    display: { family: 'Oswald Variable', fontsource: '@fontsource-variable/oswald', weights: [500, 600, 700], fallback: "'Arial Narrow', system-ui, sans-serif" },
    body: { family: 'Inter Variable', fontsource: '@fontsource-variable/inter', weights: [400, 500, 600], fallback: 'system-ui, sans-serif' },
    mono: { family: 'JetBrains Mono Variable', fontsource: '@fontsource-variable/jetbrains-mono', weights: [400, 500], fallback: 'ui-monospace, monospace' },
    scaleRatio: 1.2,
    baseSize: '17px',
    headingCase: 'none',
    headingTracking: '-0.01em',
    headingWeight: 600,
    bodyWeight: 400,
  },
  density: 'regular',
  shape: { radius: 'sm', borderWidth: '1px', rules: true },
  material: { grain: 0, shadow: 'soft', gradient: false },
  motion: { personality: 'snappy', reveal: 'fade', durationScale: 0.9, ease: 'cubic-bezier(0.16,1,0.3,1)', intensity: 0.5 },
  threeD: { treatment: 'none', intensity: 0, accentFromPalette: true },
  layout: { nav: 'inline', hero: 'split', services: 'grid', testimonials: 'cards', gallery: 'grid', cases: 'stacked', pricing: 'table', about: 'statement', stats: 'band', process: 'numbered', faq: 'twocol', cta: 'banner', logos: 'marquee', people: 'row', contact: 'card', map: 'embed' },
};
