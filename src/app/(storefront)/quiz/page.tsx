import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Find their next toy",
};

export default function QuizPage() {
  return (
    <>
      <PageHeader
        title="Find their next toy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Quiz" }]}
      />
      <QuizFlow />
    </>
  );
}
