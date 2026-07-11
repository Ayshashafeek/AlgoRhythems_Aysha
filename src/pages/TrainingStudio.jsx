import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash } from "lucide-react";
import TopNav from "../components/TopNav.jsx";
import RhythmLane from "../components/RhythmLane.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import LyricsPanel from "../components/LyricsPanel.jsx";
import StudioToolbar from "../components/StudioToolbar.jsx";

const SPLIT_TRANSITION = { duration: 0.42, ease: [0.33, 0, 0.2, 1] };

export default function TrainingStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [beatCount, setBeatCount] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [flash, setFlash] = useState(false);
  const [lastBeat, setLastBeat] = useState(0);

  const handleBeat = () => {
    setBeatCount((c) => c + 1);
    setFlash(true);
    setLastBeat((n) => n + 1);
    setTimeout(() => setFlash(false), 220);
  };

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setBeatCount(0);
    setFlash(false);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen pb-10">
      <TopNav />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Training Studio
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Watch the beat land, feel the rhythm, follow the light.
            </p>
          </div>

          <StudioToolbar
            isPlaying={isPlaying}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={setSpeed}
            showLyrics={showLyrics}
            onToggleLyrics={() => setShowLyrics((s) => !s)}
          />
        </motion.div>

        {/* beat counter chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300">
            <Hash className="h-3.5 w-3.5 text-cyan-300" />
            <motion.span
              key={beatCount}
              initial={{ scale: 1.35, color: "#22d3ee" }}
              animate={{ scale: 1, color: "#e2e8f0" }}
              transition={{ duration: 0.25 }}
              className="font-heading font-semibold"
            >
              {beatCount}
            </motion.span>
            beats hit
          </span>
        </motion.div>

        {/* seamless stage: beat lane(s) flow directly into the dance video, one glass surface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-xl3 shadow-card"
        >
          <div className="relative flex h-[260px] sm:h-[320px]">
            <motion.div
              layout
              transition={SPLIT_TRANSITION}
              className="relative h-full min-w-0"
              style={{ flex: showLyrics ? "1 1 58%" : "1 1 100%" }}
            >
              <RhythmLane
                isPlaying={isPlaying}
                speed={speed}
                onBeat={handleBeat}
                resetKey={resetKey}
              />
            </motion.div>

            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  key="lyrics-split"
                  initial={{ flex: "0 0 0%", opacity: 0 }}
                  animate={{ flex: "0 0 42%", opacity: 1 }}
                  exit={{ flex: "0 0 0%", opacity: 0 }}
                  transition={SPLIT_TRANSITION}
                  className="relative h-full min-w-0 overflow-hidden"
                >
                  <LyricsPanel isPlaying={isPlaying} resetKey={resetKey} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* glowing target line — exactly where the beat area meets the video */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] transition-all duration-150"
              style={{
                background: flash
                  ? "linear-gradient(90deg, #fff, #c9bfff, #7dd8ee, #fff)"
                  : "linear-gradient(90deg, #7c5cfc, #22d3ee)",
                boxShadow: flash
                  ? "0 0 26px 6px rgba(255,255,255,0.55)"
                  : "0 0 16px 2px rgba(124,92,252,0.45)",
              }}
            />
          </div>

          <div className="h-[340px] sm:h-[400px]">
            <VideoPlayer
              isPlaying={isPlaying}
              onPlayingChange={setIsPlaying}
              speed={speed}
              resetKey={resetKey}
              onLanding={lastBeat}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-xs text-slate-500"
        >
          Beat markers fall in sync with the choreography — no sound required to follow the timing.
        </motion.p>
      </main>
    </div>
  );
}
