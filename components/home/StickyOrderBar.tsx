"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryPlatforms from "@/components/shared/DeliveryPlatforms";
import { cn } from "@/lib/utils";

/** Floating "order" bar that appears after the hero and hides near the closing CTA. */
export default function StickyOrderBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const doc = document.documentElement.scrollHeight;
        const pastHero = y > vh * 0.85;
        const nearBottom = y + vh > doc - 660;
        setShow(pastHero && !nearBottom);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const visible = show && !dismissed;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 hidden transition-transform duration-300 ease-out motion-reduce:transition-none md:block",
        visible ? "translate-y-0" : "translate-y-[140%]",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-brand-light/15 bg-brand-dark/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="font-serif text-base text-brand-light">Hungry now?</p>
            <p className="font-sans text-xs text-brand-light/70">
              Order from the kitchen, or your favourite app.
            </p>
          </div>

          <div className="hidden md:flex">
            <DeliveryPlatforms variant="bar" label="" tabIndex={visible ? 0 : -1} />
          </div>

          <Button
            asChild
            size="lg"
            className="min-h-11 flex-1 bg-brand text-brand-light hover:bg-brand-hover sm:flex-none"
          >
            <Link href="/kitchen/menu" tabIndex={visible ? 0 : -1}>
              See the menu
            </Link>
          </Button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss order bar"
            tabIndex={visible ? 0 : -1}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-brand-light/60 transition-colors hover:bg-brand-light/10 hover:text-brand-light"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
