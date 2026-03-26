"use client";

import { motion } from "framer-motion";
import { FEATURED_BY_TIME } from "@/lib/menuData";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedItems() {
  const { timeState, isNight } = useTimeOfDay();
  const items = FEATURED_BY_TIME[timeState];

  return (
    <section
      className="border-t border-black/5 px-6 py-14 md:px-16"
      style={{
        transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
      }}
    >
      <motion.div
        key={timeState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <p
          className={`font-sans text-sm uppercase tracking-widest ${
            isNight ? "text-stone-400" : "text-stone-500"
          }`}
        >
          Right now
        </p>
        <h2
          className={`mt-2 font-serif text-2xl md:text-3xl ${
            isNight ? "text-[#FEF3C7]" : "text-stone-900"
          }`}
        >
          Featured for this part of the day
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={`${timeState}-${item.name}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <Card
                className={
                  isNight
                    ? "border-stone-700 bg-stone-900/80"
                    : "border-stone-200 bg-white/80"
                }
              >
                <CardContent className="p-4">
                  <p
                    className={`font-serif text-lg ${
                      isNight ? "text-[#FEF3C7]" : "text-stone-900"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`mt-1 font-sans text-sm ${
                      isNight ? "text-stone-400" : "text-stone-600"
                    }`}
                  >
                    {item.note}
                  </p>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
