import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * Parent-friendly relabelling of the real `SkillTag`/`CategorySlug` filters —
 * every link lands on genuine `/collection` results, not a fabricated tag.
 */
const PILLARS: { emoji: string; name: string; href: string }[] = [
  { emoji: "🤲", name: "Fine Motor", href: "/collection?skill=Fine motor" },
  { emoji: "🧩", name: "Problem Solving", href: "/collection?skill=Cognitive" },
  { emoji: "🎨", name: "Creativity", href: "/collection?skill=Creativity" },
  { emoji: "⚙️", name: "STEM", href: "/collection?category=building-stem" },
  { emoji: "✨", name: "Imagination", href: "/collection?category=pretend-play" },
  { emoji: "🏃", name: "Active Play", href: "/collection?skill=Gross motor" },
];

export function ShopByDevelopment() {
  return (
    <section className="section-padding bg-sand">
      <div className="content-shell">
        <SectionHeading
          title="play with a purpose"
          subtitle="Because the best toys do more than entertain."
          viewAllHref="/collection"
          viewAllLabel="Shop by development"
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.name}
              href={pillar.href}
              className="group flex flex-col items-center gap-3 border border-hairline bg-white p-6 text-center transition-colors hover:border-navy"
            >
              <span className="text-4xl" aria-hidden>
                {pillar.emoji}
              </span>
              <span className="tn-product-name text-sm normal-case text-navy">
                {pillar.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
