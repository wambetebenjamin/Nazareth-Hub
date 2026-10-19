import Link from "next/link";
import { Check, Mailbox } from "lucide-react";
import { virtualOffice } from "@/lib/data";

/** STEP 7 home section: virtual office package. */
export function VirtualOffice() {
  return (
    <section className="ftco-section bg-darken text-white" aria-labelledby="virtual-office-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-darken">
            <Mailbox size={26} aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            {virtualOffice.kicker}
          </p>
          <h2
            id="virtual-office-heading"
            className="mt-2 text-3xl font-bold text-white md:text-4xl"
          >
            {virtualOffice.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/80">
            {virtualOffice.description}
          </p>
          <p className="mt-5">
            <span className="text-3xl font-extrabold text-secondary">
              {virtualOffice.price}
            </span>{" "}
            <span className="text-sm text-white/70">{virtualOffice.priceNote}</span>
          </p>
          <div className="mt-6">
            <Link href="/booking" className="btn btn-secondary-solid px-6 py-3 text-sm">
              Enquire about a virtual office
            </Link>
          </div>
        </div>

        <ul className="space-y-3">
          {virtualOffice.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg bg-white/5 p-4 text-sm text-white/90"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-secondary text-darken">
                <Check size={14} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
