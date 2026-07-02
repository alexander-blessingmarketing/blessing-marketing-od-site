import { z } from 'zod';

export const fontSpecSchema = z.object({
  family: z.string(),
  fontsource: z.string(),
  weights: z.array(z.number()).nonempty(),
  fallback: z.string(),
});
export type FontSpec = z.infer<typeof fontSpecSchema>;

export const lookPresetSchema = z.object({
  meta: z.object({
    id: z.string().regex(/^[a-z][a-z0-9-]*$/),
    name: z.string(),
    description: z.string(),
    industryTags: z.array(z.string()).optional(),
    toneTags: z.array(z.string()).optional(),
  }),
  mode: z.enum(['light', 'dark', 'warm']),
  palette: z.object({
    bg: z.string(), surface: z.string(), ink: z.string(),
    muted: z.string(), line: z.string(),
    accent: z.string(), accentInk: z.string(),
    accent2: z.string().optional(),
    accent2Ink: z.string().optional(),
  }),
  typography: z.object({
    display: fontSpecSchema, body: fontSpecSchema, mono: fontSpecSchema,
    scaleRatio: z.number().positive(),
    baseSize: z.string(),
    headingCase: z.enum(['none', 'upper']),
    headingTracking: z.string(),
    headingWeight: z.number().int().min(1).max(1000),
    bodyWeight: z.number().int().min(1).max(1000),
  }),
  density: z.enum(['airy', 'regular', 'compact']),
  shape: z.object({
    radius: z.enum(['none', 'sm', 'md', 'pill']),
    borderWidth: z.string(),
    rules: z.boolean(),
  }),
  material: z.object({
    grain: z.number().min(0).max(1),
    shadow: z.enum(['none', 'soft', 'hard']),
    gradient: z.boolean(),
  }),
  motion: z.object({
    personality: z.enum(['calm', 'snappy', 'expressive']),
    reveal: z.enum(['fade', 'slide', 'clip', 'scramble']),
    durationScale: z.number().positive(),
    ease: z.string(),
    intensity: z.number().min(0).max(1),
  }),
  threeD: z.object({
    treatment: z.enum(['none', 'grain', 'centerpiece', 'particles']),
    intensity: z.number().min(0).max(1),
    accentFromPalette: z.boolean(),
  }),
  layout: z.object({
    nav: z.enum(['inline', 'minimal', 'sidebar']),
    hero: z.enum(['centered', 'split', 'editorial', 'asymmetric', 'panel']),
    services: z.enum(['grid', 'list', 'bento', 'rows', 'showcase', 'editorial']),
    testimonials: z.enum(['cards', 'marquee', 'spotlight']),
    gallery: z.enum(['masonry', 'grid', 'slider']),
    cases: z.enum(['stacked', 'split']).optional(),
    venues: z.enum(['cards', 'list']).optional(),
    people: z.enum(['grid', 'row']).optional(),
    pricing: z.enum(['cards', 'table', 'highlight']),
    about: z.enum(['split', 'stacked', 'statement', 'overlap']),
    stats: z.enum(['band', 'grid']),
    process: z.enum(['steps', 'timeline', 'numbered', 'ghost']),
    faq: z.enum(['accordion', 'twocol', 'list']),
    cta: z.enum(['banner', 'split', 'boxed']),
    logos: z.enum(['row', 'marquee']),
    contact: z.enum(['split', 'card', 'panel']),
    map: z.enum(['embed', 'split']),
  }),
});

export type LookPreset = z.infer<typeof lookPresetSchema>;
