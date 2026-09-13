export function ProductPillarBand({ pillars }: { pillars: string[] }) {
  return (
    <div className="bg-cream">
      <div className="content-shell grid grid-cols-2 gap-6 py-10 text-center sm:grid-cols-4">
        {pillars.map((pillar) => (
          <div key={pillar}>
            <span className="mx-auto mb-2 block h-px w-6 bg-navy/30" aria-hidden />
            <p className="tn-product-name text-base text-navy normal-case">{pillar}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
