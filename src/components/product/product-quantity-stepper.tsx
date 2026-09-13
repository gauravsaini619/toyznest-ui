"use client";

import { Minus, Plus } from "lucide-react";

export function ProductQuantityStepper({
  quantity,
  onChange,
  max = 10,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex size-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-navy disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="tn-price w-6 text-center text-xl text-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex size-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-navy disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
