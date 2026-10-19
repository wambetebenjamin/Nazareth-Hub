import Link from "next/link";
import { Armchair, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** STEP 7 /404: branded, desk icon, "This space does not exist.", Back to Home. */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cloud">
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Armchair size={44} aria-hidden="true" />
        </span>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-heading md:text-5xl">
          This space does not exist.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed">
          The desk you are looking for has been moved, renumbered or never booked.
          Head back to the open plan and we will find you a seat.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary px-6 py-3">
            <span className="inline-flex items-center gap-2">
              <Home size={17} aria-hidden="true" />
              Back to Home
            </span>
          </Link>
          <Link href="/booking" className="btn btn-primary btn-outline-primary px-6 py-3">
            Book a desk instead
          </Link>
        </div>
      </div>
    </section>
  );
}
