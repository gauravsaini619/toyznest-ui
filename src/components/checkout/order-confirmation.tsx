import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function OrderConfirmation({
  orderNumber,
  totalInPaise,
}: {
  orderNumber: string;
  totalInPaise: number;
}) {
  return (
    <div className="content-shell flex flex-col items-center gap-4 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="size-8 text-success" aria-hidden />
      </span>
      <h1 className="tn-display-m text-navy normal-case">Order placed</h1>
      <p className="tn-body-l text-ink-muted">
        Order {orderNumber} for {formatINR(totalInPaise)} is confirmed.
      </p>
      <Button size="commerce" className="mt-2" asChild>
        <Link href="/collection">Continue shopping</Link>
      </Button>
    </div>
  );
}
