import type { AgeBand, AgeBandId } from "@/lib/types";

/**
 * The ten-tab age strip used on the homepage age-quick-picks and (in a
 * fuller, docked form) on the Collection page. Static for now — will become
 * `await fetchQuery(api.ageBands.list)` once Convex is wired up.
 */
export const AGE_BANDS: AgeBand[] = [
  { id: "0-6m", shortLabel: "0–1", rangeLabel: "0–6 M", stageName: "Newborn" },
  { id: "6-12m", shortLabel: "0–1", rangeLabel: "6–12 M", stageName: "Explorer" },
  { id: "1-2y", shortLabel: "1–2", rangeLabel: "1–2 Y", stageName: "Toddler" },
  { id: "2-3y", shortLabel: "2–3", rangeLabel: "2–3 Y", stageName: "Preschool" },
  { id: "3-5y", shortLabel: "3–5", rangeLabel: "3–5 Y", stageName: "Kindergarten" },
  { id: "5-7y", shortLabel: "5–7", rangeLabel: "5–7 Y", stageName: "Early grade" },
  { id: "7y-plus", shortLabel: "7+", rangeLabel: "6+ Y", stageName: "Grade schooler" },
];

/** "Safe {N}+" chip label shown on product cards, derived from the age band's lower bound. */
export const SAFE_AGE_LABEL: Record<AgeBandId, string> = {
  "0-6m": "Safe 0M+",
  "6-12m": "Safe 6M+",
  "1-2y": "Safe 12M+",
  "2-3y": "Safe 24M+",
  "3-5y": "Safe 3Y+",
  "5-7y": "Safe 5Y+",
  "7y-plus": "Safe 7Y+",
};

/** The six quick-pick circles shown inline in the homepage hero. */
export const HERO_AGE_QUICK_PICKS: { label: string; href: string }[] = [
  { label: "–1", href: "/collection?age=0-1" },
  { label: "1–2", href: "/collection?age=1-2" },
  { label: "2–3", href: "/collection?age=2-3" },
  { label: "3–5", href: "/collection?age=3-5" },
  { label: "5–7", href: "/collection?age=5-7" },
  { label: "7+", href: "/collection?age=7-plus" },
];
