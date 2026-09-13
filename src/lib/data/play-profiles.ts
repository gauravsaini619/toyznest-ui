import type { AccentSurface } from "@/lib/types";

export interface PlayProfile {
  id: string;
  name: string;
  ageLabel: string;
  initials: string;
  surface: AccentSurface;
}

export const MOCK_PLAY_PROFILES: PlayProfile[] = [
  { id: "pp1", name: "Ananya", ageLabel: "2 years old", initials: "A", surface: "violet" },
  { id: "pp2", name: "Kabir", ageLabel: "9 months old", initials: "K", surface: "cobalt" },
];
