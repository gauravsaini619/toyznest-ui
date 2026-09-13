import type { FeatureRow } from "@/lib/types";

/**
 * "quick product features" (PDP · four feature rows). The organic
 * one-corner-swept card shape is a deliberate one-off matching the
 * provided design, not part of the site's usual hard-edge system —
 * implemented with explicit per-corner radii so it doesn't touch the
 * shared 0px radius tokens used everywhere else.
 */
function FeatureImage({ label, tint, big }: { label: string; tint: string; big: "bl" | "br" }) {
  const radiusStyle =
    big === "br"
      ? { borderRadius: "28px 28px 160px 28px" }
      : { borderRadius: "28px 28px 28px 160px" };

  return (
    <div
      className="flex aspect-[4/3] items-center justify-center px-4 text-center lg:aspect-auto lg:h-full"
      style={{ backgroundColor: tint, ...radiusStyle }}
    >
      <span className="font-mono text-[11px] tracking-tight text-ink/50">{label}</span>
    </div>
  );
}

function FeatureText({
  heading,
  body,
  surface,
  big,
}: {
  heading: string;
  body: string;
  surface: "navy" | "cream";
  big: "bl" | "br";
}) {
  const radiusStyle =
    big === "br"
      ? { borderRadius: "28px 28px 160px 28px" }
      : { borderRadius: "28px 28px 28px 160px" };

  return (
    <div
      className={`flex h-full min-h-[280px] flex-col justify-center gap-3 px-8 py-10 lg:px-12 ${
        surface === "navy" ? "bg-navy" : "bg-cream"
      }`}
      style={radiusStyle}
    >
      <h3
        className={`tn-display-m normal-case ${surface === "navy" ? "text-white" : "text-navy"}`}
      >
        {heading}
      </h3>
      <p className={`tn-body-l ${surface === "navy" ? "text-white/80" : "text-ink-muted"}`}>
        {body}
      </p>
    </div>
  );
}

export function ProductFeatureRows({ rows }: { rows: FeatureRow[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell">
        <h2 className="tn-display-xl mb-10 text-ink lg:mb-14">quick product features</h2>
        <div className="flex flex-col gap-6">
          {rows.map((row) => (
            <div key={row.heading} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {row.imageSide === "left" ? (
                <>
                  <FeatureImage label={row.imageLabel} tint={row.imageTint} big="br" />
                  <FeatureText
                    heading={row.heading}
                    body={row.body}
                    surface={row.textSurface}
                    big="bl"
                  />
                </>
              ) : (
                <>
                  <FeatureText
                    heading={row.heading}
                    body={row.body}
                    surface={row.textSurface}
                    big="br"
                  />
                  <FeatureImage label={row.imageLabel} tint={row.imageTint} big="bl" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
