import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

/** Shared horizontal grid — matches Navigation max-width and padding. */
export function PageShell({
  children,
  className,
  as: Component = "div",
}: PageShellProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
};

/** Standard vertical section with aligned inner shell. */
export function PageSection({
  children,
  className,
  innerClassName,
  style,
}: PageSectionProps) {
  return (
    <section className={cn("section-y overflow-x-clip", className)} style={style}>
      <PageShell className={innerClassName}>{children}</PageShell>
    </section>
  );
}
