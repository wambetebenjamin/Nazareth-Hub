"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * STEP 12 reCAPTCHA v3 with a v2 checkbox fallback below a 0.5 score.
 *
 * When NEXT_PUBLIC_RECAPTCHA_SITE_KEY is unset the hook runs in "open" mode and
 * returns a placeholder token, so every form stays fully testable in
 * development and preview. Server side, lib/recaptcha.ts mirrors this.
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void }
      ) => number;
      reset: (id: number) => void;
    };
    onRecaptchaV2Loaded?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
export const recaptchaEnabled = Boolean(SITE_KEY);

let v3Promise: Promise<void> | null = null;
function loadV3(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!v3Promise) {
    v3Promise = new Promise((resolve, reject) => {
      if (document.querySelector("script[data-recaptcha-v3]")) return resolve();
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      s.async = true;
      s.defer = true;
      s.dataset.recaptchaV3 = "true";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("recaptcha-v3-load-failed"));
      document.head.appendChild(s);
    });
  }
  return v3Promise;
}

export type CaptchaToken = { token: string; kind: "v3" | "v2" };

export function useRecaptcha(action: string) {
  const getToken = useCallback(async (): Promise<CaptchaToken> => {
    if (!recaptchaEnabled) return { token: "open-mode", kind: "v3" };
    await loadV3();
    const token = await new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(async () => {
        try {
          resolve(await window.grecaptcha!.execute(SITE_KEY, { action }));
        } catch (err) {
          reject(err);
        }
      });
    });
    return { token, kind: "v3" };
  }, [action]);

  return { getToken, enabled: recaptchaEnabled };
}

/** v2 checkbox fallback, mounted when the server reports a score below 0.5. */
export function RecaptchaV2Fallback({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!recaptchaEnabled) return;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !holder.current || !window.grecaptcha) return;
      widgetId.current = window.grecaptcha.render(holder.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onToken(token),
      });
    };

    const loadV2 = () => {
      if (document.querySelector("script[data-recaptcha-v2]")) {
        window.onRecaptchaV2Loaded = renderWidget;
        return;
      }
      const s = document.createElement("script");
      s.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaV2Loaded&render=explicit";
      s.async = true;
      s.defer = true;
      s.dataset.recaptchaV2 = "true";
      s.onerror = () => setFailed(true);
      window.onRecaptchaV2Loaded = renderWidget;
      document.head.appendChild(s);
    };

    loadV2();
    return () => {
      cancelled = true;
    };
  }, [onToken]);

  if (!recaptchaEnabled) {
    return (
      <p className="rounded-md bg-cloud p-3 text-xs text-body">
        reCAPTCHA is not configured in this environment, so the checkbox fallback is
        skipped automatically.
      </p>
    );
  }

  if (failed) {
    return (
      <p className="rounded-md bg-cloud p-3 text-xs text-body">
        The checkbox could not load. Please try again, or message us on WhatsApp.
      </p>
    );
  }

  return (
    <div className="mt-3">
      <p className="mb-2 text-xs font-semibold text-heading">
        One more check: tick the box below.
      </p>
      <div ref={holder} />
    </div>
  );
}
