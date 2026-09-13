import type { FaqItem, LegalInfo, ProductDetailExtra, RelatedTeaser } from "@/lib/types";
import { PRODUCTS } from "@/lib/data/products";

/**
 * PDP-only content keyed by product slug. Static for now — will become a
 * Convex query joined against `products` + `productReviews` once that
 * table is populated.
 */

const PILLARS = ["Stage Matched", "Made To Last", "Non-Toxic & BIS Certified", "Panel Reviewed"];

const LEGAL_INFO: LegalInfo = {
  marketedBy: [
    "Toyznest Retail Pvt. Ltd.",
    "B-42, Sector 63, Ghaziabad, Uttar Pradesh – 201301",
  ],
  manufacturedBy: [
    "Toyznest Retail Pvt. Ltd.",
    "Plot 118, Industrial Area, Ghaziabad, Uttar Pradesh – 201009",
  ],
  complaintsContact: [
    "Customer Care (Grievance Officer): Paras Saini",
    "Registered Office: Toyznest Retail Pvt. Ltd., B-42, Sector 63, Ghaziabad – 201301",
    "Phone: 0120 4567 890",
    "Email: care@toyznest.in",
  ],
};

const GENERIC_FAQ_TAIL: FaqItem[] = [
  {
    question: "How long does delivery take?",
    answer: "Same-day in Delhi/NCR on orders before 2 PM; 2–4 days pan-India.",
  },
  {
    question: "Can I return it?",
    answer: "Yes, within 7 days of delivery if it's unused and in its original packaging.",
  },
];

/** Deterministic 5→1 star split, weighted by the product's aggregate rating. */
function buildDistribution(
  reviewCount: number,
  rating: number
): [number, number, number, number, number] {
  const fiveShare = rating >= 4.85 ? 0.87 : rating >= 4.7 ? 0.8 : rating >= 4.5 ? 0.72 : 0.6;
  const rest = 1 - fiveShare;
  const five = Math.round(reviewCount * fiveShare);
  const four = Math.round(reviewCount * rest * 0.68);
  const three = Math.round(reviewCount * rest * 0.2);
  const two = Math.round(reviewCount * rest * 0.08);
  const one = Math.max(0, reviewCount - five - four - three - two);
  return [five, four, three, two, one];
}

/** Rotates a window of 4 other catalogue products for the "parents also picked" rail. */
function buildRelated(slug: string): RelatedTeaser[] {
  const idx = PRODUCTS.findIndex((p) => p.slug === slug);
  const others = PRODUCTS.filter((p) => p.slug !== slug);
  const start = ((idx < 0 ? 0 : idx) * 3) % others.length;
  const rotated = [...others.slice(start), ...others.slice(0, start)].slice(0, 4);
  return rotated.map((p) => ({
    productId: p.id,
    name: p.name,
    priceInPaise: p.priceInPaise,
    compareAtPriceInPaise: p.compareAtPriceInPaise,
    surface: p.surface,
    href: `/product/${p.slug}`,
  }));
}

interface DetailInput {
  liveViewers: number;
  boughtToday: number;
  colorways?: { label: string; swatchColor: string }[];
  featureRows: ProductDetailExtra["featureRows"];
  reviews: ProductDetailExtra["reviews"];
  specifications: ProductDetailExtra["specifications"];
  customFaqs: FaqItem[];
}

function detail(slug: string, rating: number, reviewCount: number, input: DetailInput): ProductDetailExtra {
  return {
    liveViewers: input.liveViewers,
    boughtToday: input.boughtToday,
    colorways: input.colorways,
    pillars: PILLARS,
    featureRows: input.featureRows,
    reviewDistribution: buildDistribution(reviewCount, rating),
    reviews: input.reviews,
    faqs: [...input.customFaqs, ...GENERIC_FAQ_TAIL],
    specifications: input.specifications,
    legalInfo: LEGAL_INFO,
    related: buildRelated(slug),
  };
}

