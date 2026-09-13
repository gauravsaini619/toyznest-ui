"use client";

import { useEffect, useState } from "react";
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
import type { SavedAddress } from "@/lib/data/addresses";
import { type AddressInput, useAddressBook } from "@/lib/addresses-context";

const BLANK: AddressInput = {
  label: "",
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export function AddressFormDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass an existing address to edit it; omit to add a new one. */
  editing?: SavedAddress | null;
}) {
  const { addAddress, updateAddress, setDefault } = useAddressBook();
  const [form, setForm] = useState<AddressInput>(BLANK);
  const [makeDefault, setMakeDefault] = useState(false);

  useEffect(() => {
    // Reset the form to the current record whenever the dialog opens —
    // syncing to an external open/editing prop, not derivable at render.
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(
        editing
          ? {
              label: editing.label,
              fullName: editing.fullName,
              phone: editing.phone,
              line1: editing.line1,
              line2: editing.line2 ?? "",
              city: editing.city,
              state: editing.state,
              pincode: editing.pincode,
            }
          : BLANK
      );
      setMakeDefault(editing?.isDefault ?? false);
    }
  }, [open, editing]);

  function set<K extends keyof AddressInput>(key: K, value: AddressInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateAddress(editing.id, form);
      if (makeDefault) setDefault(editing.id);
    } else {
      addAddress(form, makeDefault);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit address" : "Add a new address"}</DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the details for this address."
              : "Save an address so checkout is one tap next time."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="addr-label" className="mb-1.5">
                Label
              </Label>
              <Input
                id="addr-label"
                required
                placeholder="Home, Work…"
                value={form.label}
                onChange={(e) => set("label", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="addr-phone" className="mb-1.5">
                Phone
              </Label>
              <Input
                id="addr-phone"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="addr-name" className="mb-1.5">
              Full name
            </Label>
            <Input
              id="addr-name"
              required
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="addr-line1" className="mb-1.5">
              Address line 1
            </Label>
            <Input
              id="addr-line1"
              required
              value={form.line1}
              onChange={(e) => set("line1", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="addr-line2" className="mb-1.5">
              Address line 2 (optional)
            </Label>
            <Input
              id="addr-line2"
              value={form.line2}
              onChange={(e) => set("line2", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="addr-city" className="mb-1.5">
                City
              </Label>
              <Input
                id="addr-city"
                required
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="addr-state" className="mb-1.5">
                State
              </Label>
              <Input
                id="addr-state"
                required
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="addr-pincode" className="mb-1.5">
                Pincode
              </Label>
              <Input
                id="addr-pincode"
                required
                inputMode="numeric"
                value={form.pincode}
                onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={makeDefault}
              onChange={(e) => setMakeDefault(e.target.checked)}
              className="size-4 accent-navy"
            />
            Set as default address
          </label>

          <Button type="submit" size="commerce" className="mt-1">
            {editing ? "Save changes" : "Save address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
