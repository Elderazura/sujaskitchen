import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeliveryPlatforms from "@/components/shared/DeliveryPlatforms";

/**
 * Always-visible mobile ordering bar, fixed to the bottom of the screen.
 * Site-wide (mounted in the root layout); hidden on md+ where the desktop
 * StickyOrderBar / in-page CTAs take over.
 */
export default function MobileOrderBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 transform-gpu border-t border-brand-light/15 bg-brand-dark [backface-visibility:hidden] md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        willChange: "transform",
      }}
    >
      <div className="px-3 pb-2 pt-2.5">
        <Button
          asChild
          className="min-h-11 w-full bg-brand text-brand-light hover:bg-brand-hover"
        >
          <Link href="/kitchen/menu">See the menu</Link>
        </Button>
        <div className="mt-2 flex justify-center">
          <DeliveryPlatforms variant="bar" label="" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
