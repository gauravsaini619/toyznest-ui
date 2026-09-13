import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionContent } from "@/components/collection/collection-content";

export const metadata: Metadata = {
  title: "Shop all toys",
};

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionContent />
    </Suspense>
  );
}
