import type { Metadata } from "next";
import { MOCK_ACCOUNT } from "@/lib/data/account";

export const metadata: Metadata = {
  title: "Settings",
};

const ROWS = [
  { label: "Name", value: MOCK_ACCOUNT.name },
  { label: "Phone", value: MOCK_ACCOUNT.phone },
  { label: "Email", value: MOCK_ACCOUNT.email },
  { label: "Member since", value: MOCK_ACCOUNT.memberSince },
];

export default function SettingsPage() {
  return (
    <div>
      <h2 className="tn-display-m mb-6 text-navy">settings</h2>
      <div className="border border-hairline bg-white">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-4 last:border-b-0"
          >
            <span className="tn-label text-ink-muted">{row.label}</span>
            <span className="tn-body font-semibold text-ink">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
