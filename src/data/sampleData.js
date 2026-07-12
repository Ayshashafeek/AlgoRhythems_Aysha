export const recentActivity = [
  {
    id: 1,
    title: "Completed Beat Sync — Natyanjali Ad-Tala",
    meta: "92% accuracy · 12 min ago",
  },
  {
    id: 2,
    title: "New choreography saved to Training Studio",
    meta: "Bharatanatyam basics · 3 hrs ago",
  },
  {
    id: 3,
    title: "Joined \"Rhythm in Motion\" community post",
    meta: "Anonymous Mode · yesterday",
  },
];

export const accessibilityTips = [
  "Turn on high-contrast beat markers if fast flashes are hard to track.",
  "Slow playback to 0.5x while learning a new step, then build speed gradually.",
  "Use the vertical rhythm lane as a visual metronome — no sound required.",
  "Rest for 30 seconds between takes to keep movements precise, not rushed.",
];

// Simulated beat timeline (ms) for the training studio demo — no audio analysis required.
export const beatTimeline = [400, 900, 1400, 1650, 2100, 2600, 3100, 3350, 3800, 4300];

// Hardcoded tutorial catalogue: the 7 pieces of the traditional Bharatanatyam
// "Margam" repertoire, in performance order. Replace `src` with real clip URLs/paths
// (e.g. "/videos/alarippu.mp4" placed in /public) and `beatTimeline` with the actual
// beat-detection output for each track. Every entry needs its own timeline since each
// piece has a different tala (rhythmic cycle) and tempo.
export const bharatanatyamVideos = [
  {
    id: "alarippu",
    title: "Alarippu",
    subtitle: "Pure rhythm invocation",
    difficulty: "Beginner",
    tala: "Tisra Ekam",
    duration: "2:10",
    // TODO: replace with the real Alarippu clip
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [350, 700, 1050, 1400, 1750, 2100, 2450, 2800, 3150, 3500],
  },
  {
    id: "jatiswaram",
    title: "Jatiswaram",
    subtitle: "Pure dance, rhythmic syllables",
    difficulty: "Beginner",
    tala: "Rupaka",
    duration: "3:05",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [300, 600, 1000, 1300, 1600, 2000, 2300, 2700, 3000, 3400, 3700, 4100],
  },
  {
    id: "sabdam",
    title: "Sabdam",
    subtitle: "First expressive storytelling piece",
    difficulty: "Intermediate",
    tala: "Misra Chapu",
    duration: "4:20",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [400, 850, 1300, 1750, 2100, 2450, 2900, 3350, 3800, 4150, 4500],
  },
  {
    id: "varnam",
    title: "Varnam",
    subtitle: "Centerpiece — rhythm & expression combined",
    difficulty: "Advanced",
    tala: "Adi",
    duration: "6:40",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [250, 500, 750, 1000, 1300, 1600, 1900, 2200, 2550, 2900, 3250, 3600, 3950, 4300],
  },
  {
    id: "padam",
    title: "Padam",
    subtitle: "Slow, lyrical, emotive piece",
    difficulty: "Intermediate",
    tala: "Adi",
    duration: "5:15",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [500, 1100, 1700, 2300, 2900, 3500, 4100, 4700],
  },
  {
    id: "tillana",
    title: "Tillana",
    subtitle: "Fast-paced, joyous finale of rhythm",
    difficulty: "Advanced",
    tala: "Adi",
    duration: "3:30",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [200, 400, 650, 850, 1100, 1300, 1550, 1750, 2000, 2200, 2450, 2650, 2900, 3100],
  },
  {
    id: "mangalam",
    title: "Mangalam",
    subtitle: "Closing benediction",
    difficulty: "Beginner",
    tala: "Adi",
    duration: "1:45",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    beatTimeline: [450, 950, 1450, 1950, 2450, 2950],
  },
];

export const lyricsSample = [
  "Sundari nee vaanam thottu",
  "Thalam potta kaigal rendum",
  "Oosai illa ஆனாலும் oorum thaalam",
  "Kannin mozhi kelaadha isai",
  "Aatam ondru bhoomi mele",
];

// Lyrics paired with an approximate duration (ms) each line stays highlighted —
// drives the auto-scroll / highlight simulation in Lyrics Mode.
export const lyricsTimed = [
  { line: "Sundari nee vaanam thottu", duration: 2600 },
  { line: "Thalam potta kaigal rendum", duration: 2400 },
  { line: "Oosai illa, aanalum oorum thaalam", duration: 2800 },
  { line: "Kannin mozhi kelaadha isai", duration: 2400 },
  { line: "Aatam ondru bhoomi mele", duration: 2500 },
  { line: "Vizhigal pesum mounam kooda", duration: 2400 },
  { line: "Thudikkum idhayam thanaal", duration: 2200 },
  { line: "Ovvoru asaivum oru varthai", duration: 2500 },
  { line: "Nadanam pesum bashai", duration: 2300 },
];
export const sampleSteps = [
  { id: 1, beat: 4, label: "Step touch, arms open" },
  { id: 2, beat: 8, label: "Turn + hold" },
];
export const communityEvents = [
  {
    id: 1,
    title: "Classical Dance Workshop",
    date: "May 25, 2026",
    location: "Chennai, India",
  },
  {
    id: 2,
    title: "Deaf Dancers Connect",
    date: "May 18, 2026",
    location: "Bengaluru, India",
  },
  {
    id: 3,
    title: "Nritya Utsav 2026",
    date: "June 3, 2026",
    location: "Hyderabad, India",
  },
  {
    id: 4,
    title: "Rhythm in Motion Championship",
    date: "June 15, 2026",
    location: "Pune, India",
  },
];

