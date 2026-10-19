"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

/** STEP 15: fixed bottom-right, 56x56, z-index 9998, entrance pulse. */
export function WhatsAppButton() {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = window.setTimeout(() => setEntered(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href={site.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`fab fab-whatsapp ${entered ? "fab-enter" : ""}`}
      aria-label={`Chat with Nazareth Hub on WhatsApp at ${site.whatsapp.display}`}
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span className="fab-tooltip" role="tooltip">
        {site.whatsapp.tooltip}
      </span>
    </a>
  );
}
