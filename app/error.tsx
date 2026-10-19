"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle, RotateCcw, TriangleAlert } from "lucide-react";
import { site } from "@/lib/site";

/** STEP 7 /500: branded, Try Again, WhatsApp number. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[nazareth-hub] page error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-cloud">
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <TriangleAlert size={44} aria-hidden="true" />
        </span>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Error 500
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-heading md:text-5xl">
          The lights flickered on this floor.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed">
          Something went wrong on our side while loading this page. Try again, and if
          it persists message the front desk on WhatsApp at {site.whatsapp.display} and
          we will sort it out while you grab a coffee.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-body">Reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className="btn btn-primary px-6 py-3">
            <span className="inline-flex items-center gap-2">
              <RotateCcw size={17} aria-hidden="true" />
              Try Again
            </span>
          </button>
          <a
            href={site.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-outline-primary px-6 py-3"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp {site.whatsapp.display}
            </span>
          </a>
          <Link href="/" className="px-4 py-3 text-sm font-semibold text-primary underline">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
