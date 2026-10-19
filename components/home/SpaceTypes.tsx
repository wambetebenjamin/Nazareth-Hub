"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Armchair, Check, Clock3, DoorClosed } from "lucide-react";
import Image from "next/image";
import { spaceTypes } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 7 home section: three space cards with rates and included amenities.
 *  STEP 16 effect 2: hover lift with Framer Motion. */
const HOME_CARDS = [
  { slug: "hot-desk", icon: Armchair, rates: ["Daily: KES 1,500 per desk", "Monthly: KES 18,000 unlimited days"] },
  { slug: "private-office", icon: DoorClosed, rates: ["Monthly from KES 65,000", "Studios, suites and full floors"] },
  { slug: "meeting-room", icon: Clock3, rates: ["Hourly from KES 2,500", "Three rooms, 4 to 16 seats"] },
];

export function SpaceTypes() {
  return (
    <section className="ftco-section bg-light" aria-labelledby="space-types-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Our spaces"
          title="Pick the desk that"
          highlight="fits your week"
          description="Three ways to work with us, all bookable online in under two minutes. Every option includes the fibre, the coffee and the community."
        />
        <h2 id="space-types-heading" className="sr-only">
          Space types
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOME_CARDS.map((card, i) => {
            const space = spaceTypes.find((s) => s.slug === card.slug)!;
            const Icon = card.icon;
            return (
              <motion.article
                key={card.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_5px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-heading">{space.name}</h3>
                  <p className="mt-1 text-sm">{space.short}</p>

                  <ul className="mt-4 space-y-1.5 text-sm">
                    {card.rates.map((r) => (
                      <li key={r} className="flex items-start gap-2 font-semibold text-primary">
                        <Check size={16} className="mt-1 flex-none" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-body">
                    Included
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {space.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={15} className="mt-1 flex-none text-secondary" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-3 pt-2">
                    <Link href="/booking" className="btn btn-primary px-4 py-2 text-sm">
                      Book now
                    </Link>
                    <Link
                      href={`/spaces#${space.slug}`}
                      className="btn btn-primary btn-outline-primary px-4 py-2 text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
