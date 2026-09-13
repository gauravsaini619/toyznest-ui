import type { PlayKit } from "@/lib/types";

/** Bundle & save — "kits from ₹999" (ticker), shown in the play-kit chooser. */
export const PLAY_KITS: PlayKit[] = [
  {
    id: "k1",
    name: "newborn sensory kit",
    description: "High-contrast, crinkle & grip toys for the first six months.",
    itemCount: 3,
    priceInPaise: 99900,
    surface: "violet",
    placeholderLabel: "newborn kit · 1:1",
  },
  {
    id: "k2",
    name: "toddler fine-motor kit",
    description: "Stacking, sorting and busy-board picks for 1–3 years.",
    itemCount: 3,
    priceInPaise: 149900,
    surface: "cobalt",
    placeholderLabel: "toddler kit · 1:1",
  },
  {
    id: "k3",
    name: "preschool builder kit",
    description: "Magnetic tiles, blocks and puzzles for 3–5 years.",
    itemCount: 3,
    priceInPaise: 199900,
    surface: "emerald",
    placeholderLabel: "builder kit · 1:1",
  },
  {
    id: "k4",
    name: "outdoor explorer kit",
    description: "Balance, catch and climb picks for 5–7 years.",
    itemCount: 3,
    priceInPaise: 179900,
    surface: "magenta",
    placeholderLabel: "explorer kit · 1:1",
  },
];
