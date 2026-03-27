import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "default",
  className,
}: Props) {
  const isExternal = /^https?:\/\//i.test(href);
  const classes = cn(
    "min-h-11 rounded-lg px-8 font-sans text-base shadow-md",
    variant === "default" && "bg-brand text-white hover:bg-brand-hover",
    className,
  );

  if (isExternal) {
    return (
      <Button variant={variant} size="lg" className={classes} asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size="lg" className={classes} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
