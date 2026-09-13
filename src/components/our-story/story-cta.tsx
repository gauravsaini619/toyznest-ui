import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoryCta() {
  return (
    <section className="bg-navy py-16 text-center">
      <div className="content-shell">
        <h2 className="tn-display-l mb-4 text-white">see it for yourself</h2>
        <p className="tn-body-l mx-auto mb-8 max-w-md text-white/80">
          Browse the full catalogue, or take the 60-second quiz for picks
          matched to your child&apos;s stage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="onNavy" size="commerce" asChild>
            <Link href="/collection">
              Shop all toys
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button variant="outlineOnNavy" size="commerce" asChild>
            <Link href="/quiz">Take the quiz</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
