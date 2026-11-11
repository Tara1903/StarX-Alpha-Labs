import { DemoCategory } from "@/types/demo";
import { MASTER_DEMO_CATEGORIES } from "@/modules/demo-center/registry/categories";

export const DEMO_CATEGORIES: DemoCategory[] = MASTER_DEMO_CATEGORIES as DemoCategory[];

export function getCategoryBySlug(slug: string): DemoCategory | undefined {
  return DEMO_CATEGORIES.find((c) => c.slug === slug);
}
