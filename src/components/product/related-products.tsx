import Link from "next/link";
import type { RelatedTeaser } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { SURFACE_BG } from "@/lib/surface";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { BuyNowButton } from "@/components/shared/buy-now-button";

export function RelatedProducts({ items }: { items: RelatedTeaser[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell">
        <h2 className="tn-display-l mb-8 text-ink">parents also picked</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.name} className={`relative flex flex-col ${SURFACE_BG[item.surface]}`}>
              <Link href={item.href} className="flex aspect-square flex-col justify-end p-5">
                <p className="tn-product-name text-white">{item.name}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="tn-price text-lg text-white">
                    {formatINR(item.priceInPaise)}
                  </span>
                  {item.compareAtPriceInPaise && (
                    <span className="text-sm text-white/60 line-through">
                      {formatINR(item.compareAtPriceInPaise)}
                    </span>
                  )}
                </div>
              </Link>

              {item.productId && (
                <>
                  <WishlistButton
                    productId={item.productId}
                    productName={item.name}
                    className="absolute top-3 right-3"
                  />
                  <div className="flex gap-2 p-5 pt-0">
                    <AddToCartButton
                      productId={item.productId}
                      variant="outlineOnNavy"
                      className="flex-1 border-white/70 px-2 text-sm"
                    />
                    <BuyNowButton
                      productId={item.productId}
                      variant="onNavy"
                      className="flex-1 bg-white px-2 text-sm text-navy hover:bg-cream"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
