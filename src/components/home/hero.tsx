"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/data/hero-slides";
import { HERO_AGE_QUICK_PICKS } from "@/lib/data/age-bands";
import { Button } from "@/components/ui/button";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

const DWELL_MS = 6000;

const TRUST_ITEMS = [
  "Curated for development",
  "Parent-approved picks",
  "Safe & age appropriate",
];

export function Hero() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive(((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy" aria-roledescription="carousel">
      <div className="relative min-h-[640px] lg:min-h-[600px]">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-[600ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
            aria-hidden={i !== active}
          >
            <div className="content-shell flex flex-col justify-center gap-6 py-14 lg:py-0 lg:pr-8">
              <p className="tn-label text-accent-yellow">{slide.eyebrow}</p>
              <h1 className="tn-display-xl text-white">
                {slide.headline}
                <br />
                <span className="text-accent-yellow">{slide.headlineAccent}</span>
              </h1>
              <p className="tn-body-l text-white/85">{slide.subcopy}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="onNavy" size="commerce" asChild>
                  <Link href="/collection">
                    Explore Toys
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button variant="outlineOnNavy" size="commerce" asChild>
                  <Link href="/collection">Shop by Age</Link>
                </Button>
                <Button
                  size="commerce"
                  className="border-transparent bg-accent-yellow text-navy hover:bg-accent-yellow/90"
                  asChild
                >
                  <Link href="/quiz">
                    <Sparkles className="size-4" aria-hidden />
                    Take the 60-second quiz
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1" aria-label="Shop by age">
                {HERO_AGE_QUICK_PICKS.map((pick) => (
                  <Link
                    key={pick.label}
                    href={pick.href}
                    className="flex h-11 min-w-11 items-center justify-center rounded-full bg-white px-3 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5"
                  >
                    {pick.label}
                  </Link>
                ))}
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-sm text-white/85"
                  >
                    <Check className="size-4 text-accent-yellow" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden min-h-[360px] lg:block">
              <PlaceholderMedia label={slide.placeholderLabel} className="bg-sand/90" />

              <div className="absolute top-6 right-6 flex overflow-hidden bg-accent-yellow text-navy shadow-hover">
                <span className="tn-label flex items-center px-4 py-3">
                  Bundle &amp; save
                </span>
                <span className="tn-label flex items-center bg-navy px-4 py-3 text-white">
                  Get 3 toys as a kit — save ₹200
                </span>
              </div>

              <div
                className="absolute bottom-8 left-8 size-28 overflow-hidden rounded-full border-4 border-white shadow-hover animate-toy-float"
                style={{ animationDelay: "0.4s" }}
              >
                <PlaceholderMedia label="teddy bear · 1:1" className="bg-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-shell absolute inset-x-0 bottom-6 hidden items-center justify-between lg:flex">
        <div className="flex gap-2" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="flex size-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="flex size-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
