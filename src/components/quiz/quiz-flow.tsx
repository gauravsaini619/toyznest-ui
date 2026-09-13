"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { PRODUCTS } from "@/lib/data/products";
import { PLAY_KITS } from "@/lib/data/play-kits";
import type { AgeBandId, SkillTag } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/home/product-grid";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

const SKILLS: SkillTag[] = [
  "Fine motor",
  "Gross motor",
  "Cognitive",
  "Sensory",
  "Language",
  "Social-emotional",
  "Creativity",
];

const BUDGETS = [
  { label: "Under ₹500", max: 50000 },
  { label: "₹500 – ₹1,500", max: 150000 },
  { label: "₹1,500 – ₹3,000", max: 300000 },
  { label: "₹3,000+", max: Infinity },
];

const KIT_FOR_AGE: Record<string, string> = {
  "0-6m": "k1",
  "6-12m": "k1",
  "1-2y": "k2",
  "2-3y": "k2",
  "3-5y": "k3",
  "5-7y": "k4",
  "7y-plus": "k4",
};

const STEPS = ["Stage", "Skills", "Budget", "Results"] as const;

export function QuizFlow() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<AgeBandId | null>(null);
  const [skills, setSkills] = useState<SkillTag[]>([]);
  const [budget, setBudget] = useState<number | null>(null);

  const ageBand = AGE_BANDS.find((b) => b.id === age);

  const matches = useMemo(() => {
    if (!age || budget === null) return [];
    const filtered = PRODUCTS.filter((p) => {
      if (p.ageBand !== age) return false;
      if (p.priceInPaise > budget) return false;
      if (skills.length > 0 && !skills.some((s) => p.skills.includes(s))) return false;
      return true;
    });
    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [age, skills, budget]);

  const suggestedKit = age ? PLAY_KITS.find((k) => k.id === KIT_FOR_AGE[age]) : undefined;
  const budgetLabel = BUDGETS.find((b) => b.max === budget)?.label;

  function toggleSkill(skill: SkillTag) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function restart() {
    setStep(0);
    setAge(null);
    setSkills([]);
    setBudget(null);
  }

  return (
    <div className="content-shell reading-column pb-16">
      {/* progress */}
      <div className="mb-10 flex items-center gap-2" aria-hidden>
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-1.5">
            <div className={`h-1 ${i <= step ? "bg-navy" : "bg-hairline"}`} />
            <span className="tn-meta hidden sm:block">{label}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h1 className="tn-display-l mb-2 text-navy normal-case">What&apos;s their stage?</h1>
          <p className="tn-body-l mb-8 text-ink-muted">Pick the range closest to their age.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AGE_BANDS.map((band) => (
              <button
                key={band.id}
                type="button"
                onClick={() => {
                  setAge(band.id);
                  setStep(1);
                }}
                className={`border p-4 text-left transition-colors ${
                  age === band.id ? "border-navy bg-navy text-white" : "border-hairline hover:border-navy"
                }`}
              >
                <p className="text-sm font-bold">{band.rangeLabel}</p>
                <p className={`text-xs ${age === band.id ? "text-white/70" : "text-ink-muted"}`}>
                  {band.stageName}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h1 className="tn-display-l mb-2 text-navy normal-case">
            What skills matter most?
          </h1>
          <p className="tn-body-l mb-8 text-ink-muted">
            Pick as many as you like — or skip to see everything for their stage.
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <button key={skill} type="button" onClick={() => toggleSkill(skill)}>
                <Badge variant={skills.includes(skill) ? "filterActive" : "filter"}>
                  {skill}
                </Badge>
              </button>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(0)}>
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>
            <Button onClick={() => setStep(2)}>
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="tn-display-l mb-2 text-navy normal-case">What&apos;s your budget?</h1>
          <p className="tn-body-l mb-8 text-ink-muted">Per toy — you can always add more.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BUDGETS.map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => {
                  setBudget(b.max);
                  setStep(3);
                }}
                className={`border p-4 text-left text-sm font-bold transition-colors ${
                  budget === b.max
                    ? "border-navy bg-navy text-white"
                    : "border-hairline text-ink hover:border-navy"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <div className="mt-10">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="tn-display-l mb-3 text-navy normal-case">Your shortlist</h1>
          <div className="mb-8 flex flex-wrap gap-2">
            {ageBand && <Badge variant="filterActive">{ageBand.rangeLabel}</Badge>}
            {skills.map((s) => (
              <Badge key={s} variant="filter">
                {s}
              </Badge>
            ))}
            {budgetLabel && <Badge variant="filter">{budgetLabel}</Badge>}
          </div>

          {matches.length > 0 ? (
            <ProductGrid products={matches} />
          ) : (
            <p className="tn-body text-ink-muted">
              No exact matches for that combination — try widening the budget or clearing a
              skill.
            </p>
          )}

          {suggestedKit && (
            <div className="mt-10">
              <p className="tn-label mb-4 text-accent-red">Or bundle & save</p>
              <div className={`flex max-w-sm flex-col ${SURFACE_BG[suggestedKit.surface]}`}>
                <div className="aspect-video w-full">
                  <PlaceholderMedia label={suggestedKit.placeholderLabel} className="bg-black/10" />
                </div>
                <div className="p-5">
                  <p className={`tn-product-name text-lg ${SURFACE_INK[suggestedKit.surface]}`}>
                    {suggestedKit.name}
                  </p>
                  <p className={`tn-body text-sm mt-1 ${SURFACE_MUTED_INK[suggestedKit.surface]}`}>
                    {suggestedKit.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`tn-price text-lg ${SURFACE_INK[suggestedKit.surface]}`}>
                      {formatINR(suggestedKit.priceInPaise)}
                    </span>
                    <Button
                      variant="onNavy"
                      size="sm"
                      className="bg-white text-navy hover:bg-cream"
                      asChild
                    >
                      <Link href={`/collection?kit=${suggestedKit.id}`}>
                        <Sparkles className="size-3.5" aria-hidden />
                        Explore kit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={restart}>
              Start over
            </Button>
            <Button asChild>
              <Link href={`/collection?age=${age ?? ""}`}>
                View all matches
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
