import { motion } from "framer-motion";
import { Check, Music } from "lucide-react";

const DIFFICULTY_STYLES = {
  Beginner: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  Intermediate: "text-violet-300 border-violet-400/30 bg-violet-400/10",
  Advanced: "text-rose-300 border-rose-400/30 bg-rose-400/10",
};

export default function VideoList({ videos, selectedId, onSelect }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Tutorial Videos · Margam Repertoire
      </p>
      <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-2">
        {videos.map((video, i) => {
          const active = video.id === selectedId;
          return (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => onSelect(video)}
              whileTap={{ scale: 0.97 }}
              aria-pressed={active}
              className={`glass relative flex w-56 shrink-0 flex-col gap-2 rounded-xl2 p-4 text-left transition-shadow ${
                active
                  ? "shadow-glow ring-1 ring-inset ring-violet-400/50"
                  : "hover:shadow-glow"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] font-heading text-xs font-semibold text-slate-300">
                  {i + 1}
                </span>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  {video.title}
                </h4>
                <p className="mt-0.5 text-xs leading-snug text-slate-400">
                  {video.subtitle}
                </p>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                    DIFFICULTY_STYLES[video.difficulty] ??
                    "border-white/10 bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {video.difficulty}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-slate-400">
                  <Music className="h-2.5 w-2.5" />
                  {video.tala}
                </span>
                <span className="text-[10px] text-slate-500">{video.duration}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
