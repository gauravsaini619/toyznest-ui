/**
 * Shared domain types for the storefront.
 *
 * Shaped to match what Convex documents will look like once the schema in
 * `convex/schema.ts` is deployed — string `id`, no client-only fields — so
 * swapping a static `data/*.ts` list for a `useQuery(api...)` call later is
 * a one-line change in the section component, not a type rewrite.
 */

export type AgeBandId =
  | "0-6m"
  | "6-12m"
  | "1-2y"
  | "2-3y"
  | "3-5y"
  | "5-7y"
  | "7y-plus";

export interface AgeBand {
  id: AgeBandId;
  shortLabel: string;
  rangeLabel: string;
  stageName: string;
}

export type AccentSurface =
  | "navy"
  | "yellow"
  | "emerald"
  | "violet"
  | "cobalt"
  | "red"
  | "magenta";

export type SkillTag =
  | "Fine motor"
  | "Gross motor"
  | "Cognitive"
  | "Sensory"
  | "Language"
  | "Social-emotional"
  | "Creativity";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  href: string;
  surface: AccentSurface;
  span: "hero" | "tall" | "medium" | "wide";
  placeholderLabel: string;
}

export interface ProductReviewQuote {
  author: string;
  quote: string;
}

export type CategorySlug =
  | "wooden-toys"
  | "baby-sensory"
  | "building-stem"
  | "pretend-play"
  | "outdoor-active"
  | "books-puzzles";

export interface Product {
  id: string;
  slug: string;
  name: string;
  ageBand: AgeBandId;
  categorySlug: CategorySlug;
  skills: SkillTag[];
  priceInPaise: number;
  compareAtPriceInPaise?: number;
  surface: AccentSurface;
  badge?: "BESTSELLER" | "50% OFF" | "NEW";
  rating: number;
  reviewCount: number;
  reviewQuote?: ProductReviewQuote;
  placeholderLabel: string;
  /** PDP bullet list. Falls back to a skills-derived list when omitted. */
  features?: string[];
  /** Longer PDP copy, revealed behind "Read more". */
  description?: string;
  /** Number of gallery thumbnails to render on the PDP. */
  photoCount?: number;
}

export interface PlayKit {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  priceInPaise: number;
  surface: AccentSurface;
  placeholderLabel: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  childAge: string;
  quote: string;
}

export interface Marketplace {
  id: string;
  name: string;
  href: string;
  logoSrc?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type OrderStatus = "out_for_delivery" | "delivered" | "cancelled";

export interface OrderItem {
  name: string;
  surface: AccentSurface;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  totalInPaise: number;
  items: OrderItem[];
  /** Label for the order's secondary (outlined) action — varies per order, not just status. */
  secondaryAction: string;
}

/**
 * PDP-only content, kept out of the base `Product` type so listing cards
 * (homepage rails, wishlist, related-product teasers) stay lean. Keyed by
 * product slug in `src/lib/data/product-details.ts`.
 */
export interface Colorway {
  label: string;
  swatchColor: string;
}

export interface ProductSpecifications {
  dimensions: string;
  material: string;
  mrpLabel: string;
  inTheBox: string;
  recommendedAge: string;
  countryOfOrigin: string;
}

export interface LegalInfo {
  marketedBy: string[];
  manufacturedBy: string[];
  complaintsContact: string[];
}

export interface ProductReview {
  initials: string;
  name: string;
  verified: boolean;
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureRow {
  heading: string;
  body: string;
  imageLabel: string;
  imageTint: string;
  imageSide: "left" | "right";
  textSurface: "navy" | "cream";
}

export interface RelatedTeaser {
  /** Present only when this teaser maps to a real catalog product (enables wishlist toggling). */
  productId?: string;
  name: string;
  priceInPaise: number;
  compareAtPriceInPaise?: number;
  surface: AccentSurface;
  href: string;
}

export interface ProductDetailExtra {
  liveViewers: number;
  boughtToday: number;
  colorways?: Colorway[];
  pillars: string[];
  featureRows: FeatureRow[];
  reviewDistribution: [number, number, number, number, number];
  reviews: ProductReview[];
  faqs: FaqItem[];
  specifications: ProductSpecifications;
  legalInfo: LegalInfo;
  related: RelatedTeaser[];
}
