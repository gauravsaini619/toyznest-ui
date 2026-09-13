import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR, toTitleCase } from "@/lib/format";
import { getDisplayBadge } from "@/lib/product-badge";
import { SAFE_AGE_LABEL } from "@/lib/data/age-bands";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { BuyNowButton } from "@/components/shared/buy-now-button";
import { ZipBadge } from "@/components/shared/zip-badge";

export function CollectionProductRow({ product }: { product: Product }) {
  const badgeText = getDisplayBadge(product);

  return (
    <article className="flex gap-4 border border-hairline bg-white p-4">
      <Link
        href={`/product/${product.slug}`}
        aria-label={product.name}
        className="relative size-24 shrink-0 overflow-hidden sm:size-32"
      >
        <PlaceholderMedia label={product.placeholderLabel} />
        {badgeText && (
          <Badge variant="product" className="absolute top-1.5 left-1.5 h-5 px-1.5 text-[10px]">
            {badgeText}
          </Badge>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <Badge variant="safe" className="mb-1.5 w-fit border border-hairline">
            <ShieldCheck className="size-3" aria-hidden />
            {SAFE_AGE_LABEL[product.ageBand]}
          </Badge>
          <Link
            href={`/product/${product.slug}`}
            className="tn-product-name block text-base text-navy normal-case"
          >
            {toTitleCase(product.name)}
          </Link>
          <div className="mt-1 flex items-center gap-1.5">
            <Star className="size-3.5 fill-star text-star" aria-hidden />
            <span className="text-sm font-bold text-ink">{product.rating}</span>
            <span className="text-sm text-ink-muted">({product.reviewCount})</span>
          </div>
          <ZipBadge variant="onLight" className="mt-1.5" />
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="tn-price text-lg text-navy">
              {formatINR(product.priceInPaise)}
            </span>
            {product.compareAtPriceInPaise && (
              <span className="text-sm text-ink-muted line-through">
                {formatINR(product.compareAtPriceInPaise)}
              </span>
            )}
          </div>
          <WishlistButton
            productId={product.id}
            productName={product.name}
            className="static bg-sand hover:bg-hairline"
          />
          <AddToCartButton productId={product.id} variant="secondary" size="sm" />
          <BuyNowButton productId={product.id} variant="primary" size="sm" />
        </div>
      </div>
    </article>
  );
}
