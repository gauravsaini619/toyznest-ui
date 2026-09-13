import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The cart is always empty for now — "Add to cart" isn't wired to real
 * state anywhere on the site yet, so this is the only cart state that
 * exists. Swap for a real empty check once cart state lands.
 *
 * Note: the rounded well/button here is a deliberate one-off — it departs
 * from the site's usual hard-edge (0px radius) cards and buttons because
 * that's what this page's design shows. Everywhere else keeps square
 * corners; flag it if that was unintentional and you'd rather unify it.
 */
export function CartEmpty() {
  return (
    <div className="content-shell pb-16">
      <div className="flex flex-col items-center gap-5 rounded-[32px] border border-hairline bg-white px-6 py-24 text-center">
        <span className="flex size-24 items-center justify-center rounded-full bg-sand">
          <ShoppingCart className="size-9 text-ink-muted" aria-hidden />
        </span>
        <h2 className="tn-display-m text-navy normal-case">Your cart is empty</h2>
        <p className="tn-body max-w-sm text-ink-muted">
          Add a few developmental toys and they&apos;ll show up here.
        </p>
        <Button size="commerce" className="mt-2 rounded-[16px]" asChild>
          <Link href="/collection">
            Browse toys
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}
