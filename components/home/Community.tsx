import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { memberLogos } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 7 home section: community paragraph plus fictional member logos. */
export function Community() {
  return (
    <section className="ftco-section bg-light" aria-labelledby="community-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              subheading="Community"
              title="Three hundred members,"
              highlight="one long corridor"
            />
            <h2 id="community-heading" className="sr-only">
              Community
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed">
              Nazareth Hub is a working community of freelancers, startups and remote
              workers from across Nairobi and beyond. Data scientists share the coffee
              queue with brand studios, healthtech product managers book the same
              phone booths as freelance accountants. Members hire each other, refer
              each other and, once a month, pitch to each other on the rooftop.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed">
              Opt in to the member directory and your profile appears to every other
              member, which is how most of our internal collaborations start.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/community" className="btn btn-primary px-6 py-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  Meet the members
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="/events"
                className="btn btn-primary btn-outline-primary px-6 py-3 text-sm"
              >
                See what is on
              </Link>
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-lg lg:h-96">
            <Image
              src="/images/team-three-professionals.jpg"
              alt="Three Nazareth Hub members collaborating around a laptop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-body">
            Teams working from Nazareth Hub
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {memberLogos.map((logo) => (
              <li
                key={logo}
                className="flex h-16 items-center justify-center rounded-md border border-black/5 bg-white px-3 text-center text-sm font-bold tracking-tight text-darken/60"
              >
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
