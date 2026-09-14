import type { Product } from "@/lib/types";

/**
 * The badge a product card should display. Falls back to "TOP RATED" for
 * unbadged products with a strong rating — a real, data-derived fallback
 * (rating ≥ 4.9), not a fabricated label.
 */
export function getDisplayBadge(product: Product): string | null {
  if (product.badge) return product.badge;
  if (product.rating != null && product.rating >= 4.9) return "TOP RATED";
  return null;
}
