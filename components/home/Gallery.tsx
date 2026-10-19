"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 7 gallery: masonry photo grid. STEP 16 effect 3: staggered entrance. */
export function Gallery() {
  return (
    <section id="gallery" className="ftco-section bg-light" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Gallery"
          title="Tour the space,"
          highlight="floor by floor"
          description="From the open plan at 8 am to the rooftop at 8 pm. Scroll the grid, then come and see it in person."
        />
        <h2 id="gallery-heading" className="sr-only">
          Gallery
        </h2>

        <div className="masonry mt-12">
          {gallery.map((g, i) => (
            <motion.figure
              key={g.src + i}
              className={g.span}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.1, ease: "easeOut" }}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-darken/80 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100">
                {g.alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
