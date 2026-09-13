import { Truck, Tag, Gift, Star, Zap } from "lucide-react";
import { TICKER_MESSAGES } from "@/lib/data/nav";

const ICONS = [Truck, Tag, Gift, Star, Zap];

function TickerItems() {
  return (
    <>
      {TICKER_MESSAGES.map((message, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <span
            key={message}
            className="flex shrink-0 items-center gap-2 px-6"
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
            {message}
          </span>
        );
      })}
    </>
  );
}

export function TopTicker() {
  return (
    <div className="overflow-hidden bg-navy text-white">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] py-2 font-sans text-[13px] font-semibold whitespace-nowrap text-white">
        <TickerItems />
        <TickerItems />
      </div>
    </div>
  );
}