export const PRODUCT_DETAILS: Record<string, ProductDetailExtra> = {
  "rainbow-stacking-cups": detail("rainbow-stacking-cups", 4.8, 97, {
    liveViewers: 23,
    boughtToday: 12,
    colorways: [
      { label: "natural", swatchColor: "#D8C6A1" },
      { label: "pastel", swatchColor: "#E7CFE0" },
    ],
    featureRows: [
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints, sealed edges and lab-tested components — the level of safety we wanted for our own kids.",
        imageLabel: "child holding the toy",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Built for the stage, not the age on a box.",
        body: "Sized and weighted for 6M+ hands, so it challenges without frustrating.",
        imageLabel: "toy detail shot",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Easy to hold, easy to carry",
        body: "Light in the hand and simple to grip — from the play mat to the car and back.",
        imageLabel: "close-up of the grip",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "PM",
        name: "Priya Menon",
        verified: true,
        title: "Best toy we have bought",
        body: "Sturdier than anything we picked off a marketplace. My 9-month-old goes back to it every single day.",
      },
      {
        initials: "RS",
        name: "Rohan Shetty",
        verified: true,
        title: "Genuinely non-toxic",
        body: "Arrived beautifully packed and there was no paint smell at all. Worth every rupee.",
      },
      {
        initials: "AK",
        name: "Aisha Kaur",
        verified: true,
        title: "Loved the quality",
        body: "Slightly smaller than I imagined from the photos, but perfect for little hands and very well finished.",
      },
    ],
    specifications: {
      dimensions: "18.5cm × 12cm × 12cm",
      material: "FSC rubberwood, water-based non-toxic paint",
      mrpLabel: "₹599",
      inTheBox: "1 × Rainbow Stacking Cups, play guide, cotton storage bag",
      recommendedAge: "6M+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Designed for the 6M+ stage and up — our panel checks stage fit, not just the number on the box.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic paint — no MDF, no plastic.",
      },
      {
        question: "Is it safe for a baby who mouths everything?",
        answer: "Yes. Every cup is lab-tested for lead, phthalates and BPA, with edges sanded smooth for teething.",
      },
    ],
  }),

  "wooden-stacking-rings": detail("wooden-stacking-rings", 4.8, 116, {
    liveViewers: 19,
    boughtToday: 15,
    featureRows: [
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based dyes and sanded edges throughout — safe for a baby who tests everything with their mouth.",
        imageLabel: "baby stacking the rings",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "There's no wrong way to stack",
        body: "Off-order stacking is the point — every wobble is doing the work of steadying little hands.",
        imageLabel: "rings out of order",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "A post that won't tip mid-play",
        body: "A weighted rubberwood base keeps the post upright through enthusiastic stacking and re-stacking.",
        imageLabel: "close-up of the base",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "AS",
        name: "Ananya Sharma",
        verified: true,
        title: "Ananya plays with it every day",
        body: "Six months in and it's still in daily rotation. The finish has held up to a lot of gnawing.",
      },
      {
        initials: "VK",
        name: "Vikram Kapoor",
        verified: true,
        title: "Sturdier than expected",
        body: "Heavier than the plastic version we returned — doesn't slide around on the play mat.",
      },
      {
        initials: "NM",
        name: "Neha Malhotra",
        verified: true,
        title: "Great first gift",
        body: "Bought this for a friend's baby shower and ended up ordering a second one for ours.",
      },
    ],
    specifications: {
      dimensions: "16cm × 16cm × 14cm",
      material: "FSC rubberwood, water-based non-toxic dye",
      mrpLabel: "₹1,299",
      inTheBox: "1 × Wooden Stacking Rings, play guide",
      recommendedAge: "6M+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 6–12 month stage, when grasping and stacking are the main event.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic dye — no MDF, no plastic rings.",
      },
      {
        question: "Is it safe for a baby who mouths everything?",
        answer: "Yes. Every ring is lab-tested for lead, phthalates and BPA, with all edges sanded smooth.",
      },
    ],
  }),

  "sensory-ball-set": detail("sensory-ball-set", 4.7, 84, {
    liveViewers: 14,
    boughtToday: 9,
    colorways: [
      { label: "bright", swatchColor: "#E4B6C2" },
      { label: "earth tones", swatchColor: "#CBB994" },
    ],
    featureRows: [
      {
        heading: "Food-grade silicone, always safe to mouth",
        body: "No hard plastic, no small parts — every ball is soft enough for a newborn's first grasp.",
        imageLabel: "baby holding a ball",
        imageTint: "#E4B6C2",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Six textures, six ways to explore",
        body: "Ridges, bumps and dimples give tiny hands something new to discover in every ball.",
        imageLabel: "texture close-up",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Light enough for a newborn grip",
        body: "Sized and weighted for the 0–6 month reflex grasp, before pincer grip develops.",
        imageLabel: "close-up of the grip",
        imageTint: "#CBB994",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Machine-washable, always",
        body: "Everything that ends up in a mouth ends up on the floor — these go straight in the wash.",
        imageLabel: "balls in a wash bag",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "RD",
        name: "Riya Desai",
        verified: true,
        title: "Lightweight and so easy to grip",
        body: "First toy our newborn could actually hold on her own. Washes up perfectly too.",
      },
      {
        initials: "AJ",
        name: "Arjun Jain",
        verified: true,
        title: "Genuinely soft",
        body: "No hard seams or plastic edges anywhere. Exactly what we wanted for a 4-month-old.",
      },
      {
        initials: "SP",
        name: "Sneha Pillai",
        verified: true,
        title: "Great texture variety",
        body: "She reacts differently to every ball in the set. Worth it just for the sensory range.",
      },
    ],
    specifications: {
      dimensions: "Set of 6, 8cm diameter each",
      material: "Food-grade silicone",
      mrpLabel: "₹1,299",
      inTheBox: "6 × textured sensory balls, mesh storage bag",
      recommendedAge: "0M+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Designed for the 0–6 month stage, when grasp reflex and sensory awareness are just developing.",
      },
      {
        question: "What is it made of?",
        answer: "100% food-grade silicone — no PVC, no phthalates, no hard plastic core.",
      },
      {
        question: "Is it safe for a baby who mouths everything?",
        answer: "Yes — that's what it's built for. Every ball is sized to prevent choking and is fully mouth-safe.",
      },
    ],
  }),

  "montessori-shape-sorter": detail("montessori-shape-sorter", 4.9, 42, {
    liveViewers: 11,
    boughtToday: 6,
    featureRows: [
      {
        heading: "One shape, one slot, no ambiguity",
        body: "Clear cause-and-effect feedback — the piece only goes in one way, which is exactly the point at this stage.",
        imageLabel: "toddler matching a shape",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Chunky pieces, no small parts",
        body: "Sized for a toddler's whole-hand grip, with nothing small enough to be a choking risk.",
        imageLabel: "shape pieces on the mat",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and sealed edges — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of the cube",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "KM",
        name: "Kabir Mehta",
        verified: true,
        title: "Keeps him busy for a solid half hour",
        body: "Genuinely didn't expect a wooden cube to hold his attention this long. Well made too.",
      },
      {
        initials: "PS",
        name: "Pooja Singh",
        verified: true,
        title: "Great first puzzle",
        body: "Simple enough that she can do it alone now, which she's very proud of.",
      },
      {
        initials: "TR",
        name: "Tanvi Rao",
        verified: true,
        title: "Sturdy and well finished",
        body: "No splinters, no rough edges. Survives being thrown across the room, which happens often.",
      },
    ],
    specifications: {
      dimensions: "14cm × 14cm × 14cm",
      material: "FSC rubberwood, water-based non-toxic paint",
      mrpLabel: "₹1,099",
      inTheBox: "1 × Shape Sorter Cube, 5 × shape pieces",
      recommendedAge: "1Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 1–2 year stage, when shape recognition and problem-solving take off.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic paint throughout.",
      },
      {
        question: "Is it safe for a toddler who still mouths things?",
        answer: "Yes. All pieces are lab-tested and sized well above standard choking-hazard limits.",
      },
    ],
  }),

  "magnetic-building-tiles-40pc": detail("magnetic-building-tiles-40pc", 4.9, 203, {
    liveViewers: 31,
    boughtToday: 22,
    colorways: [
      { label: "classic 8-colour", swatchColor: "#1F5FE0" },
      { label: "pastel 8-colour", swatchColor: "#E7CFE0" },
    ],
    featureRows: [
      {
        heading: "Better than any screen — she builds for hours",
        body: "No single right build. Forty tiles mean a tower today, a fort tomorrow, and a spaceship after that.",
        imageLabel: "child building a tower",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Strong enough to hold its shape",
        body: "High-grade magnets click firmly into place, so builds survive being carried across the room.",
        imageLabel: "magnetic edge detail",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "BPA-free ABS plastic with fully enclosed magnets — nothing that can be pried loose or swallowed.",
        imageLabel: "close-up of a tile",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Built for two kids to build together",
        body: "Forty pieces is enough for a sibling or a friend to join in without anyone waiting their turn.",
        imageLabel: "two children building",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "ZK",
        name: "Zoya Khan",
        verified: true,
        title: "Better than any screen",
        body: "She builds for hours with these. Best purchase we've made for her in a long time.",
      },
      {
        initials: "AB",
        name: "Aditya Bose",
        verified: true,
        title: "Strong magnets, great quality",
        body: "The magnets are noticeably stronger than a cheaper set we tried first. Worth the difference.",
      },
      {
        initials: "MI",
        name: "Meera Iyer",
        verified: true,
        title: "40 pieces is genuinely enough",
        body: "Two kids build side by side without fighting over pieces. Storage box is a nice touch too.",
      },
    ],
    specifications: {
      dimensions: "Set of 40, 5cm–10cm per tile",
      material: "BPA-free ABS plastic, enclosed ferrite magnets",
      mrpLabel: "₹2,249",
      inTheBox: "40 × magnetic tiles, storage box, idea booklet",
      recommendedAge: "3Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 3–5 year stage and up — older kids get just as much out of the open-ended building.",
      },
      {
        question: "What is it made of?",
        answer: "BPA-free ABS plastic with fully enclosed, high-grade ferrite magnets.",
      },
      {
        question: "Can the magnets come loose?",
        answer: "No — each magnet is heat-sealed inside its tile and tested to survive normal drops and play.",
      },
    ],
  }),

  "wooden-pull-along-duck": detail("wooden-pull-along-duck", 4.6, 61, {
    liveViewers: 8,
    boughtToday: 5,
    featureRows: [
      {
        heading: "A reason to take one more lap",
        body: "The duck's head bobs and feet flap as it follows along — new walkers love the feedback.",
        imageLabel: "toddler pulling the duck",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "A cord length made for new walkers",
        body: "Short enough to stay in step, long enough not to tangle underfoot.",
        imageLabel: "cord and handle detail",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and sealed edges — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of the duck",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "IS",
        name: "Ishaan Sethi",
        verified: true,
        title: "Great for new walkers",
        body: "Our son pulls this around the whole flat now. The wobbling head keeps him laughing.",
      },
      {
        initials: "LF",
        name: "Lavanya Fernandes",
        verified: true,
        title: "Sturdy little thing",
        body: "Survived being dragged down our stairs more times than I'd like to admit.",
      },
      {
        initials: "DC",
        name: "Dev Chauhan",
        verified: true,
        title: "Cute and well made",
        body: "The paint job is genuinely nice, not the patchy kind you sometimes get with wooden toys.",
      },
    ],
    specifications: {
      dimensions: "20cm × 10cm × 15cm",
      material: "FSC rubberwood, water-based non-toxic paint",
      mrpLabel: "₹549",
      inTheBox: "1 × Wooden Pull-Along Duck with cord handle",
      recommendedAge: "1Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 1–2 year stage, right as first steps turn into confident walking.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic paint.",
      },
      {
        question: "Is the cord safe?",
        answer: "The cord is a fixed, short length designed to meet pull-toy safety standards — always supervise play.",
      },
    ],
  }),

  "busy-board-toddler": detail("busy-board-toddler", 4.8, 97, {
    liveViewers: 17,
    boughtToday: 11,
    featureRows: [
      {
        heading: "Every switch and latch he could ask for",
        body: "Eight real, working fixtures — the same ones that make household objects irresistible.",
        imageLabel: "toddler flipping a switch",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Built to hang or sit flat",
        body: "A back panel for wall-mounting, or lay it flat on the floor — whichever suits the space.",
        imageLabel: "board mounted on a wall",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and rounded corners throughout — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of the latches",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC plywood base and hardwood fixtures, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "AA",
        name: "Aarav Anand",
        verified: true,
        title: "Every switch and latch he could ask for",
        body: "He stopped trying to open our actual cabinets once this arrived. Worth every rupee for that alone.",
      },
      {
        initials: "SG",
        name: "Simran Gill",
        verified: true,
        title: "Fixtures feel genuinely sturdy",
        body: "A year in and nothing has come loose despite daily, enthusiastic use.",
      },
      {
        initials: "HV",
        name: "Harsh Varma",
        verified: true,
        title: "Great for travel too",
        body: "Light enough to bring to the grandparents' place. Keeps him occupied on long visits.",
      },
    ],
    specifications: {
      dimensions: "30cm × 30cm × 3cm",
      material: "FSC plywood, hardwood fixtures, non-toxic paint",
      mrpLabel: "₹1,599",
      inTheBox: "1 × Busy Board, wall-mount hardware",
      recommendedAge: "1Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 1–2 year stage, when cause-and-effect exploration is at its peak.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified plywood base with hardwood fixtures and water-based, non-toxic paint.",
      },
      {
        question: "Are the switches actually functional?",
        answer: "Yes — every latch, switch and dial genuinely moves and clicks, which is the whole appeal.",
      },
    ],
  }),

  "wooden-animal-puzzle-set": detail("wooden-animal-puzzle-set", 4.7, 58, {
    liveViewers: 9,
    boughtToday: 4,
    featureRows: [
      {
        heading: "One animal, one board, no frustration",
        body: "Simple enough to finish alone, satisfying enough to do again — a toddler-paced first puzzle.",
        imageLabel: "toddler placing a piece",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Chunky knobs for small fingers",
        body: "Each piece has a rounded knob sized for a toddler grip still learning precision.",
        imageLabel: "close-up of a knob",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and sanded edges — the level of safety we wanted for our own kids.",
        imageLabel: "puzzle boards stacked",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "NR",
        name: "Nikhil Rana",
        verified: true,
        title: "Great starter puzzle",
        body: "Six boards is the right number — not overwhelming, but enough to keep her interested.",
      },
      {
        initials: "KJ",
        name: "Kavya Joshi",
        verified: true,
        title: "Well finished, no splinters",
        body: "Every edge is properly sanded. Can tell this is better made than the last set we had.",
      },
      {
        initials: "OP",
        name: "Om Prakash",
        verified: true,
        title: "She's proud she can do it alone",
        body: "Simple enough for independent play, which was exactly what we were looking for.",
      },
    ],
    specifications: {
      dimensions: "6 boards, 20cm × 15cm each",
      material: "FSC rubberwood, water-based non-toxic paint",
      mrpLabel: "₹749",
      inTheBox: "6 × animal puzzle boards, storage tray",
      recommendedAge: "2Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 2–3 year stage, when shape and picture matching become a favourite activity.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic paint throughout.",
      },
      {
        question: "How many puzzle boards are included?",
        answer: "Six boards, each with a single animal piece — a lion, elephant, giraffe and three more.",
      },
    ],
  }),

  "balance-bike-14-inch": detail("balance-bike-14-inch", 4.9, 152, {
    liveViewers: 26,
    boughtToday: 18,
    colorways: [
      { label: "sky blue", swatchColor: "#A9C6E3" },
      { label: "coral", swatchColor: "#E4A995" },
    ],
    featureRows: [
      {
        heading: "Riding without stabilisers in a week",
        body: "No pedals means balance comes first — the skill that makes the jump to a pedal bike so much smaller.",
        imageLabel: "child riding the bike",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "An adjustable seat that keeps up",
        body: "Grows with them across the 3–5 year stage instead of being outgrown in a season.",
        imageLabel: "seat height adjustment",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Lightweight steel, built for real use",
        body: "Light enough for a preschooler to lift, sturdy enough for daily outdoor riding.",
        imageLabel: "close-up of the frame",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Puncture-proof tyres, zero maintenance",
        body: "Foam-filled tyres mean no pumping, no flats — just take it outside and go.",
        imageLabel: "close-up of the tyre",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "VJ",
        name: "Vivaan Joshi",
        verified: true,
        title: "Riding without stabilisers in a week",
        body: "Genuinely surprised how fast he picked up balance. Straight onto a pedal bike a month later.",
      },
      {
        initials: "RN",
        name: "Riya Nair",
        verified: true,
        title: "Great build quality",
        body: "Frame feels properly solid, not the flimsy kind you see at half the price.",
      },
      {
        initials: "SK",
        name: "Saanvi Kulkarni",
        verified: true,
        title: "Seat adjusts easily",
        body: "We've moved the seat up twice already as she's grown. Nice that it's not a one-size deal.",
      },
    ],
    specifications: {
      dimensions: "14-inch wheels, adjustable seat 33–41cm",
      material: "Powder-coated steel frame, foam-filled tyres",
      mrpLabel: "₹4,199",
      inTheBox: "1 × Balance Bike, tool kit, assembly guide",
      recommendedAge: "3Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 3–5 year stage, before or instead of stabiliser-fitted pedal bikes.",
      },
      {
        question: "What is it made of?",
        answer: "Powder-coated steel frame with foam-filled, puncture-proof tyres.",
      },
      {
        question: "Does it need to be assembled?",
        answer: "Minimal assembly — the seat and handlebar height, with a tool kit and guide included.",
      },
    ],
  }),

  "first-words-picture-blocks": detail("first-words-picture-blocks", 4.6, 29, {
    liveViewers: 6,
    boughtToday: 3,
    featureRows: [
      {
        heading: "A block for every first word",
        body: "Twelve blocks pairing a picture with its word — cat, ball, sun — made for pointing and naming out loud.",
        imageLabel: "baby holding a block",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Rounded edges, sized for small hands",
        body: "Comfortable to hold and safe to mouth, at exactly the stage that matters most.",
        imageLabel: "close-up of the edges",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and lab-tested inks — the level of safety we wanted for our own kids.",
        imageLabel: "blocks lined up",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Solid wood that survives siblings",
        body: "FSC rubberwood and proper joinery, so it gets handed down instead of thrown out.",
        imageLabel: "wood grain detail",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "MB",
        name: "Myra Bhatt",
        verified: true,
        title: "Great for reading time",
        body: "We go through the whole set every evening. She's started naming a few pictures herself.",
      },
      {
        initials: "AT",
        name: "Aryan Thakur",
        verified: true,
        title: "Nice and chunky",
        body: "Easy for him to hold and stack, even before he cared about the words on them.",
      },
      {
        initials: "IB",
        name: "Ira Bajaj",
        verified: true,
        title: "Well printed, no fading",
        body: "The pictures are still crisp after months of handling and the occasional wash wipe.",
      },
    ],
    specifications: {
      dimensions: "Set of 12, 5cm cubes",
      material: "FSC rubberwood, water-based non-toxic ink",
      mrpLabel: "₹499",
      inTheBox: "12 × picture-word blocks, cotton pouch",
      recommendedAge: "6M+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 6–12 month stage, right as first words and picture recognition begin.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood with water-based, non-toxic printing ink.",
      },
      {
        question: "Is it safe for a baby who mouths everything?",
        answer: "Yes. Every block is lab-tested for lead, phthalates and BPA, with all edges sanded smooth.",
      },
    ],
  }),

  "outdoor-explorer-kit": detail("outdoor-explorer-kit", 4.7, 44, {
    liveViewers: 10,
    boughtToday: 5,
    featureRows: [
      {
        heading: "Everything for a garden expedition",
        body: "A field bag, binoculars and a bug jar — built for actual outdoor use, not a shelf.",
        imageLabel: "child exploring outdoors",
        imageTint: "#C9D4B4",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Hardware that survives mud",
        body: "Weatherproof materials throughout, made to be dropped, rinsed and used again the next day.",
        imageLabel: "bag and binoculars detail",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "BPA-free plastics and non-toxic dyes — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of the bug jar",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Built for gross motor confidence",
        body: "Encourages climbing, crouching and reaching — the movement kids this age are hungry for.",
        imageLabel: "child climbing",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "YM",
        name: "Yash Malhotra",
        verified: true,
        title: "Genuinely gets used outdoors",
        body: "Not one of those kits that looks nice and gets ignored. He takes it to the park every weekend.",
      },
      {
        initials: "AC",
        name: "Anika Chopra",
        verified: true,
        title: "Well made for the price",
        body: "The bag straps and bug jar lid are sturdier than I expected. Survived a full monsoon season.",
      },
      {
        initials: "RB",
        name: "Rohit Bhatia",
        verified: true,
        title: "Great for siblings to share",
        body: "Both our kids fight over the binoculars, which is a good sign I suppose.",
      },
    ],
    specifications: {
      dimensions: "Field bag 25cm × 20cm, binoculars 12cm",
      material: "BPA-free plastic, weatherproof canvas bag",
      mrpLabel: "₹1,499",
      inTheBox: "Field bag, binoculars, bug jar, magnifier",
      recommendedAge: "5Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 5–7 year stage, when outdoor exploration and independent play take off.",
      },
      {
        question: "What is it made of?",
        answer: "BPA-free plastic components with a weatherproof canvas field bag.",
      },
      {
        question: "Is it actually durable outdoors?",
        answer: "Yes — every piece is tested for outdoor use, including drops and light rain.",
      },
    ],
  }),

  "counting-and-sorting-bears": detail("counting-and-sorting-bears", 4.8, 73, {
    liveViewers: 13,
    boughtToday: 7,
    featureRows: [
      {
        heading: "A preschool math corner, at home",
        body: "Sixty bears, four bowls and a die — counting, sorting and pattern-making disguised as play.",
        imageLabel: "child sorting bears",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Six colours for early sorting",
        body: "Bright, consistent colours make matching and grouping an easy first math concept.",
        imageLabel: "bears in sorting bowls",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "BPA-free plastic and rounded edges — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of a bear",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "A tray that keeps it all together",
        body: "Everything nests back into one tray, so clean-up is part of the activity too.",
        imageLabel: "storage tray",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "DS",
        name: "Diya Srinivasan",
        verified: true,
        title: "Great for early counting",
        body: "Her teacher recommended something like this and it's been in daily use since it arrived.",
      },
      {
        initials: "KP",
        name: "Karan Pandey",
        verified: true,
        title: "Sixty bears is plenty",
        body: "More than enough for actual counting games, not just a handful to fiddle with.",
      },
      {
        initials: "SM",
        name: "Shreya Mishra",
        verified: true,
        title: "Colours stayed bright",
        body: "No fading after regular washing, which surprised me given the price.",
      },
    ],
    specifications: {
      dimensions: "60 bears (2.5cm), 4 bowls, 1 die",
      material: "BPA-free plastic",
      mrpLabel: "₹899",
      inTheBox: "60 × counting bears, 4 × bowls, 1 × die, storage tray",
      recommendedAge: "2Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 2–3 year stage, when counting, sorting and colour recognition begin.",
      },
      {
        question: "What is it made of?",
        answer: "BPA-free plastic throughout, with rounded, choke-tested edges.",
      },
      {
        question: "Is it safe for a toddler who still mouths things?",
        answer: "The bears are sized above standard choking-hazard limits, but supervision is still recommended.",
      },
    ],
  }),

  "wooden-play-kitchen": detail("wooden-play-kitchen", 4.9, 118, {
    liveViewers: 28,
    boughtToday: 16,
    colorways: [
      { label: "natural wood", swatchColor: "#D8C6A1" },
      { label: "white", swatchColor: "#F0ECE4" },
    ],
    featureRows: [
      {
        heading: "Worth every rupee — she cooks every morning",
        body: "A full-height kitchen with a spinning hob, fold-down oven and a sink for years of pretend breakfasts.",
        imageLabel: "child playing in the kitchen",
        imageTint: "#A9C6E3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Real-feeling details throughout",
        body: "Working knobs, a spinning hob and a fold-down oven door — nothing feels like a flat prop.",
        imageLabel: "close-up of the hob knobs",
        imageTint: "#E5DCC3",
        imageSide: "right",
        textSurface: "cream",
      },
      {
        heading: "Non-toxic materials for utmost safety",
        body: "Water-based paints and sanded edges throughout — the level of safety we wanted for our own kids.",
        imageLabel: "close-up of the sink",
        imageTint: "#E5DCC3",
        imageSide: "left",
        textSurface: "navy",
      },
      {
        heading: "Built for social-emotional play",
        body: "Pretend cooking is some of the richest imaginative and social play a preschooler gets.",
        imageLabel: "two children playing together",
        imageTint: "#C9D4B4",
        imageSide: "right",
        textSurface: "cream",
      },
    ],
    reviews: [
      {
        initials: "MK",
        name: "Myra Kaur",
        verified: true,
        title: "Worth every rupee",
        body: "She 'cooks' every single morning now. The build quality is genuinely furniture-grade.",
      },
      {
        initials: "RA",
        name: "Rajat Agarwal",
        verified: true,
        title: "Assembly was easy",
        body: "Took about 40 minutes with the included tools. Feels solid once it's together.",
      },
      {
        initials: "PN",
        name: "Prisha Nambiar",
        verified: true,
        title: "Beautiful finish",
        body: "Looks good enough to leave in the living room, not just the playroom.",
      },
    ],
    specifications: {
      dimensions: "60cm × 30cm × 90cm",
      material: "FSC rubberwood and MDF, water-based non-toxic paint",
      mrpLabel: "₹5,499",
      inTheBox: "1 × Play Kitchen (flat-packed), assembly tools, play guide",
      recommendedAge: "3Y+ and up",
      countryOfOrigin: "India",
    },
    customFaqs: [
      {
        question: "What's the age range and who is it for?",
        answer: "Built for the 3–5 year stage, when pretend and social play become central to how kids learn.",
      },
      {
        question: "What is it made of?",
        answer: "FSC-certified rubberwood and MDF with water-based, non-toxic paint.",
      },
      {
        question: "Does it need to be assembled?",
        answer: "Yes — it ships flat-packed with all tools and a step-by-step guide included, about 40 minutes to build.",
      },
    ],
  }),
};
