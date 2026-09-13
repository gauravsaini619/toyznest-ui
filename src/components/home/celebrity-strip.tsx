import { PlaceholderMedia } from "@/components/shared/placeholder-media";

export function CelebrityStrip() {
  return (
    <section className="border-y border-hairline bg-white py-10">
      <div className="content-shell flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="tn-label shrink-0 text-ink-muted">As seen in</p>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-full">
              <PlaceholderMedia label="press logo" aspect="4 / 1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
