import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <InfoPage title="Journal">
      <InfoSection heading="Coming soon">
        <p>
          We&apos;re building out a journal of stage-by-stage activity ideas
          and honest product write-ups from our panel — nothing published
          yet. In the meantime, sign up from the footer for activity ideas
          by email, or take the{" "}
          <a href="/quiz" className="text-navy underline">
            60-second quiz
          </a>{" "}
          for picks matched to your child&apos;s stage.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
