import type { AgeBand, AgeBandId } from "@/lib/types";

export const AGE_BANDS: AgeBand[] = [
  { id: "0-1y", shortLabel: "0–1", rangeLabel: "0–1 Y", stageName: "Baby beginnings" },
  { id: "1-2y", shortLabel: "1–2", rangeLabel: "1–2 Y", stageName: "Explore & discover" },
  { id: "2-3y", shortLabel: "2–3", rangeLabel: "2–3 Y", stageName: "Imagine & learn" },
  { id: "3-5y", shortLabel: "3–5", rangeLabel: "3–5 Y", stageName: "Create & pretend" },
  { id: "5-7y", shortLabel: "5–7", rangeLabel: "5–7 Y", stageName: "Build & explore" },
  { id: "7-10y", shortLabel: "7–10", rangeLabel: "7–10 Y", stageName: "Challenge & master" },
  { id: "10y-plus", shortLabel: "10+", rangeLabel: "10+ Y", stageName: "Play without limits" },
];

export const SAFE_AGE_LABEL: Record<AgeBandId, string> = {
  "0-1y": "Safe 0-1Y",
  "1-2y": "Safe 1Y+",
  "2-3y": "Safe 2Y+",
  "3-5y": "Safe 3Y+",
  "5-7y": "Safe 5Y+",
  "7-10y": "Safe 7Y+",
  "10y-plus": "Safe 10Y+",
};

export const HERO_AGE_QUICK_PICKS: { label: string; href: string }[] = [
  { label: "0–1", href: "/collection?age=0-1y" },
  { label: "1–2", href: "/collection?age=1-2y" },
  { label: "2–3", href: "/collection?age=2-3y" },
  { label: "3–5", href: "/collection?age=3-5y" },
  { label: "5–7", href: "/collection?age=5-7y" },
  { label: "7–10", href: "/collection?age=7-10y" },
  { label: "10+", href: "/collection?age=10y-plus" },
];
