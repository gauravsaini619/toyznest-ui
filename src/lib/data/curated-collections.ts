import type { AccentSurface } from "@/lib/types";

export interface CuratedCollection {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  placeholderLabel: string;
  surface: AccentSurface;
}

/**
 * The homepage's seasonal-merchandising slot — swap this array around key
 * dates (Diwali → "Little Diwali Gifts", Christmas → "Christmas Morning
 * Magic", summer → "Summer Adventures") without touching the component.
 */
export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    title: "Screen-Free Favourites",
    description: "Play that keeps little hands busy.",
    ctaLabel: "Explore collection",
    href: "/collection?sort=bestsellers",
    placeholderLabel: "screen-free favourites · 4:3",
    surface: "navy",
  },
  {
    title: "Future Engineers",
    description: "Build. Break. Build again.",
    ctaLabel: "Explore collection",
    href: "/collection?category=building-stem",
    placeholderLabel: "future engineers · 4:3",
    surface: "cobalt",
  },
  {
    title: "Rainy Day Rescue",
    description: "Big fun for days spent indoors.",
    ctaLabel: "Explore collection",
    href: "/collection?category=books-puzzles",
    placeholderLabel: "rainy day rescue · 4:3",
    surface: "emerald",
  },
  {
    title: "Gifts Under ₹999",
    description: "Great gifts. Easy decisions.",
    ctaLabel: "Shop gifts",
    href: "/collection?price=under-999",
    placeholderLabel: "gifts under 999 · 4:3",
    surface: "magenta",
  },
];
