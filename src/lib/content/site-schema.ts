import { z } from 'zod';

// Bespoke-Client: Page.astro liest c.* untypisiert. Nur die vom Shell genutzten
// Felder hart, Rest durchreichen — kein Import der Section-Variant-Schemas nötig.
export const siteSchema = z
  .object({
    brand: z.string(),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    footerNote: z.string(),
    logo: z.string().optional(),
    logoAlt: z.string().optional(),
    favicon: z.string().optional(),
  })
  .passthrough();

export type SiteContent = z.infer<typeof siteSchema>;
