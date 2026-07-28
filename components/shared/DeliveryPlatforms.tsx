import { UtensilsCrossed } from "lucide-react";
import {
  DELIVERY_PLATFORMS,
  type DeliveryPlatform,
} from "@/lib/deliveryPlatforms";
import { cn } from "@/lib/utils";

type Variant = "inline" | "bar" | "onDark";

type LinkProps = {
  platform: DeliveryPlatform;
  onDark: boolean;
  tabIndex?: number;
  compact?: boolean;
};

function DeliveryPlatformLink({
  platform,
  onDark,
  tabIndex,
  compact = false,
}: LinkProps) {
  const pill = onDark
    ? "border-brand-light/20 bg-white/95 hover:border-brand-gold hover:bg-white"
    : "border-brand-dark/12 bg-white hover:border-brand hover:shadow-sm";

  return (
    <a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      aria-label={`Order on ${platform.name}`}
      className={cn(
        "inline-flex min-h-9 items-center justify-center rounded-full border transition-colors duration-200",
        platform.logo
          ? cn(pill, compact ? "px-2 py-1.5" : "px-3.5 py-2")
          : cn(
              "px-3.5 font-sans text-sm font-semibold",
              onDark
                ? "border-brand-light/25 text-brand-light hover:border-brand-gold hover:text-brand-gold"
                : "border-brand-dark/15 text-brand-dark hover:border-brand hover:text-brand",
            ),
      )}
    >
      {platform.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={platform.logo}
          alt=""
          width={platform.logoWidth ?? 72}
          height={20}
          className={cn(
            "block h-5 w-auto max-w-[5.5rem] object-contain object-center",
            compact && "h-4 max-w-[3.5rem]",
          )}
        />
      ) : (
        platform.name
      )}
    </a>
  );
}

/**
 * "Order on" row of delivery-app links — logos where available, text chips otherwise.
 */
export default function DeliveryPlatforms({
  variant = "inline",
  className,
  label = "Order on",
  tabIndex,
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  tabIndex?: number;
}) {
  const onDark = variant === "onDark" || variant === "bar";
  const compact = variant === "bar";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2",
        variant === "bar" && "gap-2",
        className,
      )}
    >
      {label ? (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-wide",
            onDark ? "text-brand-light/70" : "text-brand-mid",
          )}
        >
          <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
          {label}
        </span>
      ) : null}
      <ul className="flex flex-wrap items-center gap-2">
        {DELIVERY_PLATFORMS.map((p) => (
          <li key={p.name}>
            <DeliveryPlatformLink
              platform={p}
              onDark={onDark}
              tabIndex={tabIndex}
              compact={compact}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
