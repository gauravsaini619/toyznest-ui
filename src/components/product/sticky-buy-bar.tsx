import type { Product } from "@/lib/types";
import { formatINR, toTitleCase } from "@/lib/format";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { BuyNowButton } from "@/components/shared/buy-now-button";

export function StickyBuyBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white">
      <div className="content-shell flex items-center gap-4 py-3">
        <div className="size-14 shrink-0 overflow-hidden">
          <PlaceholderMedia label={product.placeholderLabel} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="tn-body truncate font-bold text-navy">
            {toTitleCase(product.name)}
          </p>
          <span className="text-sm font-bold text-navy">
            {formatINR(product.priceInPaise)}
          </span>
        </div>

        <div className="flex shrink-0 gap-2">
          <AddToCartButton productId={product.id} variant="secondary" size="commerce" />
          <BuyNowButton productId={product.id} variant="primary" size="commerce" />
        </div>
      </div>
    </div>
  );
}
