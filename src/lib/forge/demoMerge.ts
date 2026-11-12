import type { DemoModel } from "@/types/demo";

/**
 * Combines base catalog demos with published custom Forge demos,
 * preserving all existing catalog entries while deduplicating by slug.
 */
export function mergeUniqueDemos(baseDemos: DemoModel[], extraDemos: DemoModel[]): DemoModel[] {
  if (!extraDemos.length) return baseDemos;
  const seen = new Set(baseDemos.map((d) => d.slug));
  const uniqueExtra = extraDemos.filter((d) => !seen.has(d.slug));
  return uniqueExtra.length ? [...baseDemos, ...uniqueExtra] : baseDemos;
}
