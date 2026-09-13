import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Sustainability",
};

export default function SustainabilityPage() {
  return (
    <InfoPage title="Sustainability">
      <InfoSection heading="Materials first">
        <p>
          Most of our wooden toys are FSC-certified rubberwood — a
          fast-renewing hardwood — finished with water-based, non-toxic
          paints instead of solvent-based ones. We favour solid materials
          that survive a second and third kid over cheaper toys built to be
          replaced.
        </p>
      </InfoSection>

      <InfoSection heading="Packaging">
        <p>
          Order boxes and cotton storage bags use recyclable and reusable
          materials wherever we can. We&apos;re still working to remove
          plastic packaging entirely across every supplier — not there yet,
          but moving.
        </p>
      </InfoSection>

      <InfoSection heading="Where we're still working">
        <p>
          We don&apos;t claim to be carbon-neutral or zero-waste today. This
          page will get more specific as we measure and publish real
          numbers, rather than promise things we can&apos;t yet back up.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
