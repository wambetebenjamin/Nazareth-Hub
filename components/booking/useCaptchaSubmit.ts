"use client";

import { useCallback, useRef, useState } from "react";
import { useRecaptcha } from "@/components/ui/ReCaptcha";

export type CaptchaSubmitState = {
  status: "idle" | "submitting" | "needs-v2" | "error";
  message: string | null;
};

type Result =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false };

/**
 * Shared submit pipeline (STEP 12): v3 token first; if the server answers 403
 * with a low score, surface the v2 checkbox and resubmit with the v2 token.
 */
export function useCaptchaSubmit(action: string) {
  const { getToken } = useRecaptcha(action);
  const [state, setState] = useState<CaptchaSubmitState>({
    status: "idle",
    message: null,
  });
  const pending = useRef<{ url: string; payload: Record<string, unknown> } | null>(null);

  const post = useCallback(
    async (
      url: string,
      payload: Record<string, unknown>,
      kind: "v3" | "v2",
      token: string
    ) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken: token, recaptchaKind: kind }),
      }),
    []
  );

  const handleResponse = useCallback(async (res: Response): Promise<Result | "needs-v2"> => {
    if (res.status === 403) {
      const detail = (await res.json().catch(() => ({}))) as { reason?: string };
      if (detail.reason === "low-score") return "needs-v2";
      setState({
        status: "error",
        message: "The spam check rejected this submission. Please retry.",
      });
      return { ok: false };
    }

    if (!res.ok) {
      const detail = (await res.json().catch(() => ({}))) as {
        message?: string;
        issues?: Record<string, string[]>;
      };
      const firstIssue = detail.issues ? Object.values(detail.issues).flat()[0] : null;
      setState({
        status: "error",
        message: firstIssue || detail.message || "Something went wrong. Please retry.",
      });
      return { ok: false };
    }

    const data = (await res.json()) as Record<string, unknown>;
    setState({ status: "idle", message: null });
    return { ok: true, data };
  }, []);

  const submit = useCallback(
    async (url: string, payload: Record<string, unknown>): Promise<Result> => {
      pending.current = { url, payload };
      setState({ status: "submitting", message: null });
      try {
        const first = await getToken();
        const res = await post(url, payload, first.kind, first.token);
        const handled = await handleResponse(res);
        if (handled === "needs-v2") {
          setState({
            status: "needs-v2",
            message: "One more check before we confirm. Tick the box, then we resubmit automatically.",
          });
          return { ok: false };
        }
        return handled;
      } catch {
        setState({ status: "error", message: "Network error. Check your connection and retry." });
        return { ok: false };
      }
    },
    [getToken, post, handleResponse]
  );

  /** Called by the v2 checkbox once the human tick passes. */
  const retryWithV2 = useCallback(
    async (token: string): Promise<Result> => {
      if (!pending.current) return { ok: false };
      setState({ status: "submitting", message: null });
      try {
        const res = await post(pending.current.url, pending.current.payload, "v2", token);
        const handled = await handleResponse(res);
        if (handled === "needs-v2") {
          setState({ status: "needs-v2", message: "The checkbox check failed. Try once more." });
          return { ok: false };
        }
        return handled;
      } catch {
        setState({ status: "needs-v2", message: "Network error. Try once more." });
        return { ok: false };
      }
    },
    [post, handleResponse]
  );

  return { state, submit, retryWithV2 };
}
