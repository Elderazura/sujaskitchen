"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Live countdown to a festival/order date. Renders nothing until mounted (no SSR flash). */
export default function SeasonalCountdown({
  targetIso,
  label,
  className,
}: {
  targetIso: string;
  label: string;
  className?: string;
}) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    if (!Number.isFinite(target)) return;
    const tick = () => setMs(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (ms === null || ms <= 0) return null;

  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const units = [
    { value: days, label: days === 1 ? "day" : "days" },
    { value: hours, label: "hrs" },
    { value: mins, label: "min" },
  ];

  return (
    <div className={cn("", className)}>
      <p className="text-eyebrow text-brand-gold">{label}</p>
      <div className="mt-3 flex gap-2.5">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-[4.25rem] rounded-xl border border-brand-gold/30 bg-black/30 px-3 py-2 text-center backdrop-blur-sm"
          >
            <div className="text-display text-2xl leading-none text-brand-light tabular-nums md:text-3xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-brand-light/70">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
