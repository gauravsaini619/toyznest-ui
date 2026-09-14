"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { PRODUCTS } from "@/lib/data/products";
import { DRAFT_PRODUCTS } from "@/lib/data/draft-products";
import { ProductGrid } from "@/components/home/product-grid";
import { EmptyState } from "@/components/shared/empty-state";

const ALL_PRODUCTS = [...PRODUCTS, ...DRAFT_PRODUCTS];

export function WishlistGrid() {
  const { ids } = useWishlist();
  const savedToys = ALL_PRODUCTS.filter((p) => ids.includes(p.id));

  if (savedToys.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Tap the heart on any toy to save it here for later."
      />
    );
  }

  return <ProductGrid products={savedToys} />;
}
