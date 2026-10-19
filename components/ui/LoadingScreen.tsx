"use client";

import { useEffect, useRef, useState } from "react";

/**
 * STEP 13 loading screen.
 *
 * The zip ships a loader (`#ftco-loader`, index.html:694), so it is reproduced
 * here with the identical id, class contract, SVG geometry, stroke colours and
 * keyframes (see app/globals.css section 4). On top of the reproduced loader we
 * add what the zip was missing: a percentage counter, a building outline drawn
 * line by line, a hard 3 second cap, a skip control after 1 second,
 * role="status", and a plain percentage text under prefers-reduced-motion.
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [skippable, setSkippable] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const started = performance.now();
    const DURATION = 2400; // finishes well inside the 3 second cap
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      window.setTimeout(() => setVisible(false), 260);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // ease-out so the counter decelerates into 100
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t >= 1) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // skip becomes available after 1 second
    const skipTimer = window.setTimeout(() => setSkippable(true), 1000);
    // hard cap: never on screen longer than 3 seconds
    const capTimer = window.setTimeout(finish, 3000);

    const onLoad = () => finish();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(skipTimer);
      window.clearTimeout(capTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="ftco-loader"
      className="show fullscreen"
      role="status"
      aria-live="polite"
      aria-label={`Loading Nazareth Hub, ${progress} percent`}
    >
      {/* reproduced zip markup, verbatim geometry and strokes */}
      <svg className="circular" width="48px" height="48px" aria-hidden="true">
        <circle
          className="path-bg"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          stroke="#eeeeee"
        />
        <circle
          className="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          stroke="#F96D00"
        />
      </svg>

      {/* STEP 13 addition: building outline drawn line by line */}
      {!reduced.current && (
        <svg
          className="building-draw"
          width="120"
          height="70"
          viewBox="0 0 120 70"
          aria-hidden="true"
          style={{ position: "absolute", left: "calc(50% - 60px)", top: "calc(50% - 118px)" }}
        >
          <path d="M18 66 V26 H54 V66" style={{ animationDelay: "0s" }} />
          <path d="M54 66 V12 H92 V66" style={{ animationDelay: "0.35s" }} />
          <path d="M92 66 V34 H110 V66" style={{ animationDelay: "0.7s" }} />
          <line x1="10" y1="66" x2="114" y2="66" style={{ animationDelay: "1s" }} />
          <line x1="62" y1="22" x2="84" y2="22" style={{ animationDelay: "1.2s" }} />
          <line x1="62" y1="32" x2="84" y2="32" style={{ animationDelay: "1.35s" }} />
          <line x1="62" y1="42" x2="84" y2="42" style={{ animationDelay: "1.5s" }} />
          <line x1="26" y1="36" x2="46" y2="36" style={{ animationDelay: "1.65s" }} />
          <line x1="26" y1="46" x2="46" y2="46" style={{ animationDelay: "1.8s" }} />
        </svg>
      )}

      <div className="loader-meta">
        {reduced.current ? (
          <span>{progress}%</span>
        ) : (
          <span aria-hidden="true">{progress}%</span>
        )}
        <small>
          {skippable ? (
            <button
              type="button"
              onClick={() => {
                setProgress(100);
                setVisible(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#323edd",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "underline",
              }}
            >
              Skip
            </button>
          ) : (
            "Nazareth Hub"
          )}
        </small>
      </div>
    </div>
  );
}
