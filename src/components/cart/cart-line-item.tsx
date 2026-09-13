"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { ProductQuantityStepper } from "@/components/product/product-quantity-stepper";

export function CartLineItem({ product, quantity }: { product: Product; quantity: number }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-hairline py-5 last:border-b-0">
      <Link href={`/product/${product.slug}`} className="size-24 shrink-0 overflow-hidden">
        <PlaceholderMedia label={product.placeholderLabel} />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="tn-product-name text-base text-navy normal-case"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="text-ink-muted transition-colors hover:text-accent-red"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ProductQuantityStepper
            quantity={quantity}
            onChange={(q) => setQuantity(product.id, q)}
          />
          <div className="flex items-baseline gap-2">
            <span className="tn-price text-lg text-ink">
              {formatINR(product.priceInPaise * quantity)}
            </span>
            {product.compareAtPriceInPaise && (
              <span className="text-sm text-ink-muted line-through">
                {formatINR(product.compareAtPriceInPaise * quantity)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
