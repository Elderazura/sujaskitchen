/** Skeleton shown while the client-only homepage bundle loads (avoids hydration fights with time-based UI). */
export default function HomePageLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light/40">
      <div
        className="h-20 w-full border-b border-brand-mid/20 bg-white/90"
        aria-hidden
      />
      <div className="relative min-h-[60svh] flex-1 bg-brand-mid/10" aria-hidden>
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-brand-mid/15 to-brand-light/40" />
      </div>
      <div className="h-32 bg-brand-light/50" aria-hidden />
    </div>
  );
}
