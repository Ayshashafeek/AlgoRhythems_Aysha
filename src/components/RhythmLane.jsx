import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BeatMarker from "./BeatMarker.jsx";
import ImpactRipple from "./ImpactRipple.jsx";
import { beatTimeline as defaultBeatTimeline } from "../data/sampleData.js";

const LANES = 4;
const LANE_COLORS = ["#9b8cff", "#22d3ee", "#7c5cfc", "#4fe0dd"];
const FALL_DURATION = 2.2; // seconds to travel the full lane height at 1x speed

export default function RhythmLane({
  isPlaying,
  speed = 1,
  onBeat,
  resetKey,
  beatTimeline = defaultBeatTimeline,
}) {
  const [markers, setMarkers] = useState([]);
  const [ripples, setRipples] = useState([]);
  const timeouts = useRef([]);
  const beatIndex = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    setMarkers([]);
    setRipples([]);
    beatIndex.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    if (!isPlaying) return;

    const loopLength = beatTimeline[beatTimeline.length - 1] + 900;

    const scheduleLoop = (loopStart) => {
      beatTimeline.forEach((t) => {
        const delay = (t + loopStart) / speed;
        const id = setTimeout(() => {
          const laneIndex = beatIndex.current % LANES;
          beatIndex.current += 1;
          idCounter.current += 1;
          const markerId = idCounter.current;
          const color = LANE_COLORS[laneIndex % LANE_COLORS.length];

          setMarkers((prev) => [...prev, { id: markerId, lane: laneIndex, color }]);

          const hitDelay = (FALL_DURATION / speed) * 1000;
          const hitTimeout = setTimeout(() => {
            idCounter.current += 1;
            const rippleId = idCounter.current;
            setRipples((prev) => [...prev, { id: rippleId, lane: laneIndex, color }]);
            onBeat?.(color);
            setTimeout(() => {
              setRipples((prev) => prev.filter((r) => r.id !== rippleId));
            }, 550);
            setMarkers((prev) => prev.filter((m) => m.id !== markerId));
          }, hitDelay);
          timeouts.current.push(hitTimeout);
        }, delay);
        timeouts.current.push(id);
      });

      const nextLoop = setTimeout(() => scheduleLoop(loopStart + loopLength), loopLength / speed);
      timeouts.current.push(nextLoop);
    };

    scheduleLoop(0);

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, speed, resetKey, beatTimeline]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-ink-800/40 via-ink-800/20 to-transparent">
      {/* lane dividers */}
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${LANES}, 1fr)` }}>
        {Array.from({ length: LANES }).map((_, i) => (
          <div key={i} className={i !== LANES - 1 ? "border-r border-white/[0.05]" : ""} />
        ))}
      </div>

      {/* falling markers */}
      <AnimatePresence>
        {markers.map((m) => (
          <div
            key={m.id}
            className="absolute top-0 bottom-0"
            style={{ left: `${(m.lane + 0.5) * (100 / LANES)}%` }}
          >
            <BeatMarker color={m.color} duration={FALL_DURATION / speed} />
          </div>
        ))}
      </AnimatePresence>

      {/* impact ripples at the bottom edge (target line) */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute bottom-0"
          style={{ left: `${(r.lane + 0.5) * (100 / LANES)}%` }}
        >
          <ImpactRipple color={r.color} />
        </div>
      ))}

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="rounded-full border border-white/10 bg-ink-950/70 px-4 py-2 text-center text-sm text-slate-400">
            Press "Start Training" to begin
          </p>
        </div>
      )}
    </div>
  );
}
