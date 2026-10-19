import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spaceTypes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Space types",
  description:
    "Hot desks, dedicated desks, private offices, meeting rooms and event space at Nazareth Hub, Nairobi, with full pricing tables.",
};

export default function SpacesPage() {
  return (
    <>
      <PageHero
        crumb="Spaces"
        title="Five ways to take a seat"
        intro="Every space type below is furnished, connected and bookable online. Scroll for features, capacity and the full pricing table."
        image="/images/space-private-office.jpg"
      />

      {spaceTypes.map((space, i) => (
        <section
          key={space.slug}
          id={space.slug}
          className={`ftco-section scroll-mt-24 ${i % 2 === 1 ? "bg-light" : ""}`}
          aria-labelledby={`${space.slug}-heading`}
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-72 overflow-hidden rounded-xl lg:h-[420px]">
                <Image
                  src={space.image}
                  alt={space.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>

              <div>
                <SectionHeading
                  align="left"
                  subheading={space.rateLabel}
                  title={space.name}
                  highlight={`from ${space.price}`}
                />
                <h2 id={`${space.slug}-heading`} className="sr-only">
                  {space.name}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed">{space.description}</p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  Capacity: {space.capacity}
                </p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-1">
                  {space.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-1 flex-none text-secondary" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 overflow-hidden rounded-lg border border-black/5">
                  <table className="nh-table w-full bg-white text-sm">
                    <caption className="sr-only">{space.name} pricing table</caption>
                    <thead>
                      <tr>
                        <th scope="col">Option</th>
                        <th scope="col">Price</th>
                        <th scope="col">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {space.pricing.map((p) => (
                        <tr key={p.plan}>
                          <td className="font-semibold text-heading">{p.plan}</td>
                          <td className="font-bold text-primary">{p.price}</td>
                          <td className="text-body">{p.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/booking" className="btn btn-primary px-6 py-3 text-sm">
                    Book {space.name}
                  </Link>
                  <Link
                    href="/membership"
                    className="btn btn-primary btn-outline-primary px-6 py-3 text-sm"
                  >
                    Compare memberships
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
