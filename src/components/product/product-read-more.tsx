"use client";

import { useState } from "react";

export function ProductReadMore({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded && <p className="tn-body mb-2 text-ink-muted">{description}</p>}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="text-sm font-bold text-accent-red underline underline-offset-2"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
