"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "toyznest-welcome-seen";

/**
 * Welcome popup (Design System 05 · Overlays).
 * "On first load only, delivery promise + photo, dismissible."
 */
export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        const id = setTimeout(() => setOpen(true), 700);
        return () => clearTimeout(id);
      }
    } catch {
      // sessionStorage unavailable (private mode) — skip the popup silently.
    }
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src="/images/toys-delivered.png"
            alt="A delivery partner handing a Toyznest box to a smiling child at the door, her mother beside her"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 32rem, 100vw"
            priority
          />
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Free same-day delivery in Delhi/NCR</DialogTitle>
            <DialogDescription>
              Place your order before 3pm on orders above ₹1,200 and it
              reaches you the same day — gift-wrapped on request.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="mt-5 w-full"
            size="commerce"
            onClick={() => handleOpenChange(false)}
            asChild
          >
            <Link href="/collection">Continue shopping</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
