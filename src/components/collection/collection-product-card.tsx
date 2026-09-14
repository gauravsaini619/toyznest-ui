import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR, toTitleCase } from "@/lib/format";
import { getDisplayBadge } from "@/lib/product-badge";
import { SURFACE_BG } from "@/lib/surface";
import { SAFE_AGE_LABEL } from "@/lib/data/age-bands";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { BuyNowButton } from "@/components/shared/buy-now-button";
import { ZipBadge } from "@/components/shared/zip-badge";

export function CollectionProductCard({ product }: { product: Product }) {
  const badgeText = getDisplayBadge(product);

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

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Badge variant="safe" className="w-fit">
          <ShieldCheck className="size-3" aria-hidden />
          {SAFE_AGE_LABEL[product.ageBand]}
        </Badge>

        <Link href={`/product/${product.slug}`} className="tn-product-name text-lg text-white normal-case">
          {toTitleCase(product.name)}
        </Link>

        {product.rating != null && product.reviewCount != null && (
          <div className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-star text-star" aria-hidden />
            <span className="text-sm font-bold text-white">{product.rating}</span>
            <span className="text-sm text-white/60">({product.reviewCount})</span>
          </div>
        )}

        {product.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {product.reviewQuote && (
          <p className="border-l-2 border-accent-yellow pl-3 text-sm text-white/85 italic">
            &ldquo;{product.reviewQuote.quote}&rdquo;
          </p>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          {product.priceInPaise != null ? (
            <>
              <span className="tn-price text-xl text-white">
                {formatINR(product.priceInPaise)}
              </span>
              {product.compareAtPriceInPaise && (
                <span className="text-sm text-white/60 line-through">
                  {formatINR(product.compareAtPriceInPaise)}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm font-semibold text-white/70">Pricing coming soon</span>
          )}
        </div>

        {product.priceInPaise != null ? (
          <>
            <ZipBadge />
            <div className="mt-1 flex gap-2">
              <AddToCartButton
                productId={product.id}
                variant="outlineOnNavy"
                className="flex-1 border-white/70 px-2 text-sm"
              />
              <BuyNowButton
                productId={product.id}
                variant="onNavy"
                className="flex-1 bg-white px-2 text-sm text-navy hover:bg-cream"
              />
            </div>
          </>
        ) : (
          <Button
            type="button"
            variant="outlineOnNavy"
            disabled
            className="mt-1 w-full border-white/40 px-2 text-sm text-white/60"
          >
            Coming soon
          </Button>
        )}
      </div>
    </article>
  );
}
