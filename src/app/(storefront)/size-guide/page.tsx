import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";
import { AGE_BANDS } from "@/lib/data/age-bands";

export const metadata: Metadata = {
  title: "Size & age guide",
};

export default function SizeGuidePage() {
  return (
    <InfoPage title="Size & age guide">
      <InfoSection heading="Stage, not just age">
        <p>
          Every product is matched to a developmental stage, not just the
          age printed on the box — a toy for a confident 6-month-old can
          suit a more cautious 9-month-old too. Use this table as a
          starting point, then trust how your child actually plays.
        </p>
      </InfoSection>

      <div className="border border-hairline">
        {AGE_BANDS.map((band, i) => (
          <div
            key={band.id}
            className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
              i > 0 ? "border-t border-hairline" : ""
            }`}
          >
            <span className="text-sm font-bold text-navy">{band.rangeLabel}</span>
            <span className="text-sm text-ink-muted">{band.stageName}</span>
          </div>
        ))}
      </div>

      <InfoSection heading="Not sure which stage fits?">
        <p>
          Take the{" "}
          <a href="/quiz" className="text-navy underline">
            60-second quiz
          </a>{" "}
          — it asks a few questions about your child and skills you&apos;d
          like to build, then shows a shortlist matched to their stage.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
