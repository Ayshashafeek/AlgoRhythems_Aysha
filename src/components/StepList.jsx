import { motion, AnimatePresence } from "framer-motion";
import { Footprints, Trash2 } from "lucide-react";

export default function StepList({ steps, onRemove }) {
  return (
    <div className="glass flex h-full flex-col rounded-none border-l border-white/5 p-5">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-300/80">
        <Footprints className="h-3.5 w-3.5" /> Marked Steps
      </p>
      <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto pr-1">
        <AnimatePresence>
          {steps.length === 0 && (
            <p className="text-sm text-slate-500">
              No steps yet — hit "Add Step" while the beat plays to mark one.
            </p>
          )}
          {steps.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">Beat {s.beat}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
              <button
                onClick={() => onRemove(s.id)}
                aria-label="Remove step"
                className="text-slate-500 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
