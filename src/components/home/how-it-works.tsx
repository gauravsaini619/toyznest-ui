const STEPS = [
  {
    number: "01",
    title: "Tell us their stage",
    description: "Age, interests and the skills you'd like to nudge along.",
  },
  {
    number: "02",
    title: "We curate the shortlist",
    description: "Toys matched to that exact stage — nothing generic.",
  },
  {
    number: "03",
    title: "Try it at home",
    description: "Free same-day delivery in Delhi/NCR, gift-wrapped on request.",
  },
  {
    number: "04",
    title: "Keep what they love",
    description: "Easy returns on anything that doesn't land well.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-navy">
      <div className="content-shell">
        <h2 className="tn-display-l mb-12 max-w-2xl text-white">
          from stage to shortlist in four steps
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="border-t-2 border-white/20 pt-5">
              <span className="tn-display-m block text-white/30">
                {step.number}
              </span>
              <h3 className="tn-product-name mt-3 text-lg text-white normal-case">
                {step.title}
              </h3>
              <p className="tn-body mt-2 text-white/75">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
