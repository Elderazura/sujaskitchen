import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SnibblesBand() {
  return (
    <section className="bg-[#0c0a09] px-6 py-14 text-center md:px-16">
      <h2 className="font-serif text-3xl text-amber-300 md:text-4xl">
        Snibbles
      </h2>
      <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-stone-400 md:text-base">
        Kerala snacks. For the 4pm moment. And every moment after.
      </p>
      <Button
        className="mt-8 bg-amber-400 text-stone-950 hover:bg-amber-300"
        size="lg"
        asChild
      >
        <Link href="/snibbles">Meet Snibbles</Link>
      </Button>
    </section>
  );
}
