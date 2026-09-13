"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "cn";

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "floating",
}: {
  productId: string;
  productName: string;
  className?: string;
  /** "floating" = circular icon button (product cards). "inline" = icon + label. */
  variant?: "floating" | "inline";
}) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(productId);
        }}
        aria-pressed={active}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-bold transition-colors",
          active ? "text-accent-red" : "text-ink-muted hover:text-ink",
          className
        )}
      >
        <Heart className={cn("size-4", active && "fill-current")} aria-hidden />
        {active ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={
        active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`
      }
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-white/90 text-navy transition-colors hover:bg-white",
        className
      )}
    >
      <Heart
        className={cn("size-4", active && "fill-accent-red text-accent-red")}
        aria-hidden
      />
    </button>
  );
}
