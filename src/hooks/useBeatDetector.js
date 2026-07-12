import { useEffect, useRef, useState } from "react";
import Meyda from "meyda";

// A nattuvangam beat is ONE pulse of the thalam (the cymbal/clap strike a
// dancer actually follows) — not three independent hits. Bass and mid energy
// is where that strike lives (treble mostly picks up vocal sibilance and
// ornamentation, which used to trigger a flood of extra "beats"), so we
// combine bass+mid into a single onset-strength signal and fire ONE beat
// event per strike instead of one per frequency band.
const THRESHOLD = 1.3;

// Minimum time (ms) between beats, so one loud strike doesn't re-fire while
// it decays. 260ms caps us at ~230 beats/min — well above any real thalam
// speed — so genuine strikes never get swallowed while decay-chatter does.
const COOLDOWN_MS = 260;

// Single, consistent pulse colour for the nattuvangam beat.
export const BEAT_COLOR = "#22d3ee";

// `sourceKey` is anything that identifies *what* we're currently listening to
// (a video id, or an uploaded song's object URL). Passing a new value forces
// the analyzer to re-attach to the current media element — e.g. when you
// switch tutorial videos or upload a song while already playing.
export function useBeatDetector(mediaElementRef, isPlaying, sourceKey) {
  const [beatEvent, setBeatEvent] = useState(null);
  const lastFiredRef = useRef(0);
  const beatCountRef = useRef(0);
  const analyzerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const sourceElRef = useRef(null); // which element sourceRef is wired to

  useEffect(() => {
    beatCountRef.current = 0;
  }, [sourceKey]);

  useEffect(() => {
    if (!isPlaying || !mediaElementRef.current) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const audioContext = audioCtxRef.current;
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }

    // A browser only ever allows ONE createMediaElementSource() call per
    // media element for its whole lifetime, so only create a new node when
    // we're pointed at a different <video>/<audio> element than before.
    if (sourceElRef.current !== mediaElementRef.current) {
      try {
        sourceRef.current = audioContext.createMediaElementSource(mediaElementRef.current);
        sourceRef.current.connect(audioContext.destination);
        sourceElRef.current = mediaElementRef.current;
      } catch (e) {
        console.warn("Could not create media element source for beat detection", e);
        return;
      }
    }

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext,
      source: sourceRef.current,
      bufferSize: 512,
      featureExtractors: ["loudness"],
      callback: (features) => {
        const bands = features.loudness.specific;
        const bass = average(bands.slice(0, 4));
        const mid = average(bands.slice(4, 12));
        // The thalam strike (nattuvangam cymbals / hand claps / mridangam)
        // reads as a combined bass+mid transient. Weighting bass slightly
        // higher keeps the pulse locked to that strike rather than to
        // vocals or ornamentation sitting in the mid range.
        const onset = bass * 0.6 + mid * 0.4;

        checkAndFire(onset);
      },
    });

    function checkAndFire(value) {
      const now = Date.now();
      if (value > THRESHOLD && now - lastFiredRef.current > COOLDOWN_MS) {
        lastFiredRef.current = now;
        beatCountRef.current += 1;
        // Cycle 1–8, the count a nattuvangam beat is typically called out in.
        const count = ((beatCountRef.current - 1) % 8) + 1;
        setBeatEvent({ intensity: Math.min(value / 3, 1), time: now, count });
      }
    }

    analyzer.start();
    analyzerRef.current = analyzer;

    return () => {
      analyzer.stop();
      analyzerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, mediaElementRef, sourceKey]);

  return beatEvent;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}