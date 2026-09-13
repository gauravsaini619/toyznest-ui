import type { LegalInfo, Product, ProductSpecifications as Specs } from "@/lib/types";
import { toTitleCase } from "@/lib/format";

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-hairline py-3">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

function LegalBlock({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="border-b border-hairline py-4 last:border-b-0">
      <p className="tn-label mb-1.5 text-ink-muted">{label}</p>
      {lines.map((line) => (
        <p key={line} className="text-sm text-ink">
          {line}
        </p>
      ))}
    </div>
  );
}

export function ProductSpecifications({
  product,
  specifications,
  legalInfo,
}: {
  product: Product;
  specifications: Specs;
  legalInfo: LegalInfo;
}) {
  const columns = [
    [
      { label: "Name", value: toTitleCase(product.name) },
      { label: "Product Dimensions", value: specifications.dimensions },
      { label: "Material", value: specifications.material },
    ],
    [
      { label: "Net Quantity", value: "1 N" },
      { label: "MRP (Inclusive All Taxes)", value: specifications.mrpLabel },
      { label: "In The Box", value: specifications.inTheBox },
    ],
    [
      { label: "Recommended Age", value: specifications.recommendedAge },
      { label: "Country Of Origin", value: specifications.countryOfOrigin },
    ],
  ];

  return (
    <section className="bg-sand/60 py-16">
      <div className="content-shell">
        <h2 className="tn-display-m mb-8 text-navy">Product Specifications</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-3">
          {columns.map((col, i) => (
            <div key={i}>
              {col.map((row) => (
                <SpecRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <LegalBlock label="Marketed by" lines={legalInfo.marketedBy} />
          <LegalBlock
            label="Manufactured by, packed by & assembled by"
            lines={legalInfo.manufacturedBy}
          />
          <LegalBlock
            label="For consumer complaints contact us at"
            lines={legalInfo.complaintsContact}
          />
        </div>
      </div>
    </section>
  );
}
