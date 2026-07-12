import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav.jsx";
import BeatBubble from "../components/BeatBubble.jsx";
import StepList from "../components/StepList.jsx";
import ChoreographyToolbar from "../components/ChoreographyToolbar.jsx";
import { useBeatDetector } from "../hooks/useBeatDetector.js";
import { sampleSteps } from "../data/sampleData.js";

export default function ChoreographyStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatIndex, setBeatIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null);
  const [steps, setSteps] = useState(sampleSteps);
  const audioRef = useRef(null);
  const beatEvent = useBeatDetector(audioRef, isPlaying, audioSrc);

  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: Date.now(), beat: beatIndex, label: "New step" },
    ]);
  };

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setBeatIndex(0);
    setResetKey((k) => k + 1);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleUploadSong = (file) => {
    setAudioSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setIsPlaying(false);
    setBeatIndex(0);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    if (!beatEvent) return;
    setBeatIndex((count) => count + 1);
  }, [beatEvent]);

  return (
    <div className="min-h-screen pb-10">
      <TopNav />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Choreography Studio
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Upload audio, convert it to beats, and mark choreography steps in sync.
            </p>
          </div>
          <ChoreographyToolbar
            isPlaying={isPlaying}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onAddStep={handleAddStep}
            onUploadSong={handleUploadSong}
            hasCustomSong={!!audioSrc}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass relative flex h-[420px] overflow-hidden rounded-xl3 shadow-card"
        >
          <div className="relative h-full flex-1 rounded-[32px] border border-white/10 bg-slate-950/70 p-8 text-slate-300 shadow-[inset_0_0_100px_rgba(15,23,42,0.45)]">
            <div className="flex h-full flex-col items-center justify-between gap-6 text-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                  Choreography Studio
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  Live beat conversion
                </h2>
                <p className="max-w-md text-sm text-slate-400">
                  Upload audio to convert it into nattuvangam beat pulses and mark choreography steps live.
                </p>
              </div>

              <div className="mx-auto w-full max-w-sm">
                <BeatBubble beatEvent={beatEvent} isPlaying={isPlaying} />
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                disabled={!isPlaying}
                className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add step on beat
              </button>
            </div>
          </div>

          <div className="h-full w-[300px] shrink-0">
            <StepList
              steps={steps}
              onRemove={(id) => setSteps((s) => s.filter((x) => x.id !== id))}
            />
          </div>
        </motion.div>

        {audioSrc && <audio ref={audioRef} src={audioSrc} loop hidden />}
      </main>
    </div>
  );
}
