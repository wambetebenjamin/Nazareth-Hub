"use client";

import { site } from "@/lib/site";

/** Root error boundary, branded to match /500. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Montserrat, Arial, sans-serif",
          background: "#f8f9fa",
          color: "#999999",
          margin: 0,
        }}
      >
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p
              style={{
                color: "#323edd",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: 13,
              }}
            >
              Error 500
            </p>
            <h1
              style={{
                color: "rgba(0,0,0,0.8)",
                fontSize: 40,
                fontWeight: 800,
                margin: "12px 0",
              }}
            >
              The lights flickered on this floor.
            </h1>
            <p style={{ lineHeight: 1.7 }}>
              An unexpected error stopped the page from loading. Reload to try again,
              or message the front desk on WhatsApp at {site.whatsapp.display}.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: 24,
                background: "#323edd",
                color: "#fff",
                border: "none",
                borderRadius: 3,
                padding: "14px 28px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try Again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
