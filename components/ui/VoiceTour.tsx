"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { voiceTourScript } from "@/lib/site";

/**
 * STEP 14 voice tour.
 * Fixed bottom-left, 56x56px, z-index 9998. rate 0.92, pitch 1.05, lang en-KE.
 * Volume2 while speaking, VolumeX when muted, pulsing ring while speaking,
 * tooltip "Hear what this site is about", replay label after the tour ends.
 */
export function VoiceTour() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [finished, setFinished] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(voiceTourScript);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.lang = "en-KE";
    utterance.onstart = () => {
      setSpeaking(true);
      setFinished(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setFinished(true);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setFinished(true);
    };
    utterRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9998] flex flex-col items-start gap-2">
      {finished && !speaking && (
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 rounded-full bg-darken px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Replay tour
        </button>
      )}
      <button
        type="button"
        onClick={() => (speaking ? stop() : play())}
        className={`fab fab-voice ${speaking ? "speaking" : ""}`}
        style={{ position: "relative", bottom: "auto", left: "auto" }}
        aria-pressed={speaking}
        aria-label={
          speaking
            ? "Mute the Nazareth Hub voice tour"
            : "Play the Nazareth Hub voice tour"
        }
      >
        {speaking ? (
          <VolumeX size={24} aria-hidden="true" />
        ) : (
          <Volume2 size={24} aria-hidden="true" />
        )}
        <span className="fab-tooltip" role="tooltip">
          Hear what this site is about
        </span>
      </button>
    </div>
  );
}
