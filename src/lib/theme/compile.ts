import type { LookPreset } from './schema';

const BASE_DURATION_S = 0.6; // 600ms base before per-preset scaling

const RADIUS = { none: '0', sm: '0.25rem', md: '0.75rem', pill: '999px' } as const;
const DENSITY = {
  airy:    { sectionY: '8rem', container: '72rem', gap: '2rem' },
  regular: { sectionY: '6rem', container: '68rem', gap: '1.5rem' },
  compact: { sectionY: '4rem', container: '64rem', gap: '1.25rem' },
} as const;
const HEADING_TRANSFORM: Record<LookPreset['typography']['headingCase'], string> = {
  none: 'none',
  upper: 'uppercase',
};

function shadowValue(kind: LookPreset['material']['shadow']): string {
  switch (kind) {
    case 'none': return 'none';
    case 'soft': return '0 12px 32px rgba(20,17,13,0.14)';
    case 'hard': return '6px 6px 0 var(--ink)';
    default: return 'none';
  }
}

/** Build a font-family value, escaping any embedded double-quotes in the family name. */
function fontValue(family: string, fallback: string): string {
  return `"${family.replace(/"/g, '\\"')}", ${fallback}`;
}

/** Pure: LookPreset -> CSS custom property map. */
export function compilePreset(p: LookPreset): Record<string, string> {
  const d = DENSITY[p.density];
  const t = p.typography;
  return {
    '--bg': p.palette.bg,
    '--surface': p.palette.surface,
    '--ink': p.palette.ink,
    '--muted': p.palette.muted,
    '--line': p.palette.line,
    '--accent': p.palette.accent,
    '--accent-ink': p.palette.accentInk,
    '--accent-2': p.palette.accent2 ?? p.palette.accent,
    '--accent-2-ink': p.palette.accent2Ink ?? p.palette.ink,
    '--preset-font-display': fontValue(t.display.family, t.display.fallback),
    '--preset-font-body': fontValue(t.body.family, t.body.fallback),
    '--preset-font-mono': fontValue(t.mono.family, t.mono.fallback),
    '--scale-ratio': String(t.scaleRatio),
    '--text-base': t.baseSize,
    '--heading-weight': String(t.headingWeight),
    '--heading-tracking': t.headingTracking,
    '--heading-transform': HEADING_TRANSFORM[t.headingCase],
    '--body-weight': String(t.bodyWeight),
    '--radius': RADIUS[p.shape.radius],
    '--border-width': p.shape.borderWidth,
    '--shadow': shadowValue(p.material.shadow),
    '--grain': String(p.material.grain),
    '--section-y': d.sectionY,
    '--container': d.container,
    '--gap': d.gap,
    '--dur': `${Number((BASE_DURATION_S * p.motion.durationScale).toFixed(4))}s`,
    '--ease': p.motion.ease,
    '--motion-intensity': String(p.motion.intensity),
    '--motion-reveal': p.motion.reveal,
  };
}

/** Remove characters that could break out of a CSS declaration (defense-in-depth). */
function cssSafe(value: string): string {
  return value.replace(/[;}]/g, '');
}

/** Pure: LookPreset -> scoped CSS text for [data-preset="<id>"]. */
export function presetToCss(p: LookPreset): string {
  const vars = compilePreset(p);
  const body = Object.entries(vars).map(([k, v]) => `  ${k}: ${cssSafe(v)};`).join('\n');
  return `[data-preset="${p.meta.id}"] {\n${body}\n}`;
}
