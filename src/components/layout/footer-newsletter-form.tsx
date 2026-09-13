"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FooterNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a Convex mutation, e.g. api.signups.create
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="tn-product-name w-full max-w-md text-lg text-white normal-case">
        You&apos;re on the list — check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-stretch gap-0"
    >
      <Input
        type="email"
        required
        placeholder="name@email.com"
        aria-label="Email"
        className="h-13 border-white/25 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white"
      />
      <Button type="submit" size="commerce" className="shrink-0 border-transparent bg-accent-yellow text-navy hover:bg-accent-yellow/90">
        Join
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
