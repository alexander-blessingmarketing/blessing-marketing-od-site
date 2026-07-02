import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { siteSchema } from './lib/content/site-schema';

const site = defineCollection({
  loader: glob({ pattern: '*/content/*.json', base: './src/clients' }),
  schema: siteSchema,
});

export const collections = { site };
