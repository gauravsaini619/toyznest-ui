import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuizTeaser() {
  return (
    <section className="section-padding bg-navy">
      <div className="content-shell flex flex-col items-center gap-5 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/10">
          <Sparkles className="size-6 text-accent-yellow" aria-hidden />
        </span>
        <h2 className="tn-display-l text-white">not sure what they&apos;ll love?</h2>
        <p className="tn-body max-w-lg text-white/80">
          We&apos;ll help you find it. Tell us their age, interests and how they love to
          play. We&apos;ll find their best matches.
        </p>
        <Button size="commerce" variant="onNavy" className="bg-white text-navy hover:bg-cream" asChild>
          <Link href="/quiz">
            Find Their Toy
            <span aria-hidden>→</span>
          </Link>
        </Button>
        <p className="tn-meta text-white/60">Takes about 60 seconds • Personalised picks</p>
      </div>
    </section>
  );
}
