import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Music2, Play, Pause, RotateCcw, Gauge, ListMusic } from "lucide-react";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

export default function StudioToolbar({
  isPlaying,
  onStart,
  onPause,
  onReset,
  speed,
  onSpeedChange,
  showLyrics,
  onToggleLyrics,
  onUploadSong,
  hasCustomSong,
}) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const songInputRef = useRef(null);

  const handleSongChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUploadSong?.(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <ToolbarButton icon={Upload} label="Upload Video" />

      <input
        ref={songInputRef}
        type="file"
        accept="audio/*"
        hidden
        onChange={handleSongChange}
      />
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => songInputRef.current?.click()}
        title="Upload a song — the bubble and video will follow it instead of the clip's own audio"
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
          hasCustomSong
            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
            : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.09]"
        }`}
      >
        <Music2 className="h-4 w-4" />
        {hasCustomSong ? "Song Loaded" : "Upload Song"}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleLyrics}
        aria-pressed={showLyrics}
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
          showLyrics
            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
            : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.09]"
        }`}
      >
        <ListMusic className="h-4 w-4" />
        {showLyrics ? "Hide Lyrics" : "Show Lyrics"}
      </motion.button>

      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSpeedMenu((s) => !s)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.09]"
        >
          <Gauge className="h-4 w-4" />
          {speed}x
        </motion.button>
        {showSpeedMenu && (
          <div className="absolute left-0 top-full z-20 mt-2 w-24 overflow-hidden rounded-xl border border-white/10 bg-ink-800/95 backdrop-blur-xl">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onSpeedChange(s);
                  setShowSpeedMenu(false);
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10 ${
                  s === speed ? "text-violet-300" : "text-slate-300"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-1 h-6 w-px bg-white/10" />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        aria-label="Reset"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.09]"
      >
        <RotateCcw className="h-4 w-4" />
      </motion.button>

      {isPlaying ? (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onPause} className="btn-ghost !px-5 !py-2.5 text-sm">
          <Pause className="h-4 w-4" /> Pause
        </motion.button>
      ) : (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onStart} className="btn-primary !px-5 !py-2.5 text-sm">
          <Play className="h-4 w-4" /> Start Training
        </motion.button>
      )}
    </div>
  );
}

function ToolbarButton({ icon: Icon, label, hint }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.95 }} title={hint} className="btn-ghost !px-4 !py-2.5 text-sm">
      <Icon className="h-4 w-4" /> {label}
    </motion.button>
  );
}