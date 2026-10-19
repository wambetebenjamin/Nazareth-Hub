"use client";

import { useConsent } from "@/store/consent";

/** Footer link that reopens the consent banner. */
export function CookieManager() {
  const reset = useConsent((s) => s.reset);
  return (
    <button
      type="button"
      onClick={() => {
        reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="py-2 text-left text-sm underline decoration-white/30 underline-offset-4 hover:text-white"
    >
      Manage cookies
    </button>
  );
}
