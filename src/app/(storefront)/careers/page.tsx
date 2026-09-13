import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <InfoPage title="Careers">
      <InfoSection heading="No open roles right now">
        <p>
          We&apos;re a small team and don&apos;t have listed openings at the
          moment. That changes as we grow — this page will list real roles
          when we do.
        </p>
      </InfoSection>

      <InfoSection heading="Hear from us first">
        <p>
          If you&apos;d like to be considered when something opens up, send
          a note and your background to{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
