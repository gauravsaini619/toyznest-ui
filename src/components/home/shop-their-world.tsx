import Link from "next/link";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import type { AccentSurface } from "@/lib/types";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { SectionHeading } from "@/components/shared/section-heading";

interface World {
  emoji: string;
  name: string;
  subtitle: string;
  href: string;
  surface: AccentSurface;
}

/**
 * Interest-based ("emotional") discovery, distinct from the literal
 * CategorySlug mosaic — links reuse real `/collection` filters (category,
 * skill, or the multi-term `q=` OR search) so every tile lands on real
 * results, not a fabricated taxonomy.
 */
const PRIMARY_WORLDS: World[] = [
  {
    emoji: "🏎",
    name: "Little Racers",
    subtitle: "RC cars, tracks, trains & vehicles",
    href: "/collection?q=car,truck,train,vehicle,rc",
    surface: "navy",
  },
  {
    emoji: "🧱",
    name: "Little Builders",
    subtitle: "Blocks, construction & magnetic play",
    href: "/collection?category=building-stem",
    surface: "cobalt",
  },
  {
    emoji: "🎨",
    name: "Little Creators",
    subtitle: "Art, craft & DIY",
    href: "/collection?skill=Creativity",
    surface: "magenta",
  },
  {
    emoji: "🧩",
    name: "Little Thinkers",
    subtitle: "Puzzles, chess & brain games",
    href: "/collection?category=books-puzzles",
    surface: "yellow",
  },
  {
    emoji: "🩺",
    name: "Little Pretenders",
    subtitle: "Kitchen, doctor & role play",
    href: "/collection?category=pretend-play",
    surface: "violet",
  },
  {
    emoji: "🚲",
    name: "Little Explorers",
    subtitle: "Outdoor, scooters & ride-ons",
    href: "/collection?category=outdoor-active",
    surface: "emerald",
  },
];

const SECONDARY_WORLDS: World[] = [
  {
    emoji: "🎵",
    name: "Little Musicians",
    subtitle: "Music, rhythm & sound",
    href: "/collection?q=musical,piano,xylophone,drum",
    surface: "red",
  },
  {
    emoji: "🍼",
    name: "Baby's First Toys",
    subtitle: "Sensory & first play",
    href: "/collection?category=baby-sensory",
    surface: "cobalt",
  },
  {
    emoji: "🧸",
    name: "Cuddle Corner",
    subtitle: "Plush & soft toys",
    href: "/collection?q=plush,soft toy,teddy,cuddle",
    surface: "navy",
  },
];

function WorldCard({ world, className }: { world: World; className?: string }) {
  return (
    <Link
      href={world.href}
      className={`group relative block overflow-hidden ${SURFACE_BG[world.surface]} ${className ?? ""}`}
    >
      <PlaceholderMedia
        label={`${world.name.toLowerCase()} · 4:3`}
        className="bg-black/10 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="text-2xl" aria-hidden>
          {world.emoji}
        </span>
        <span className={`tn-product-name mt-1 text-lg normal-case ${SURFACE_INK[world.surface]}`}>
          {world.name}
        </span>
        <span className={`text-sm ${SURFACE_MUTED_INK[world.surface]}`}>{world.subtitle}</span>
      </div>
    </Link>
  );
}

export function ShopTheirWorld() {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell">
        <SectionHeading
          title="shop their world"
          subtitle="Whatever they're into, there's a world waiting."
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {PRIMARY_WORLDS.map((world) => (
            <WorldCard key={world.name} world={world} className="aspect-[4/3]" />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SECONDARY_WORLDS.map((world) => (
            <WorldCard key={world.name} world={world} className="aspect-[16/9] sm:aspect-[4/3]" />
          ))}
        </div>
      </div>
    </section>
  );
}
