"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ProductQuantityStepper } from "@/components/product/product-quantity-stepper";
import { BuyNowButton } from "@/components/shared/buy-now-button";
import { Button } from "@/components/ui/button";

export function ProductPurchaseControls({ productId }: { productId: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addItem(productId, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductQuantityStepper quantity={quantity} onChange={setQuantity} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="secondary"
          size="commerce"
          className="flex-1"
          onClick={handleAddToCart}
        >
          {justAdded ? (
            <>
              <Check className="size-4" aria-hidden />
              Added
            </>
          ) : (
            "Add To Cart"
          )}
        </Button>
        <BuyNowButton
          productId={productId}
          quantity={quantity}
          variant="primary"
          size="commerce"
          className="flex-1"
        >
          Buy Now
        </BuyNowButton>
      </div>
    </div>
  );
}
