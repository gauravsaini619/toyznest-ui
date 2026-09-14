import type { NavLink } from "@/lib/types";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { CATEGORIES } from "@/lib/data/categories";

export const PRIMARY_NAV: NavLink[] = [
  { label: "Shop", href: "/collection" },
  { label: "Age", href: "/collection" },
  { label: "Play", href: "/collection" },
  { label: "Learn", href: "/collection" },
  { label: "Gifts", href: "/gifting" },
  { label: "New & Trending", href: "/collection?sort=new" },
  { label: "Bestsellers", href: "/collection?sort=bestsellers" },
];

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
}

export const GIFT_OCCASIONS: NavLink[] = [
  { label: "Birthday gifts", href: "/gifting?occasion=birthday" },
  { label: "New baby gifts", href: "/gifting?occasion=new-baby" },
  { label: "Gifts under ₹999", href: "/gifting?occasion=under-999" },
];

/** Nav labels with a hover/focus mega-menu (see `MegaMenu` in site-header.tsx). Any `PRIMARY_NAV` label without a key here renders as a plain link. */
export const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  Shop: {
    columns: [
      {
        heading: "Toys",
        links: [
          ...CATEGORIES.map((c) => ({ label: c.name, href: c.href })),
          { label: "Cars & Vehicles", href: "/collection?q=car,truck,train,vehicle,rc" },
          { label: "Musical Toys", href: "/collection?q=musical,piano,xylophone,drum" },
          { label: "Plush Toys", href: "/collection?q=plush,soft toy,teddy,cuddle" },
          { label: "Electronic & Interactive", href: "/collection?q=electronic,robot,interactive,remote" },
        ],
      },
      {
        heading: "Popular",
        links: [
          { label: "New Arrivals", href: "/collection?sort=new" },
          { label: "Bestsellers", href: "/collection?sort=bestsellers" },
          {
            label: "Trending Now",
            href: "/collection?q=magic flying orb,rc car,dancing monkey,robot,glow ball,musical elephant,projector painting,building block",
          },
          { label: "Under ₹499", href: "/collection?price=under-499" },
          { label: "Under ₹999", href: "/collection?price=under-999" },
          { label: "Premium Toys", href: "/collection?sort=price-desc" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { label: "Shop by Age", href: "/collection" },
          { label: "Shop by Development", href: "/collection" },
          { label: "Shop by Interest", href: "/collection" },
          { label: "Gift Finder", href: "/gifting" },
        ],
      },
    ],
  },
  Age: {
    columns: [
      {
        heading: "Shop by Age",
        links: AGE_BANDS.map((b) => ({
          label: `${b.shortLabel} · ${b.stageName}`,
          href: `/collection?age=${b.id}`,
        })),
      },
    ],
  },
  Play: {
    columns: [
      {
        heading: "Shop Their World",
        links: [
          { label: "Little Racers", href: "/collection?q=car,truck,train,vehicle,rc" },
          { label: "Little Builders", href: "/collection?category=building-stem" },
          { label: "Little Creators", href: "/collection?skill=Creativity" },
          { label: "Little Thinkers", href: "/collection?category=books-puzzles" },
          { label: "Little Pretenders", href: "/collection?category=pretend-play" },
          { label: "Little Explorers", href: "/collection?category=outdoor-active" },
          { label: "Little Musicians", href: "/collection?q=musical,piano,xylophone,drum" },
          { label: "Baby's First Toys", href: "/collection?category=baby-sensory" },
          { label: "Cuddle Corner", href: "/collection?q=plush,soft toy,teddy,cuddle" },
        ],
      },
    ],
  },
  Learn: {
    columns: [
      {
        heading: "Shop by Development",
        links: [
          { label: "Fine Motor", href: "/collection?skill=Fine motor" },
          { label: "Problem Solving", href: "/collection?skill=Cognitive" },
          { label: "Creativity", href: "/collection?skill=Creativity" },
          { label: "STEM", href: "/collection?category=building-stem" },
          { label: "Imagination", href: "/collection?category=pretend-play" },
          { label: "Active Play", href: "/collection?skill=Gross motor" },
        ],
      },
    ],
  },
  Gifts: {
    columns: [{ heading: "Gifting", links: GIFT_OCCASIONS }],
  },
};

export const TICKER_MESSAGES: string[] = [
  "Free shipping over ₹699",
  "Extra 10% off first order — code NEST10",
  "Free gift wrap on every kit",
  "Bundle & save — kits from ₹999",
  "Free same-day delivery in Delhi/NCR on orders above ₹1,200",
];

export const FOOTER_LINK_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop by age", href: "/collection" },
      { label: "Shop by skill", href: "/collection?view=skill" },
      { label: "Bestsellers", href: "/collection?sort=bestsellers" },
      { label: "New arrivals", href: "/collection?sort=new" },
      { label: "Gift kits", href: "/gifting" },
      { label: "Sale", href: "/collection?sort=sale" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "Safety promise", href: "/safety" },
      { label: "Expert panel", href: "/our-story#panel" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track your order", href: "/account/orders" },
      { label: "Shipping & delivery", href: "/shipping" },
      { label: "Returns & refunds", href: "/returns" },
      { label: "Size & age guide", href: "/size-guide" },
      { label: "Bulk & corporate", href: "/bulk-orders" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export const FOOTER_PROMISE_ITEMS: {
  icon: "shield" | "leaf" | "truck" | "returns";
  title: string;
  description: string;
}[] = [
  {
    icon: "shield",
    title: "BIS certified",
    description: "Lab-tested, every batch",
  },
  {
    icon: "leaf",
    title: "100% non-toxic",
    description: "Water-based finishes only",
  },
  {
    icon: "truck",
    title: "Same-day in Delhi/NCR",
    description: "On orders above ₹1,200",
  },
  {
    icon: "returns",
    title: "Easy 7-day returns",
    description: "We collect from your door",
  },
];

export const FOOTER_CONTACT = {
  email: "hello@toyznest.in",
  whatsapp: "+91 98765 43210",
  location: "Jovian Homes, NH-24, Ghaziabad",
};
