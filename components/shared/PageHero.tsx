import ParallaxBanner from "@/components/ParallaxBanner";
import { PageShell } from "@/components/shared/PageShell";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { cn } from "@/lib/utils";

/**
 * Shared editorial page hero — full-bleed photography, directional scrim,
 * gold eyebrow rule, Fraunces display title. Matches the homepage/kitchen hero.
 */
export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <ParallaxBanner
      image={image}
      alt={alt}
      className={cn(
        "flex min-h-[60vh] items-end md:min-h-[72vh]",
        className,
      )}
    >
      {/* Directional scrim: copy anchored bottom-left, food/scene legible above-right */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(96deg, rgba(22,12,8,0.82) 0%, rgba(22,12,8,0.6) 38%, rgba(22,12,8,0.28) 62%, rgba(22,12,8,0) 82%), linear-gradient(to top, rgba(22,12,8,0.72) 0%, rgba(22,12,8,0) 42%)",
        }}
        aria-hidden
      />
      <PageShell className="relative z-10 w-full pb-12 pt-28 md:pb-20 md:pt-36">
        <div className="max-w-3xl">
          {eyebrow ? (
            <SectionEyebrow className="flex items-center gap-3 text-brand-light [text-shadow:0_1px_16px_rgba(20,11,8,0.5)]">
              <span className="h-px w-7 bg-brand-gold" aria-hidden />
              {eyebrow}
            </SectionEyebrow>
          ) : null}
          <h1
            className={cn(
              "text-display mt-4 text-[clamp(2.4rem,1.4rem+4vw,4.5rem)] text-brand-light",
              "[text-shadow:0_1px_20px_rgba(20,11,8,0.55),0_1px_2px_rgba(20,11,8,0.4)]",
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-brand-light/85 md:text-lg [text-shadow:0_1px_16px_rgba(20,11,8,0.5)]">
              {subtitle}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {actions}
            </div>
          ) : null}
        </div>
      </PageShell>
    </ParallaxBanner>
  );
}
