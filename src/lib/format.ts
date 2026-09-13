/** Indian-English currency formatting (Design System 08 · Voice & copy). */
export function formatINR(paise: number): string {
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export function discountPercent(priceInPaise: number, compareAtInPaise?: number): number | null {
  if (!compareAtInPaise || compareAtInPaise <= priceInPaise) return null;
  return Math.round(((compareAtInPaise - priceInPaise) / compareAtInPaise) * 100);
}

/** "rainbow stacking cups" → "Rainbow Stacking Cups" — for contexts that break from the lowercase display convention. */
export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1));
}
