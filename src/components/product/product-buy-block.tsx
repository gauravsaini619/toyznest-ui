import { Star, Truck } from "lucide-react";
import type { Product, ProductDetailExtra } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { ProductReadMore } from "@/components/product/product-read-more";
import { ProductLiveActivity } from "@/components/product/product-live-activity";
import { ProductColorways } from "@/components/product/product-colorways";
import { ProductPincodeCheck } from "@/components/product/product-pincode-check";
import { ProductPurchaseControls } from "@/components/product/product-purchase-controls";
import { WishlistButton } from "@/components/shared/wishlist-button";

export function ProductBuyBlock({
  product,
  detail,
}: {
  product: Product;
  detail?: ProductDetailExtra;
}) {
  const features =
    product.features ?? product.skills.map((skill) => `Builds ${skill.toLowerCase()}`);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <h1 className="tn-display-l text-ink normal-case">{product.name}</h1>
        <WishlistButton
          productId={product.id}
          productName={product.name}
          variant="floating"
          className="static bg-sand hover:bg-hairline"
        />
      </div>

      {product.rating != null && product.reviewCount != null && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-star" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-bold text-ink">{product.rating}</span>
          <span className="text-sm text-ink-muted">({product.reviewCount} reviews)</span>
        </div>
      )}

      <ul className="flex flex-col gap-2 pl-5 marker:text-ink-muted">
        {features.map((feature) => (
          <li key={feature} className="tn-body list-disc text-ink">
            {feature}
          </li>
        ))}
      </ul>

      {product.description && <ProductReadMore description={product.description} />}

      <div>
        {product.priceInPaise != null ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="tn-price text-3xl text-ink">
                {formatINR(product.priceInPaise)}
              </span>
              {product.compareAtPriceInPaise && (
                <span className="text-lg text-ink-muted line-through">
                  {formatINR(product.compareAtPriceInPaise)}
                </span>
              )}
            </div>
            <p className="tn-meta mt-1">Inclusive of all taxes</p>
          </>
        ) : (
          <span className="tn-price text-2xl text-ink-muted">Pricing coming soon</span>
        )}
      </div>

      {product.priceInPaise != null && (
        <div className="flex items-start gap-3 rounded-[10px] bg-success/10 px-4 py-3.5">
          <Truck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
          <div>
            <p className="text-sm font-bold text-success">
              Deliverable in Delhi/NCR today
            </p>
            <p className="text-sm text-success/80">
              Order before 2 PM · free above ₹1,200
            </p>
          </div>
        </div>
      )}

      {detail && (
        <>
          <ProductLiveActivity
            liveViewers={detail.liveViewers}
            boughtToday={detail.boughtToday}
          />

          {detail.colorways && <ProductColorways colorways={detail.colorways} />}

          <ProductPincodeCheck />
        </>
      )}

      {product.priceInPaise != null ? (
        <ProductPurchaseControls productId={product.id} />
      ) : (
        <p className="tn-body border border-hairline bg-sand px-4 py-3.5 text-ink-muted">
          Pricing and availability for this product are being finalised — check back soon.
        </p>
      )}
    </div>
  );
}
