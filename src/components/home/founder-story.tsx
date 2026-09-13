import Image from "next/image";

export function FounderStory() {
  return (
    <section className="section-padding bg-cream">
      <div className="content-shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/images/founder-team.png"
            alt="The Toyznest founding team with their children at the Toyznest warehouse"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="reading-column">
          <blockquote className="tn-display-l text-navy">
            &ldquo;We started Toyznest after a weekend spent returning three
            toys that promised more than they delivered.&rdquo;
          </blockquote>
          <p className="tn-body-l mt-5 text-ink-muted">
            Every toy on this site is picked by a small team of parents and
            occupational therapists, matched to a real developmental stage —
            not just an age printed on a box.
          </p>
          <div className="mt-6">
            <p className="tn-product-name text-base text-navy">the toyznest team</p>
            <p className="tn-meta">Founders, Toyznest</p>
          </div>
        </div>
      </div>
    </section>
  );
}
