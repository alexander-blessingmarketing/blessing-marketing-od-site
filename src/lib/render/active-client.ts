export const DEFAULT_CLIENT = 'glanz';

export function resolveActiveClient(env: Record<string, string | undefined>): string {
  return env.KIT_CLIENT?.trim() || DEFAULT_CLIENT;
}
