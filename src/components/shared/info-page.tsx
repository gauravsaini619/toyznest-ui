import { PageHeader } from "@/components/shared/page-header";

export function InfoPage({
  title,
  breadcrumbLabel,
  children,
}: {
  title: string;
  breadcrumbLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumbLabel ?? title }]}
      />
      <div className="content-shell pb-16">
        <div className="reading-column flex flex-col gap-8">{children}</div>
      </div>
    </>
  );
}

export function InfoSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="tn-product-name mb-3 text-lg text-navy normal-case">{heading}</h2>
      <div className="tn-body flex flex-col gap-3 text-ink-muted">{children}</div>
    </section>
  );
}
