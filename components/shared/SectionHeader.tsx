import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  meta,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <SectionEyebrow className={eyebrowClassName}>{eyebrow}</SectionEyebrow>
      ) : null}
      {meta ? <div className="mt-1">{meta}</div> : null}
      <h2 className={cn("text-section mt-3 text-3xl md:text-4xl", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <div className={cn("text-body-editorial mt-4", descriptionClassName)}>
          {description}
        </div>
      ) : null}
    </header>
  );
}
