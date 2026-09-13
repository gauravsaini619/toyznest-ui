"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * Offer pill → modal (Design System 05 · Overlays).
 * "Fixed bottom-left cream pill, 14px radius; opens the 15%-off capture."
 * "Only one viewport-anchored element at a time — the offer pill hides
 * itself on any view with a sticky buy bar." The homepage has no sticky
 * buy bar, so this always renders once dismissed state allows it.
 */
export function OfferPill() {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (dismissed) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a Convex mutation, e.g. api.signups.create
    setSubmitted(true);
  }

  return (
    <>
      <div className="fixed bottom-5 left-5 z-30 animate-enter-up">
        <div className="flex items-center gap-1 rounded-floating border border-hairline bg-cream pl-1 shadow-hover">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-floating px-4 py-3 text-sm font-bold text-navy"
          >
            <Sparkles className="size-4 text-accent-red" aria-hidden />
            Unlock 15% off
          </button>
          <button
            type="button"
            aria-label="Dismiss offer"
            onClick={() => setDismissed(true)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>You&apos;re in.</DialogTitle>
                <DialogDescription>
                  Check your inbox for your 15% off code — it&apos;s valid on
                  your first order.
                </DialogDescription>
              </DialogHeader>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Get 15% off your first order</DialogTitle>
                <DialogDescription>
                  Leave your email and we&apos;ll send a one-time code, plus
                  picks for your child&apos;s current stage.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="offer-email" className="mb-1.5">
                    Email
                  </Label>
                  <Input
                    id="offer-email"
                    type="email"
                    required
                    placeholder="name@email.com"
                    autoFocus
                  />
                </div>
                <Button type="submit" size="commerce">
                  Send my code
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
