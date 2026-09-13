import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import type { AccountProfile } from "@/lib/data/account";

const STAT_ITEMS = (stats: AccountProfile["stats"]) => [
  { value: String(stats.orders), label: "Orders" },
  { value: String(stats.playProfiles), label: "Play profiles" },
  { value: formatINR(stats.lifetimeSpendInPaise), label: "Lifetime spend" },
  { value: String(stats.savedToys), label: "Saved toys" },
];

export function AccountHero({ profile }: { profile: AccountProfile }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] size-[26rem] rounded-full bg-white/[0.04]"
      />

      <div className="content-shell relative z-10 pt-6 pb-8 lg:pt-8">
        <Breadcrumbs
          onNavy
          items={[{ label: "Home", href: "/" }, { label: "My account" }]}
        />

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex size-28 shrink-0 items-center justify-center bg-accent-yellow lg:size-32">
              <span className="tn-display-m text-navy normal-case">
                {profile.initials}
              </span>
            </span>

            <div>
              <h1 className="tn-display-l text-white">{profile.name}</h1>
              <p className="tn-body mt-2 flex flex-wrap items-center gap-x-2 text-white/70">
                <span>{profile.phone}</span>
                <span aria-hidden>·</span>
                <span>{profile.email}</span>
                <span aria-hidden>·</span>
                <span>Member since {profile.memberSince}</span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 bg-accent-yellow px-3 py-1.5 text-sm font-extrabold text-navy">
                  <Star className="size-4 fill-current" aria-hidden />
                  {profile.tier.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 border border-white/30 px-3 py-1.5 text-sm font-bold text-white">
                  {profile.playPoints.toLocaleString("en-IN")} play points
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button variant="onNavy" className="bg-cream hover:bg-white">
              Reorder favourites
            </Button>
            <Button variant="outlineOnNavy">Sign out</Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15">
        <div className="content-shell grid grid-cols-2 lg:grid-cols-4">
          {STAT_ITEMS(profile.stats).map((stat, i) => (
            <div
              key={stat.label}
              className={`py-6 pr-6 lg:py-8 lg:pl-6 ${
                i % 2 === 1 ? "border-l border-white/15" : ""
              } ${i > 0 ? "lg:border-l" : "lg:border-l-0"} lg:border-white/15`}
            >
              <p className="tn-display-m text-white normal-case">{stat.value}</p>
              <p className="tn-label mt-1 text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
