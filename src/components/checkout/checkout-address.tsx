"use client";

import { useState } from "react";
import { MapPin, Pencil, Plus } from "lucide-react";
import { useAddressBook } from "@/lib/addresses-context";
import type { SavedAddress } from "@/lib/data/addresses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddressFormDialog } from "@/components/checkout/address-form-dialog";

export function CheckoutAddress() {
  const { addresses, selectedId, selectAddress } = useAddressBook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | null>(null);

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(address: SavedAddress) {
    setEditing(address);
    setDialogOpen(true);
  }

  return (
    <section className="border border-hairline bg-white p-6">
      <h2 className="tn-label mb-4 flex items-center gap-2 text-ink-muted">
        <MapPin className="size-4" aria-hidden />
        Delivery address
      </h2>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Delivery address">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
              selectedId === address.id ? "border-navy" : "border-hairline"
            }`}
          >
            <input
              type="radio"
              name="delivery-address"
              checked={selectedId === address.id}
              onChange={() => selectAddress(address.id)}
              className="mt-1 size-4 shrink-0 accent-navy"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="tn-product-name text-base text-navy normal-case">
                  {address.label}
                </p>
                {address.isDefault && <Badge variant="filter">Default</Badge>}
              </div>
              <p className="tn-body mt-1 text-ink">{address.fullName}</p>
              <p className="tn-body text-ink-muted">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
              </p>
              <p className="tn-body text-ink-muted">
                {address.city}, {address.state} – {address.pincode}
              </p>
              <p className="tn-meta mt-1">{address.phone}</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openEdit(address);
              }}
              className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-navy hover:underline"
            >
              <Pencil className="size-3.5" aria-hidden />
              Edit
            </button>
          </label>
        ))}
      </div>

      <Button variant="secondary" className="mt-4" onClick={openAdd}>
        <Plus className="size-4" aria-hidden />
        Add new address
      </Button>

      <AddressFormDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
    </section>
  );
}
