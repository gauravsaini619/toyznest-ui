export function ProductLiveActivity({
  liveViewers,
  boughtToday,
}: {
  liveViewers: number;
  boughtToday: number;
}) {
  return (
    <div className="flex items-start gap-2.5 bg-sand px-4 py-3">
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent-red" aria-hidden />
      <div>
        <p className="text-sm font-bold text-ink">
          {liveViewers} parents are viewing this now
        </p>
        <p className="text-sm text-ink-muted">{boughtToday} bought it today</p>
      </div>
    </div>
  );
}
