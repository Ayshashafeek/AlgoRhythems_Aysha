import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

// Fallback sample dance video, used only if a video from the tutorial list isn't passed in.
const SAMPLE_SRC =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function VideoPlayer({
  isPlaying,
  onPlayingChange,
  speed,
  resetKey,
  onLanding,
  src = SAMPLE_SRC,
  title,
}) {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [landingPulse, setLandingPulse] = useState(false);

  // Whenever the selected video changes, drop any previous error state and
  // restart playback state so the new clip loads cleanly.
  useEffect(() => {
    setVideoError(false);
    setProgress(0);
    setDuration(0);
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.play().catch(() => {});
    else v.pause();
  }, [isPlaying]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.currentTime = 0;
    setProgress(0);
  }, [resetKey]);

  useEffect(() => {
    if (!onLanding) return;
    setLandingPulse(true);
    const t = setTimeout(() => setLandingPulse(false), 260);
    return () => clearTimeout(t);
  }, [onLanding]);

  const handleReplay = () => {
    const v = videoRef.current;
    if (v) v.currentTime = 0;
    onPlayingChange(true);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * duration;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden bg-black">
        {/* landing glow — pulses when a beat marker lands on the target line above */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-400/25 to-transparent transition-opacity duration-200 ${
            landingPulse ? "opacity-100" : "opacity-0"
          }`}
        />
        {!videoError ? (
          <video
            key={src}
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            autoPlay={isPlaying}
            onError={() => setVideoError(true)}
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <p className="text-sm text-slate-500">Couldn't load "{title ?? "this video"}"</p>
          </div>
        )}
        {title && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm">
            {title}
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="flex flex-col gap-3 border-t border-white/5 bg-ink-900/40 p-4">
        {/* progress bar */}
        <div
          role="slider"
          aria-label="Seek video"
          aria-valuenow={Math.round(pct)}
          tabIndex={0}
          onClick={handleSeek}
          className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/10"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
            style={{ left: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onPlayingChange(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-glow transition-transform hover:brightness-110"
            >
              {isPlaying ? <Pause className="h-4.5 w-4.5" /> : <Play className="ml-0.5 h-4.5 w-4.5" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleReplay}
              aria-label="Replay"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.09]"
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </div>
          <span className="font-mono text-xs text-slate-500">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatTime(t) {
  if (!t || Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
