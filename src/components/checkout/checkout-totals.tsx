import Link from "next/link";
import { Tag, X } from "lucide-react";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Row({
  label,
  value,
  muted,
  tone,
}: {
  label: string;
  value: string;
  muted?: boolean;
  tone?: "success";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`tn-body ${muted ? "text-ink-muted" : "text-ink"}`}>{label}</span>
      <span
        className={`tn-body font-semibold ${tone === "success" ? "text-success" : "text-ink"}`}
      >
        {value}
      </span>
    </div>
  );
}

export function CheckoutTotals({
  itemTotalMrpInPaise,
  discountOnMrpInPaise,
  couponCode,
  onCouponCodeChange,
  appliedCoupon,
  couponDiscountInPaise,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  platformFeeInPaise,
  codSurchargeInPaise,
  cgstInPaise,
  igstInPaise,
  totalInPaise,
  onPlaceOrder,
}: {
  itemTotalMrpInPaise: number;
  discountOnMrpInPaise: number;
  couponCode: string;
  onCouponCodeChange: (value: string) => void;
  appliedCoupon: string | null;
  couponDiscountInPaise: number;
  couponError: string | null;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  platformFeeInPaise: number;
  codSurchargeInPaise: number;
  cgstInPaise: number;
  igstInPaise: number;
  totalInPaise: number;
  onPlaceOrder: () => void;
}) {
  return (
    <div className="sticky top-24 border border-hairline bg-white p-6">
      <h2 className="tn-product-name mb-4 text-lg text-navy normal-case">Order summary</h2>

      {/* Coupon */}
      {appliedCoupon ? (
        <div className="mb-4 flex items-center justify-between gap-3 bg-success/10 px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-sm font-bold text-success">
            <Tag className="size-3.5" aria-hidden />
            {appliedCoupon} applied
          </span>
          <button
            type="button"
            onClick={onRemoveCoupon}
            aria-label="Remove coupon"
            className="text-success hover:text-success/70"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex gap-0">
            <Input
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              placeholder="Coupon code"
              aria-label="Coupon code"
              className="uppercase"
            />
            <Button type="button" variant="secondary" onClick={onApplyCoupon}>
              Apply
            </Button>
          </div>
          {couponError && <p className="text-meta mt-1.5 text-accent-red">{couponError}</p>}
        </div>
      )}

      <div className="flex flex-col gap-2 border-b border-hairline pb-3">
        <Row label="Item total (MRP)" value={formatINR(itemTotalMrpInPaise)} muted />
        {discountOnMrpInPaise > 0 && (
          <Row
            label="Discount on MRP"
            value={`− ${formatINR(discountOnMrpInPaise)}`}
            tone="success"
            muted
          />
        )}
        {couponDiscountInPaise > 0 && (
          <Row
            label="Coupon discount"
            value={`− ${formatINR(couponDiscountInPaise)}`}
            tone="success"
            muted
          />
        )}
        <Row label="Platform fee" value={formatINR(platformFeeInPaise)} muted />
        <Row label="Delivery" value="Free" muted tone="success" />
        {codSurchargeInPaise > 0 && (
          <Row label="COD handling fee" value={formatINR(codSurchargeInPaise)} muted />
        )}
        <Row label="CGST (included)" value={formatINR(cgstInPaise)} muted />
        <Row label="IGST (included)" value={formatINR(igstInPaise)} muted />
      </div>

      <div className="flex items-center justify-between pt-3">
        <span className="tn-product-name text-base text-navy normal-case">Total Amount</span>
        <span className="tn-price text-xl text-navy">{formatINR(totalInPaise)}</span>
      </div>

      <Button size="commerce" className="mt-5 w-full" onClick={onPlaceOrder}>
        Place order
      </Button>

      <p className="tn-meta mt-3 text-center leading-relaxed">
        By placing the order, you agree to Toyznest&apos;s{" "}
        <Link href="/terms" className="text-navy underline underline-offset-2">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-navy underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="tn-meta mt-2 text-center">
        This is a prototype checkout — no payment is actually processed.
      </p>
    </div>
  );
}
