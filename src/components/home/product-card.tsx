import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatINR, discountPercent } from "@/lib/format";
import { SURFACE_BG } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { BuyNowButton } from "@/components/shared/buy-now-button";
import { ZipBadge } from "@/components/shared/zip-badge";

const BADGE_TEXT: Record<NonNullable<Product["badge"]>, string> = {
  BESTSELLER: "BESTSELLER",
  "50% OFF": "50% OFF",
  NEW: "NEW",
};

export function ProductCard({ product }: { product: Product }) {
  const percentOff = discountPercent(
    product.priceInPaise,
    product.compareAtPriceInPaise
  );
  const badgeText = product.badge
    ? BADGE_TEXT[product.badge]
    : percentOff
      ? `${percentOff}% OFF`
      : null;

  return (
    <article
      className={`group relative flex h-full w-full flex-col ${SURFACE_BG[product.surface]}`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0"
        >
          <PlaceholderMedia label={product.placeholderLabel} className="bg-black/10" />
        </Link>

        {badgeText && (
          <Badge variant="product" className="absolute top-3 left-3">
            {badgeText}
          </Badge>
        )}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Link href={`/product/${product.slug}`} className="tn-product-name text-base text-white">
          {product.name}
        </Link>

        {product.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-2">
          <span className="tn-price text-lg text-white">
            {formatINR(product.priceInPaise)}
          </span>
          {product.compareAtPriceInPaise && (
            <span className="text-sm text-white/60 line-through">
              {formatINR(product.compareAtPriceInPaise)}
            </span>
          )}
        </div>

        <ZipBadge />

        <div className="flex gap-2">
          <AddToCartButton
            productId={product.id}
            variant="outlineOnNavy"
            size="sm"
            className="flex-1 border-white/70 px-2 text-xs"
          />
          <BuyNowButton
            productId={product.id}
            variant="onNavy"
            size="sm"
            className="flex-1 bg-white px-2 text-xs text-navy hover:bg-cream"
          />
        </div>
      </div>
    </article>
  );
}
