export type AssetMap = Record<string, string>;

/**
 * Schlüssel in der import.meta.glob-Map für ein Client-Asset. ref ist relativ zum Client-Ordner,
 * z. B. "assets/hero.jpg". Ein führender Slash wird toleriert (Sveltia CMS schreibt "/assets/…"),
 * damit von Hand und vom CMS gepflegte Referenzen gleich auflösen.
 */
export function assetKey(clientId: string, ref: string): string {
  return `../../clients/${clientId}/${ref.replace(/^\/+/, '')}`;
}

/** Löst eine lokale Bild-Referenz zu ihrer gebauten URL auf, oder null (leer/undefiniert/extern/unbekannt). */
export function resolveSlotImage(map: AssetMap, clientId: string, ref: string | undefined): string | null {
  if (!ref || typeof ref !== 'string') return null;
  if (/^https?:\/\//i.test(ref)) return null;
  return map[assetKey(clientId, ref)] ?? null;
}

/** Eager URL-Map aller Client-Assets. Vite löst die Pfade beim Build auf und hasht die Dateien. */
export const ASSET_URLS = import.meta.glob('../../clients/*/assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as AssetMap;

type GalleryImage = { src?: string; alt?: string };

/** Löst eine Ref auf und gibt eine Build-Warnung aus, wenn die Ref gesetzt, lokal und nicht auflösbar ist. */
function resolveWithWarn(map: AssetMap, clientId: string, ref: string | undefined): string | null {
  const result = resolveSlotImage(map, clientId, ref);
  if (ref && typeof ref === 'string' && !/^https?:\/\//i.test(ref) && result === null) {
    console.warn(`[kit] image asset not found: ${clientId}/${ref} — using fallback`);
  }
  return result;
}

/** Ersetzt Bild-Referenzen in den Props einer Sektion durch aufgelöste URLs. hero/about: image -> url|undefined; gallery: images[].src -> url|''. */
export function resolveSectionImages(
  map: AssetMap,
  clientId: string,
  section: string,
  props: Record<string, unknown>,
): Record<string, unknown> {
  if (section === 'hero' || section === 'about') {
    return { ...props, image: resolveWithWarn(map, clientId, props.image as string | undefined) ?? undefined };
  }
  if (section === 'gallery') {
    const images = props.images as GalleryImage[] | undefined;
    if (!images) return props;
    return {
      ...props,
      images: images.map((im) => ({ ...im, src: resolveWithWarn(map, clientId, im.src) ?? '' })),
    };
  }
  if (section === 'logos') {
    const items = props.items as Array<Record<string, unknown>> | undefined;
    if (!items) return props;
    return {
      ...props,
      items: items.map((it) => ({ ...it, src: resolveWithWarn(map, clientId, it.src as string | undefined) ?? '' })),
    };
  }
  if (section === 'services' || section === 'venues' || section === 'people') {
    const items = props.items as Array<Record<string, unknown>> | undefined;
    if (!items) return props;
    return {
      ...props,
      items: items.map((it) => ({ ...it, image: resolveWithWarn(map, clientId, it.image as string | undefined) ?? undefined })),
    };
  }
  if (section === 'map') {
    return { ...props, image: resolveWithWarn(map, clientId, props.image as string | undefined) ?? undefined };
  }
  return props;
}
