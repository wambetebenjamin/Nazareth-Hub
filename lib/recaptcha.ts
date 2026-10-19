/**
 * reCAPTCHA v3 verification (STEP 12).
 *
 * Client submits a v3 action token. The server posts it to Google and returns the
 * score. A score of 0.5 or above passes silently; below 0.5 the client must
 * complete the v2 checkbox fallback and re-submit with a v2 token.
 *
 * When NEXT_PUBLIC_RECAPTCHA_SITE_KEY / RECAPTCHA_SECRET_KEY are not configured
 * (local development, preview environments) verification passes through in
 * "open" mode so every form remains testable.
 */

export type RecaptchaMode = "v3" | "v2" | "open";

export type RecaptchaResult = {
  ok: boolean;
  mode: RecaptchaMode;
  score: number | null;
  reason?: string;
};

export const recaptchaConfigured = Boolean(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.RECAPTCHA_SECRET_KEY
);

export const V3_THRESHOLD = 0.5;

export async function verifyRecaptcha(
  token: string | null | undefined,
  kind: "v3" | "v2"
): Promise<RecaptchaResult> {
  if (!recaptchaConfigured) {
    return { ok: true, mode: "open", score: null, reason: "recaptcha-not-configured" };
  }

  if (!token) {
    return { ok: false, mode: kind, score: null, reason: "missing-token" };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY as string,
        response: token,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, mode: kind, score: null, reason: `http-${res.status}` };
    }

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
    };

    if (!data.success) {
      return { ok: false, mode: kind, score: data.score ?? null, reason: "failed" };
    }

    if (kind === "v2") {
      return { ok: true, mode: "v2", score: null };
    }

    const score = data.score ?? 0;
    if (score < V3_THRESHOLD) {
      return { ok: false, mode: "v3", score, reason: "low-score" };
    }

    return { ok: true, mode: "v3", score };
  } catch (err) {
    return {
      ok: false,
      mode: kind,
      score: null,
      reason: err instanceof Error ? err.message : "network-error",
    };
  }
}
