"use client";

import { useState } from "react";
import { User, Pencil } from "lucide-react";
import { useContact } from "@/lib/contact-context";
import { ContactFormDialog } from "@/components/checkout/contact-form-dialog";

export function CheckoutContact() {
  const { contact } = useContact();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="border border-hairline bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="tn-label flex items-center gap-2 text-ink-muted">
          <User className="size-4" aria-hidden />
          Contact
        </h2>
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-1.5 text-sm font-bold text-navy hover:underline"
        >
          <Pencil className="size-3.5" aria-hidden />
          Edit
        </button>
      </div>
      <p className="tn-body mt-4 text-ink">{contact.name}</p>
      <p className="tn-body text-ink-muted">
        {contact.phone} · {contact.email}
      </p>

      <ContactFormDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
}
