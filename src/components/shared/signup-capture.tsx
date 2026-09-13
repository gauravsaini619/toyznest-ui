"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * One site-wide capture band (Design System 06 · Patterns → Signup capture).
 * Not mounted on the homepage: the floating OfferPill already owns the one
 * email ask this page gets ("never two email asks on the same page"). Kept
 * here for pages that don't render the offer pill — currently the PDP.
 */
export function SignupCapture() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a Convex mutation, e.g. api.signups.create
    setSubmitted(true);
  }

  return (
    <section className="bg-white py-14">
      <div className="content-shell grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xl font-extrabold text-ink">
            We did all the research so you don&apos;t have to
          </p>
          <p className="tn-body mt-2 max-w-sm text-ink-muted">
            Sign up for Toyznest emails to receive activity ideas, helpful
            child development info, and exciting product updates.
          </p>
        </div>

        {submitted ? (
          <p className="tn-product-name text-lg text-navy normal-case">
            You&apos;re on the list — check your inbox for a confirmation.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label className="mb-1.5 text-sm font-bold text-ink">
                Your child&apos;s birth date / due date (optional)
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Month" aria-label="Birth month" />
                <Input placeholder="Day" aria-label="Birth day" />
                <Input placeholder="Year" aria-label="Birth year" />
              </div>
            </div>
            <div>
              <Label htmlFor="signup-email" className="mb-1.5 text-sm font-bold text-ink">
                Email Address
              </Label>
              <Input
                id="signup-email"
                type="email"
                required
                placeholder="name@email.com"
              />
            </div>
            <Button type="submit" className="self-start">
              Sign Up
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
