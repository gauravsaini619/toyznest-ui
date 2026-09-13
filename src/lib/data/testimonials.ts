import type { Testimonial, Marketplace } from "@/lib/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Priya Sharma",
    location: "New Delhi",
    childAge: "mom of a 2-year-old",
    quote:
      "The stage-based recommendations actually work — every box has been exactly what Ananya needed that month.",
  },
  {
    id: "t2",
    author: "Rohan Mehta",
    location: "Gurugram",
    childAge: "dad of an 8-month-old",
    quote:
      "Same-day delivery saved a birthday twice. Packaging is sturdy enough to gift straight out of the box.",
  },
  {
    id: "t3",
    author: "Fatima Khan",
    location: "Noida",
    childAge: "mom of twins, age 4",
    quote:
      "I stopped guessing what to buy. The skill tags tell me exactly what each toy is building.",
  },
  {
    id: "t4",
    author: "Karan Verma",
    location: "New Delhi",
    childAge: "dad of a 5-year-old",
    quote:
      "Returned one toy that didn't land well — refund was in my account in two days, no back and forth.",
  },
];

/**
 * Only Amazon Now ships with a real logo asset (`public/images/logo-amazon-now.png`,
 * supplied in `assets/`). The rest render as text wordmarks (see
 * MarketplaceStrip's fallback) rather than fabricated logo art — drop real
 * files into `public/images/` and add a matching `logoSrc` here to upgrade
 * any of them.
 */
export const MARKETPLACES: Marketplace[] = [
  { id: "m1", name: "Amazon Now", href: "#", logoSrc: "/images/logo-amazon-now.png" },
  { id: "m2", name: "Amazon", href: "#" },
  { id: "m3", name: "Flipkart", href: "#" },
  { id: "m4", name: "Meesho", href: "#" },
  { id: "m5", name: "Swiggy Instamart", href: "#" },
  { id: "m6", name: "Zepto", href: "#" },
];
