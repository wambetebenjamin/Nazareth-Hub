"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Settings2, ShieldCheck } from "lucide-react";
import { useConsent, type ConsentCategory } from "@/store/consent";

const CATEGORIES: {
  key: ConsentCategory;
  label: string;
  blurb: string;
  optional: boolean;
}[] = [
  {
    key: "necessary",
    label: "Necessary",
    blurb: "Session, security and consent memory. Always on, no opt out.",
    optional: false,
  },
  {
    key: "functional",
    label: "Functional",
    blurb: "Remembers booking drafts and your preferred tab on this device.",
    optional: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    blurb: "Anonymous usage counts so we know which rooms to add next.",
    optional: true,
  },
  {
    key: "marketing",
    label: "Marketing",
    blurb: "Measures our campaigns. We never sell personal data.",
    optional: true,
  },
];

export function CookieConsent() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState({
    functional: consent.functional,
    analytics: consent.analytics,
    marketing: consent.marketing,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const showBanner = !consent.decided || open;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.aside
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="p-6">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cookie size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-heading">Cookies on this site</h2>
                <p className="mt-1 text-sm leading-relaxed">
                  We use cookies to keep your session safe and, with your consent, to
                  understand how the space is used. Your choice is stored on this device
                  and processed under the Kenya Data Protection Act, 2019.
                </p>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 space-y-3 overflow-hidden"
                >
                  {CATEGORIES.map((c) => (
                    <li
                      key={c.key}
                      className="flex items-start justify-between gap-4 rounded-lg border border-black/5 bg-cloud p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-heading">{c.label}</p>
                        <p className="text-xs text-body">{c.blurb}</p>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-heading">
                        <input
                          type="checkbox"
                          disabled={!c.optional}
                          checked={
                            c.key === "necessary"
                              ? true
                              : prefs[c.key as "functional" | "analytics" | "marketing"]
                          }
                          onChange={(e) =>
                            setPrefs((p) => ({
                              ...p,
                              [c.key]: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 accent-[#323edd]"
                        />
                        {c.optional ? "Allow" : "Always on"}
                      </label>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn btn-primary px-5 py-2 text-sm"
                onClick={() => {
                  if (open) consent.savePreferences(prefs);
                  else consent.acceptAll();
                  setOpen(false);
                }}
              >
                {open ? "Save my choices" : "Accept all"}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-outline-primary px-5 py-2 text-sm"
                onClick={() => {
                  consent.rejectOptional();
                  setOpen(false);
                }}
              >
                Necessary only
              </button>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                onClick={() => {
                  setPrefs({
                    functional: consent.functional,
                    analytics: consent.analytics,
                    marketing: consent.marketing,
                  });
                  setOpen((v) => !v);
                }}
                aria-expanded={open}
              >
                <Settings2 size={16} aria-hidden="true" />
                {open ? "Close preferences" : "Preferences"}
              </button>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-body">
              <ShieldCheck size={14} aria-hidden="true" />
              Read the{" "}
              <a href="/legal/cookie-policy" className="underline">
                cookie policy
              </a>{" "}
              and the{" "}
              <a href="/legal/privacy-policy" className="underline">
                privacy policy
              </a>
              .
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
