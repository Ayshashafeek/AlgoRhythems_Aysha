import { useEffect, useRef, useState } from "react";
import { BEAT_COLOR } from "../hooks/useBeatDetector.js";

const FLASH_MS = 150;

// One bubble, one pulse per nattuvangam beat — with a running 1–8 count,
// the way a nattuvangam beat is actually called out, instead of flashing
// separately for every bass/mid/treble hit in the track.
export default function BeatBubble({ beatEvent, isPlaying }) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!beatEvent) return;
    setActive(true);
    setCount(beatEvent.count ?? null);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(false), FLASH_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [beatEvent]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-ink-800/40 via-ink-800/20 to-transparent p-6">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full transition-all duration-100 ease-out sm:h-40 sm:w-40"
        style={{
          background: active
            ? `radial-gradient(circle at 35% 30%, ${BEAT_COLOR}, ${BEAT_COLOR}bb)`
            : "#333",
          boxShadow: active
            ? `0 0 30px 8px ${BEAT_COLOR}88, 0 0 60px 20px ${BEAT_COLOR}44`
            : "0 0 10px 2px rgba(255,255,255,0.08)",
        }}
      >
        {active && count && (
          <span className="font-heading text-3xl font-bold text-slate-950 sm:text-4xl">
            {count}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-slate-400">
        {active
          ? "Beat"
          : isPlaying
          ? "Listening for the thalam…"
          : 'Press "Start Training" to begin'}
      </p>
    </div>
  );
}