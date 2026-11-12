import type { DemoModel } from "@/types/demo";

/**
 * Hydrates public showcase DemoModels with actual publication status from StarX Forge.
 * Only demos explicitly present in publishedSlugs become "Live Demo"; all others stay "Under Development".
 */
export function applyPublishedStates(demos: DemoModel[], publishedSlugs: Iterable<string>): DemoModel[] {
  const publishedSet = publishedSlugs instanceof Set ? publishedSlugs : new Set(publishedSlugs);
  if (publishedSet.size === 0) return demos;
  return demos.map((d) => {
    const isLive = publishedSet.has(d.slug);
    if (!isLive) return d;
    return {
      ...d,
      availabilityStatus: "Live Demo",
      isFreeDemoAvailable: true,
      offlineReady: true,
      publishingStatus: "published",
    };
  });
}
