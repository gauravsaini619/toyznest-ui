"use client";

import { CreditCard } from "lucide-react";
import { formatINR } from "@/lib/format";

export type PaymentMethod = "prepaid" | "cod";

export function CheckoutPaymentMethod({
  value,
  onChange,
  codSurchargeInPaise,
}: {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  codSurchargeInPaise: number;
}) {
  return (
    <section className="border border-hairline bg-white p-6">
      <h2 className="tn-label mb-4 flex items-center gap-2 text-ink-muted">
        <CreditCard className="size-4" aria-hidden />
        Payment method
      </h2>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Payment method">
        <label
          className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
            value === "prepaid" ? "border-navy" : "border-hairline"
          }`}
        >
          <input
            type="radio"
            name="payment-method"
            checked={value === "prepaid"}
            onChange={() => onChange("prepaid")}
            className="size-4 accent-navy"
          />
          <div>
            <p className="text-sm font-bold text-ink">Prepaid</p>
            <p className="tn-meta">UPI, cards or netbanking</p>
          </div>
        </label>

        <label
          className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
            value === "cod" ? "border-navy" : "border-hairline"
          }`}
        >
          <input
            type="radio"
            name="payment-method"
            checked={value === "cod"}
            onChange={() => onChange("cod")}
            className="size-4 accent-navy"
          />
          <div>
            <p className="text-sm font-bold text-ink">Cash on delivery</p>
            <p className="tn-meta">Adds {formatINR(codSurchargeInPaise)} handling fee</p>
          </div>
        </label>
      </div>
    </section>
  );
}
