import type { NavLink } from "@/lib/types";

export const PRIMARY_NAV: NavLink[] = [
  { label: "Shop by age", href: "/collection" },
  { label: "Bestsellers", href: "/collection?sort=bestsellers" },
  { label: "New in", href: "/collection?sort=new" },
  { label: "Gifting", href: "/gifting" },
  { label: "Our story", href: "/our-story" },
];

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
