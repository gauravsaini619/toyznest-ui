"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

export function ProductGallery({
  name,
  placeholderLabel,
  photoCount = 4,
}: {
  name: string;
  placeholderLabel: string;
  photoCount?: number;
}) {
  const [active, setActive] = useState(0);
  const photos = Array.from({ length: photoCount }, (_, i) => i);

  return (
    <div className="flex min-w-0 gap-4">
      <div className="flex shrink-0 flex-col gap-3">
        {photos.map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1} of ${name}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`size-[70px] overflow-hidden border-2 transition-colors sm:size-20 ${
              i === active ? "border-navy" : "border-hairline hover:border-navy/40"
            }`}
          >
            <PlaceholderMedia label={`photo ${i + 1}`} />
          </button>
        ))}
      </div>

      <div className="aspect-square min-w-0 flex-1">
        <PlaceholderMedia label={`${placeholderLabel} · photo ${active + 1}`} />
      </div>
    </div>
  );
}
