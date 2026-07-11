import { motion } from "framer-motion";
import { Music2, Play, Pause, RotateCcw, PlusCircle } from "lucide-react";

export default function ChoreographyToolbar({
  isPlaying, onStart, onPause, onReset, onAddStep,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <motion.button whileTap={{ scale: 0.95 }} className="btn-ghost !px-4 !py-2.5 text-sm">
        <Music2 className="h-4 w-4" /> Upload Audio
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAddStep}
        disabled={!isPlaying}
        className="btn-ghost !px-4 !py-2.5 text-sm border-violet-400/40 text-violet-300 disabled:opacity-40"
      >
        <PlusCircle className="h-4 w-4" /> Add Step
      </motion.button>

      <div className="mx-1 h-6 w-px bg-white/10" />

      <motion.button whileTap={{ scale: 0.95 }} onClick={onReset} aria-label="Reset"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.09]">
        <RotateCcw className="h-4 w-4" />
      </motion.button>

      {isPlaying ? (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onPause} className="btn-ghost !px-5 !py-2.5 text-sm">
          <Pause className="h-4 w-4" /> Pause
        </motion.button>
      ) : (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onStart} className="btn-primary !px-5 !py-2.5 text-sm">
          <Play className="h-4 w-4" /> Start Beat
        </motion.button>
      )}
    </div>
  );
}
