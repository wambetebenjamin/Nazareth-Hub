"use client";

import { motion } from "framer-motion";
import { amenities } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 16 effect 4: amenity icon fade-in stagger. */
export function Amenities() {
  return (
    <section className="ftco-section" aria-labelledby="amenities-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Amenities"
          title="Everything included,"
          highlight="nothing bolted on"
          description="One membership, every amenity. No surprise line items at the end of the month."
        />
        <h2 id="amenities-heading" className="sr-only">
          Amenities
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.12, ease: "easeOut" }}
                className="rounded-lg border border-black/5 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.05)]"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.12 + 0.1 }}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <Icon size={22} aria-hidden="true" />
                </motion.span>
                <h3 className="text-base font-bold text-heading">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{a.detail}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
