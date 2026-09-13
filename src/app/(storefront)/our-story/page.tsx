import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { FounderStory } from "@/components/home/founder-story";
import { ValuesGrid } from "@/components/our-story/values-grid";
import { TrustRow } from "@/components/home/trust-row";
import { StoryCta } from "@/components/our-story/story-cta";

export const metadata: Metadata = {
  title: "Our story",
};

export default function OurStoryPage() {
  return (
    <>
      <PageHeader title="Our story" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our story" }]} />
      <FounderStory />
      <ValuesGrid />
      <TrustRow />
      <StoryCta />
    </>
  );
}
