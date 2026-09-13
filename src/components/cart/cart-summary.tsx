"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

const FREE_DELIVERY_THRESHOLD_PAISE = 120000;

export function CartSummary({ subtotalInPaise }: { subtotalInPaise: number }) {
  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD_PAISE - subtotalInPaise;

  return (
    <div className="border border-hairline bg-white p-6">
      <h2 className="tn-product-name mb-4 text-lg text-navy normal-case">Order summary</h2>

      {remainingForFreeDelivery > 0 ? (
        <p className="text-sm mb-4 bg-sand px-3 py-2 text-ink-muted">
          Add {formatINR(remainingForFreeDelivery)} more for free delivery.
        </p>
      ) : (
        <p className="text-sm mb-4 bg-success/10 px-3 py-2 text-success">
          Your order qualifies for free delivery.
        </p>
      )}

      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <span className="tn-body text-ink-muted">Subtotal</span>
        <span className="tn-body font-semibold text-ink">
          {formatINR(subtotalInPaise)}
        </span>
      </div>
      <div className="flex items-center justify-between pt-3">
        <span className="tn-product-name text-base text-navy normal-case">Total</span>
        <span className="tn-price text-xl text-navy">{formatINR(subtotalInPaise)}</span>
      </div>
      <p className="tn-meta mt-1">Inclusive of all taxes</p>

      <Button size="commerce" className="mt-5 w-full" asChild>
        <Link href="/checkout">
          Proceed to checkout
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Button>

      <p className="tn-meta mt-3 text-center leading-relaxed">
        By placing your order, you agree to our{" "}
        <Link href="/terms" className="text-navy underline underline-offset-2">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/returns" className="text-navy underline underline-offset-2">
          Return Policy
        </Link>
        .
      </p>
    </div>
  );
}
