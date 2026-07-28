import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function SnibblesBand() {
  return (
    <PageSection className="bg-brand-dark">
      <SectionHeader
        title="Snibbles"
        description="Kerala snacks. For chaya time. And every moment after."
        titleClassName="text-brand-light"
        descriptionClassName="text-brand-light/75"
        className="max-w-xl"
      />
      <Button
        className="mt-8 bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
        size="lg"
        asChild
      >
        <Link href="/snibbles">Meet Snibbles</Link>
      </Button>
    </PageSection>
  );
}
