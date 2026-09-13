"use client";

import { useState } from "react";
import type { Colorway } from "@/lib/types";
import { toTitleCase } from "@/lib/format";

export function ProductColorways({ colorways }: { colorways: Colorway[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <p className="text-sm font-bold text-ink">
        Colour: {toTitleCase(colorways[active].label)}
      </p>
      <div className="mt-2.5 flex gap-3">
        {colorways.map((colorway, i) => (
          <button
            key={colorway.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`Select ${colorway.label} colourway`}
            className={`flex size-16 items-center justify-center border-2 text-xs font-semibold text-ink/60 transition-colors ${
              i === active ? "border-navy" : "border-transparent hover:border-hairline"
            }`}
            style={{ backgroundColor: colorway.swatchColor }}
          >
            {colorway.label}
          </button>
        ))}
      </div>
    </div>
  );
}
