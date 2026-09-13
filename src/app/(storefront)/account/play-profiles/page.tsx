import type { Metadata } from "next";
import { MOCK_PLAY_PROFILES } from "@/lib/data/play-profiles";
import { SURFACE_BG } from "@/lib/surface";

export const metadata: Metadata = {
  title: "Play profiles",
};

export default function PlayProfilesPage() {
  return (
    <div>
      <h2 className="tn-display-m mb-6 text-navy">play profiles</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MOCK_PLAY_PROFILES.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center gap-4 border border-hairline bg-white p-5"
          >
            <span
              className={`flex size-14 shrink-0 items-center justify-center text-lg font-black text-white ${SURFACE_BG[profile.surface]}`}
            >
              {profile.initials}
            </span>
            <div>
              <p className="tn-product-name text-lg text-navy normal-case">
                {profile.name}
              </p>
              <p className="tn-meta">{profile.ageLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
