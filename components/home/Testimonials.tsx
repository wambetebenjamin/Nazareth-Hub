import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 7 testimonials: three member quotes, rebuilt on `.testimony-wrap`. */
export function Testimonials() {
  return (
    <section className="ftco-section" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Members"
          title="In their own"
          highlight="words"
        />
        <h2 id="testimonials-heading" className="sr-only">
          Testimonials
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="testimony-wrap flex flex-col">
              <Quote size={26} className="text-secondary" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-heading">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full">
                  <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-heading">{t.name}</span>
                  <span className="block text-xs text-body">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
