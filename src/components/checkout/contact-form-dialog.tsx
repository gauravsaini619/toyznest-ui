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
import { useContact, type ContactInfo } from "@/lib/contact-context";

export function ContactFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { contact, updateContact } = useContact();
  const [form, setForm] = useState<ContactInfo>(contact);

  useEffect(() => {
    // Reset the form to the current contact whenever the dialog opens.
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(contact);
    }
  }, [open, contact]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateContact(form);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit contact details</DialogTitle>
          <DialogDescription>
            Used for order updates and delivery coordination.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="contact-name" className="mb-1.5">
              Full name
            </Label>
            <Input
              id="contact-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="contact-phone" className="mb-1.5">
              Phone
            </Label>
            <Input
              id="contact-phone"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="contact-email" className="mb-1.5">
              Email
            </Label>
            <Input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>

          <Button type="submit" size="commerce" className="mt-1">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
