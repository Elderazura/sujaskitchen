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
    "min-h-11 cursor-pointer rounded-lg px-8 font-sans text-base transition-colors duration-200",
    variant === "default" &&
      "bg-brand text-brand-light shadow-md hover:bg-brand-hover",
    variant === "outline" &&
      "border border-current bg-transparent shadow-none",
    variant === "secondary" && "bg-secondary text-secondary-foreground",
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
