"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductPincodeCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setResult("Enter a valid 6-digit pincode.");
      return;
    }
    const isDelhiNcr = /^(11|12[0-3])/.test(pincode);
    setResult(
      isDelhiNcr
        ? "Same-day delivery available — order before 2 PM."
        : "Delivers in 2–4 days to this pincode."
    );
  }

  return (
    <div className="bg-sand px-5 py-4">
      <p className="flex items-center gap-2 text-sm font-bold text-navy">
        <MapPin className="size-4 shrink-0" aria-hidden />
        Pan-India delivery in 2–4 days. Check yours now!
      </p>
      <form onSubmit={handleCheck} className="mt-3 flex gap-0">
        <Input
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult(null);
          }}
          inputMode="numeric"
          placeholder="Pincode"
          aria-label="Pincode"
          className="bg-white"
        />
        <Button type="submit" size="default">
          Check
        </Button>
      </form>
      {result && <p className="tn-meta mt-2 text-ink">{result}</p>}
    </div>
  );
}
