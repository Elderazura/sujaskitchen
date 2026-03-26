import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SnibblesBand() {
  return (
    <section className="bg-brand-dark px-6 py-14 text-center md:px-16">
      <h2 className="font-serif text-3xl text-brand-light md:text-4xl">
        Snibbles
      </h2>
      <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-brand-light/75 md:text-base">
        Kerala snacks. For chaya time. And every moment after.
      </p>
      <Button
        className="mt-8 bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
        size="lg"
        asChild
      >
        <Link href="/snibbles">Meet Snibbles</Link>
      </Button>
    </section>
  );
}
