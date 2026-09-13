export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subcopy: string;
  placeholderLabel: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "s1",
    eyebrow: "Play. Learn. Grow.",
    headline: "Big adventures start",
    headlineAccent: "with little toys.",
    subcopy:
      "Thoughtfully picked toys for curious little minds — designed for play, learning and plenty of imagination.",
    placeholderLabel: "toddler stacking wooden blocks · 4:3",
  },
  {
    id: "s2",
    eyebrow: "New this month",
    headline: "Every toy, matched",
    headlineAccent: "to their stage.",
    subcopy:
      "From first grasp to first bike ride — a catalogue organised by developmental stage, not just age on the box.",
    placeholderLabel: "child riding a balance bike · 4:3",
  },
  {
    id: "s3",
    eyebrow: "Bundle & save",
    headline: "Curated kits,",
    headlineAccent: "one easy box.",
    subcopy:
      "Three hand-picked toys for their exact stage, gift-wrapped and delivered — kits start from ₹999.",
    placeholderLabel: "preschooler with magnetic building tiles · 4:3",
  },
];
