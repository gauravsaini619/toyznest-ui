import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Shield, Leaf, Truck, RotateCcw } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import {
  FOOTER_LINK_GROUPS,
  FOOTER_PROMISE_ITEMS,
  FOOTER_CONTACT,
} from "@/lib/data/nav";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";

const PROMISE_ICONS = { shield: Shield, leaf: Leaf, truck: Truck, returns: RotateCcw };

const SOCIAL_LINKS = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "WhatsApp", icon: FaWhatsapp },
  { label: "YouTube", icon: FaYoutube },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function SiteFooter() {
  return (
    <footer>
      {/* Delivery & safety promise bar */}
      <div className="bg-navy text-white">
        <div className="content-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_PROMISE_ITEMS.map((item, i) => {
            const Icon = PROMISE_ICONS[item.icon];
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3 py-5 lg:py-6 lg:px-6 ${
                  i % 2 === 1 ? "sm:border-l sm:border-white/15" : ""
                } ${i > 0 ? "lg:border-l lg:border-white/15" : "lg:border-l-0"}`}
              >
                <Icon className="size-6 shrink-0 text-accent-yellow" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/60">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main footer */}
      <div className="relative overflow-hidden bg-navy-deep text-white">
        <div className="content-shell relative z-10 py-12 lg:py-16">
          {/* Newsletter */}
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="tn-display-m text-white">play ideas, once a month.</h2>
              <p className="tn-body mt-2 max-w-md text-white/70">
                Stage-by-stage activities from our child-development panel. No
                spam, unsubscribe any time.
              </p>
            </div>
            <FooterNewsletterForm />
          </div>

          <div className="my-10 border-t border-white/15 lg:my-12" />

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div className="max-w-xs">
              <Link href="/" className="inline-flex items-center" aria-label="Toyznest — home">
                <Image
                  src="/images/toyznest-mark.png"
                  alt="Toyznest"
                  width={751}
                  height={258}
                  className="h-9 w-auto brightness-0 invert"
                />
              </Link>
              <p className="tn-body mt-4 text-white/70">
                Developmental toys for 0–6 years — mapped to real stages,
                expert-reviewed, safety-tested. Made &amp; loved in India.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                <li>
                  <a
                    href={`mailto:${FOOTER_CONTACT.email}`}
                    className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white"
                  >
                    <Mail className="size-4 shrink-0 text-accent-yellow" aria-hidden />
                    {FOOTER_CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${FOOTER_CONTACT.whatsapp.replace(/\D/g, "")}`}
                    className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white"
                  >
                    <FaWhatsapp className="size-4 shrink-0 text-accent-yellow" aria-hidden />
                    WhatsApp {FOOTER_CONTACT.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/85">
                  <MapPin className="size-4 shrink-0 text-accent-yellow" aria-hidden />
                  {FOOTER_CONTACT.location}
                </li>
              </ul>
            </div>

            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="tn-label mb-4 flex items-center gap-2 text-white/70">
                  <span className="h-px w-4 bg-accent-yellow" aria-hidden />
                  {group.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="tn-body text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative watermark */}
        <p
          aria-hidden
          className="tn-display-xl pointer-events-none absolute -bottom-6 left-0 w-full translate-y-1 text-[18vw] leading-none text-white/[0.04] select-none"
        >
          toyznest
        </p>

        <div className="relative z-10 border-t border-white/15">
          <div className="content-shell flex flex-col-reverse items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="tn-meta text-white/60">
              © {new Date().getFullYear()} Toyznest · Made &amp; tested in India
            </p>
            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="tn-meta text-white/60 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Toyznest on ${label}`}
                  className="flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                >
                  <Icon className="size-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
