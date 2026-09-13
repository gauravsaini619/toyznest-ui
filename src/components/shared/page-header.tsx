import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function PageHeader({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="content-shell pt-8 pb-6 lg:pt-10">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="tn-display-l mt-3 text-navy normal-case">{title}</h1>
    </div>
  );
}
