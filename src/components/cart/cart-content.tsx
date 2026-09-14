"use client";

import { useCart } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/data/products";
import { DRAFT_PRODUCTS } from "@/lib/data/draft-products";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { CartEmpty } from "@/components/cart/cart-empty";

const ALL_PRODUCTS = [...PRODUCTS, ...DRAFT_PRODUCTS];

export function CartContent() {
  const { lines, subtotalInPaise } = useCart();

  const resolvedLines = lines
    .map((line) => ({
      product: ALL_PRODUCTS.find((p) => p.id === line.productId),
      quantity: line.quantity,
    }))
    .filter((l): l is { product: (typeof ALL_PRODUCTS)[number]; quantity: number } => !!l.product);

  if (resolvedLines.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="content-shell grid grid-cols-1 gap-8 pb-16 lg:grid-cols-[1fr_360px]">
      <div className="border border-hairline bg-white px-6">
        {resolvedLines.map(({ product, quantity }) => (
          <CartLineItem key={product.id} product={product} quantity={quantity} />
        ))}
      </div>
      <CartSummary subtotalInPaise={subtotalInPaise} />
    </div>
  );
}
