"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/data/products";
import { DRAFT_PRODUCTS } from "@/lib/data/draft-products";
import { EmptyState } from "@/components/shared/empty-state";
import { CheckoutContact } from "@/components/checkout/checkout-contact";
import { CheckoutAddress } from "@/components/checkout/checkout-address";
import {
  CheckoutPaymentMethod,
  type PaymentMethod,
} from "@/components/checkout/checkout-payment-method";
import { CheckoutOrderReview } from "@/components/checkout/checkout-order-review";
import { CheckoutTotals } from "@/components/checkout/checkout-totals";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

const COD_SURCHARGE_PAISE = 1000;
const PLATFORM_FEE_PAISE = 900;
/** Toys (HSN 9503) attract 12% GST — shown split as CGST + IGST for the order summary. */
const GST_RATE = 0.12;

const COUPONS: Record<string, number> = {
  NEST10: 0.1,
};

const ALL_PRODUCTS = [...PRODUCTS, ...DRAFT_PRODUCTS];

export function CheckoutContent({
  buyNowProductId,
  buyNowQuantity,
}: {
  buyNowProductId?: string;
  buyNowQuantity: number;
}) {
  const { lines: cartLines, clear: clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("prepaid");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    totalInPaise: number;
  } | null>(null);

  const sourceLines = buyNowProductId
    ? [{ productId: buyNowProductId, quantity: buyNowQuantity }]
    : cartLines;

  const resolvedLines = sourceLines
    .map((line) => ({
      product: ALL_PRODUCTS.find((p) => p.id === line.productId),
      quantity: line.quantity,
    }))
    .filter((l): l is { product: (typeof ALL_PRODUCTS)[number]; quantity: number } => !!l.product);

  const itemTotalMrpInPaise = resolvedLines.reduce(
    (sum, l) =>
      sum + (l.product.compareAtPriceInPaise ?? l.product.priceInPaise ?? 0) * l.quantity,
    0
  );
  const sellingTotalInPaise = resolvedLines.reduce(
    (sum, l) => sum + (l.product.priceInPaise ?? 0) * l.quantity,
    0
  );
  const discountOnMrpInPaise = itemTotalMrpInPaise - sellingTotalInPaise;

  const couponRate = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const couponDiscountInPaise = Math.round(sellingTotalInPaise * couponRate);

  const codSurchargeInPaise = paymentMethod === "cod" ? COD_SURCHARGE_PAISE : 0;

  const netAfterDiscounts = sellingTotalInPaise - couponDiscountInPaise;
  // CGST + IGST are shown split for transparency — both are already embedded
  // in the item price ("inclusive of all taxes" everywhere on the site), so
  // neither is added again below.
  const cgstInPaise = Math.round((netAfterDiscounts * (GST_RATE / 2)) / (1 + GST_RATE));
  const igstInPaise = cgstInPaise;

  const totalInPaise =
    netAfterDiscounts + PLATFORM_FEE_PAISE + codSurchargeInPaise;

  function handleApplyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError(null);
    } else {
      setCouponError("That code isn't valid.");
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
  }

  function handlePlaceOrder() {
    const orderNumber = `#TN-${Math.floor(1000 + Math.random() * 9000)}`;
    setPlacedOrder({ orderNumber, totalInPaise });
    if (!buyNowProductId) clearCart();
  }

  if (placedOrder) {
    return (
      <OrderConfirmation
        orderNumber={placedOrder.orderNumber}
        totalInPaise={placedOrder.totalInPaise}
      />
    );
  }

  if (resolvedLines.length === 0) {
    return (
      <div className="content-shell pb-16">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out"
          description="Your cart is empty — add a few toys first."
        />
      </div>
    );
  }

  return (
    <div className="content-shell grid grid-cols-1 gap-8 pb-16 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-6">
        <CheckoutContact />
        <CheckoutAddress />
        <CheckoutPaymentMethod
          value={paymentMethod}
          onChange={setPaymentMethod}
          codSurchargeInPaise={COD_SURCHARGE_PAISE}
        />
        <CheckoutOrderReview lines={resolvedLines} />
      </div>
      <CheckoutTotals
        itemTotalMrpInPaise={itemTotalMrpInPaise}
        discountOnMrpInPaise={discountOnMrpInPaise}
        couponCode={couponCode}
        onCouponCodeChange={setCouponCode}
        appliedCoupon={appliedCoupon}
        couponDiscountInPaise={couponDiscountInPaise}
        couponError={couponError}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        platformFeeInPaise={PLATFORM_FEE_PAISE}
        codSurchargeInPaise={codSurchargeInPaise}
        cgstInPaise={cgstInPaise}
        igstInPaise={igstInPaise}
        totalInPaise={totalInPaise}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
