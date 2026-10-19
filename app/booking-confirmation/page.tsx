"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Download, MessageCircle } from "lucide-react";
import QRCode from "qrcode";
import { useBookingStore } from "@/store/booking";
import { site } from "@/lib/site";
import { formatKES, prettyDate } from "@/lib/booking";

/**
 * STEP 7 /booking-confirmation: booking reference, space type, date, time,
 * total paid, QR access pass (qrcode) and PDF download (jsPDF + html2canvas).
 */
export default function BookingConfirmationPage() {
  const last = useBookingStore((s) => s.last);
  const [qr, setQr] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!last) return;
    const payload = JSON.stringify({
      ref: last.ref,
      spaceType: last.spaceType,
      date: last.date,
      time: last.time,
      total: last.total,
      holder: last.email,
    });
    QRCode.toDataURL(payload, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 320,
      color: { dark: "#090f35", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(null));
  }, [last]);

  const downloadPdf = async () => {
    if (!receiptRef.current || !last) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 40;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save(`nazareth-hub-${last.ref}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  if (!last) {
    return (
      <section className="flex min-h-[60vh] items-center bg-cloud">
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="text-3xl font-extrabold text-heading">No booking yet</h1>
          <p className="mt-3 text-[15px]">
            Your confirmation appears here after you book. Start with a hot desk, a
            meeting room or an office enquiry.
          </p>
          <Link href="/booking" className="btn btn-primary mt-6 px-6 py-3">
            Go to booking
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ftco-section bg-light">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center">
          <span className="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#28a745]/10 text-[#28a745]">
            <BadgeCheck size={40} aria-hidden="true" />
          </span>
          <h1 className="text-3xl font-extrabold text-heading md:text-4xl">
            You are booked in, {last.name.split(" ")[0]}.
          </h1>
          <p className="mt-3 text-[15px]">
            A confirmation email is on its way to {last.email}, with a WhatsApp link for
            the front desk.
          </p>
        </div>

        <div
          ref={receiptRef}
          className="mt-10 rounded-xl border border-black/5 bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/5 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-body">
                Nazareth Hub receipt
              </p>
              <p className="mt-1 text-2xl font-extrabold text-primary">{last.ref}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-body">Space type</p>
              <p className="text-sm font-bold text-heading">{last.spaceType}</p>
            </div>
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-body">Date</dt>
              <dd className="mt-1 text-sm font-semibold text-heading">
                {last.date ? prettyDate(last.date) : "To be scheduled"}
                {last.endDate && last.endDate !== last.date ? ` to ${prettyDate(last.endDate)}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-body">Time</dt>
              <dd className="mt-1 text-sm font-semibold text-heading">
                {last.time ?? "Within opening hours"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-body">Details</dt>
              <dd className="mt-1 text-sm font-semibold text-heading">{last.detail}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-body">Total paid</dt>
              <dd className="mt-1 text-lg font-extrabold text-heading">
                {last.total === null ? "No payment due" : formatKES(last.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col items-center gap-3 border-t border-black/5 pt-6">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qr}
                alt={`QR access pass for booking ${last.ref}`}
                width={180}
                height={180}
                className="rounded-md border border-black/10"
              />
            ) : (
              <p className="text-sm text-body">QR pass unavailable in this browser.</p>
            )}
            <p className="text-center text-xs text-body">
              Show this QR code at the front desk for badge access. It encodes your
              reference, space type and dates.
            </p>
          </div>

          <div className="mt-6 hidden items-center gap-3 border-t border-black/5 pt-5 print:flex">
            <span className="relative h-10 w-10 overflow-hidden rounded">
              <Image src="/images/hero-coworking.jpg" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <p className="text-xs text-body">
              {site.address.full} | {site.phone}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => void downloadPdf()}
            disabled={exporting}
            className="btn btn-primary px-6 py-3 disabled:opacity-60"
          >
            <span className="inline-flex items-center gap-2">
              <Download size={17} aria-hidden="true" />
              {exporting ? "Preparing PDF..." : "Download as PDF"}
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
              Message the front desk
            </span>
          </a>
          <Link href="/account" className="px-4 py-3 text-sm font-semibold text-primary underline">
            View in my dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
