import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "../components/TopNav.jsx";
import BeatBubble from "../components/BeatBubble.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import LyricsPanel from "../components/LyricsPanel.jsx";
import StudioToolbar from "../components/StudioToolbar.jsx";
import VideoList from "../components/VideoList.jsx";
import { bharatanatyamVideos } from "../data/sampleData.js";
import { useBeatDetector } from "../hooks/useBeatDetector.js";

const SPLIT_TRANSITION = {
  duration: 0.42,
  ease: [0.33, 0, 0.2, 1],
};

export default function TrainingStudio() {
  const [selectedVideo, setSelectedVideo] = useState(bharatanatyamVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showLyrics, setShowLyrics] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [flash, setFlash] = useState(false);
  const [lastBeat, setLastBeat] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null); // uploaded-song object URL, if any
  const [timelineBeatEvent, setTimelineBeatEvent] = useState(null);
  const timelineIndexRef = useRef(0);
  const timelineCycleRef = useRef(0);
  const timelineLastTimeRef = useRef(0);
  const timelineNextBeatRef = useRef(0);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // If a song is uploaded we analyze THAT for beats and mute the video (so
  // you don't hear both at once); otherwise we use the precomputed Alarippu
  // timeline and repeat the beat pattern throughout the clip.
  const beatSourceRef = audioSrc ? audioRef : videoRef;
  const detectedBeatEvent = useBeatDetector(beatSourceRef, isPlaying, audioSrc ?? selectedVideo.id);
  const beatTimeline = selectedVideo.beatTimeline ?? [];
  const beatInterval =
    beatTimeline.length > 1
      ? beatTimeline.slice(1).reduce((sum, t, idx) => sum + (t - beatTimeline[idx]), 0) / (beatTimeline.length - 1)
      : 0.8;
  const beatStartTime = beatTimeline[0] ?? 0;
  const useTimeline = !audioSrc && beatTimeline.length > 0;
  const beatEvent = useTimeline ? timelineBeatEvent || detectedBeatEvent : detectedBeatEvent;

  useEffect(() => {
    timelineIndexRef.current = 0;
    timelineCycleRef.current = 0;
    timelineLastTimeRef.current = 0;
    timelineNextBeatRef.current = beatStartTime;
    setTimelineBeatEvent(null);
  }, [selectedVideo.id, resetKey, beatTimeline]);

  // Flash feedback whenever a beat fires (landing glow + accent bar).
  useEffect(() => {
    if (!beatEvent) return;
    setFlash(true);
    setLastBeat((n) => n + 1);
    const t = setTimeout(() => setFlash(false), 220);
    return () => clearTimeout(t);
  }, [beatEvent]);

  // Keep the uploaded song locked to the same play/pause/speed/position as
  // the video, so the bubble and the dance clip stay in sync.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.play().catch(() => {});
    else a.pause();
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.playbackRate = speed;
  }, [speed, audioSrc]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.currentTime = 0;
  }, [resetKey, audioSrc]);

  // Release the previous object URL when it's replaced or on unmount.
  useEffect(() => {
    return () => {
      if (audioSrc) URL.revokeObjectURL(audioSrc);
    };
  }, [audioSrc]);

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setFlash(false);
    setResetKey((k) => k + 1);
  };

  const handleSelectVideo = (video) => {
    if (video.id === selectedVideo.id) return;
    setSelectedVideo(video);
    setIsPlaying(false);
    setFlash(false);
    setResetKey((k) => k + 1);
  };

  const handleUploadSong = (file) => {
    setAudioSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setIsPlaying(false);
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
            onUploadSong={handleUploadSong}
            hasCustomSong={!!audioSrc}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6"
        >
          <VideoList
            videos={bharatanatyamVideos}
            selectedId={selectedVideo.id}
            onSelect={handleSelectVideo}
          />
        </motion.div>

        {/* Split view: dance video (square) | beat bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-xl3 shadow-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square w-full">
              <VideoPlayer
                ref={videoRef}
                isPlaying={isPlaying}
                onPlayingChange={setIsPlaying}
                speed={speed}
                resetKey={resetKey}
                onLanding={lastBeat}
                onTimeUpdate={(time) => {
                  if (!useTimeline) return;
                  const timeline = selectedVideo.beatTimeline || [];
                  const interval = beatInterval || 0.8;

                  // If the current time has gone backward or the video restarted, reset
                  if (time < timelineLastTimeRef.current) {
                    timelineIndexRef.current = 0;
                    timelineCycleRef.current = 0;
                    timelineNextBeatRef.current = timeline[0] ?? 0;
                  }

                  timelineLastTimeRef.current = time;

                  while (timeline.length > 0 && time >= timelineNextBeatRef.current) {
                    setTimelineBeatEvent({
                      time: Date.now(),
                      count: ((timelineIndexRef.current % 8) + 1),
                    });

                    timelineIndexRef.current += 1;
                    if (timelineIndexRef.current >= timeline.length) {
                      timelineIndexRef.current = 0;
                      timelineCycleRef.current += 1;
                    }

                    timelineNextBeatRef.current =
                      (timeline[timelineIndexRef.current] ?? 0) + timelineCycleRef.current * interval;
                  }
                }}
                src={selectedVideo.src}
                title={selectedVideo.title}
                muted={!!audioSrc}
              />
            </div>
            <div className="aspect-square w-full border-t border-white/5 md:border-l md:border-t-0">
              <BeatBubble beatEvent={beatEvent} isPlaying={isPlaying} />
            </div>
          </div>

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
        </motion.div>

        {/* Lyrics — full width, below both panels */}
        <AnimatePresence>
          {showLyrics && (
            <motion.div
              key="lyrics-below"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={SPLIT_TRANSITION}
              className="mt-4 overflow-hidden"
            >
              <div className="glass h-[260px] rounded-xl3 sm:h-[300px]">
                <LyricsPanel isPlaying={isPlaying} resetKey={resetKey} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden element that plays an uploaded song in lockstep with the video */}
        {audioSrc && <audio ref={audioRef} src={audioSrc} loop hidden />}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-xs text-slate-500"
        >
          The bubble lights up in sync with the music — slow the speed down
          and the lights slow with it, no sound required to follow the timing.
        </motion.p>
      </main>
    </div>
  );
}