import type { AccentSurface } from "@/lib/types";

/**
 * Maps an AccentSurface token to its full-bleed card background class.
 * Design System 02 · colour: "one flat saturated colour per card, full-bleed."
 * Never used as a tint/wash — always the whole card surface.
 */
export const SURFACE_BG: Record<AccentSurface, string> = {
  navy: "bg-navy",
  yellow: "bg-accent-yellow",
  emerald: "bg-accent-emerald",
  violet: "bg-accent-violet",
  cobalt: "bg-accent-cobalt",
  red: "bg-accent-red",
  magenta: "bg-accent-magenta",
};

/** Ink colour that stays full-opacity white on every surface except yellow. */
export const SURFACE_INK: Record<AccentSurface, string> = {
  navy: "text-white",
  yellow: "text-navy",
  emerald: "text-white",
  violet: "text-white",
  cobalt: "text-white",
  red: "text-white",
  magenta: "text-white",
};

export const SURFACE_MUTED_INK: Record<AccentSurface, string> = {
  navy: "text-white/70",
  yellow: "text-navy/70",
  emerald: "text-white/80",
  violet: "text-white/80",
  cobalt: "text-white/80",
  red: "text-white/80",
  magenta: "text-white/80",
};
