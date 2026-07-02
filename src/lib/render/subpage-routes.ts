export interface SubpageRoute {
  clientId: string;
  slug: string;
}

/** Parse a glob path like '../clients/<id>/pages/<slug>.astro' → {clientId, slug}; null otherwise. */
export function parseSubpagePath(path: string): SubpageRoute | null {
  const m = path.match(/\/clients\/([a-z][a-z0-9-]*)\/pages\/(.+)\.astro$/);
  return m ? { clientId: m[1], slug: m[2] } : null;
}

/** All subpage routes belonging to the active client. */
export function subpageRoutesForClient(paths: string[], activeClient: string): SubpageRoute[] {
  return paths
    .map(parseSubpagePath)
    .filter((r): r is SubpageRoute => r !== null && r.clientId === activeClient);
}
