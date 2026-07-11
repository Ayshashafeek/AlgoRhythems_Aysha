import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Music4, Users, CalendarDays, Sparkles, Lightbulb,wand2 } from "lucide-react";
import TopNav from "../components/TopNav.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { recentActivity, accessibilityTips } from "../data/sampleData.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <TopNav />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-violet-300">
            <Sparkles className="h-4 w-4" /> Welcome back
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Hi, Dancer 👋
          </h1>
          <p className="mt-2 max-w-xl text-slate-400">
            What would you like to move to today? Pick up your training, share progress anonymously, or find your next event.
          </p>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={item}>
            <FeatureCard
              icon={Music4}
              title="Training Studio"
              description="Follow a visual rhythm lane synced to your dance video — practice beats with your eyes, not just your ears."
              onClick={() => navigate("/training")}
              accent="violet"
            />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard
              icon={Wand2}
              title="Choreography Studio"
              description="Upload a beat and mark new steps in sync with the rhythm — built for teachers designing choreography."
              onClick={() => navigate("/choreography")}
              accent="cyan"
            />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard
              icon={Users}
              title="Anonymous Community"
              description="Share progress, ask questions, and connect with other dancers without revealing your identity."
              comingSoon
              accent="cyan"
            />
          </motion.div>

          <motion.div variants={item}>
            <FeatureCard
              icon={CalendarDays}
              title="Community Events"
              description="Discover accessible workshops, meetups, and performances happening near you."
              comingSoon
              accent="violet"
            />
          </motion.div>
        </motion.section>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass rounded-xl3 p-6 lg:col-span-2"
          >
            <h2 className="font-heading text-lg font-semibold text-white">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              {recentActivity.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{a.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{a.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass rounded-xl3 p-6"
          >
            <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
              <Lightbulb className="h-4.5 w-4.5 text-cyan-300" />
              Accessible Practice Tips
            </h2>
            <ul className="mt-4 space-y-3">
              {accessibilityTips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
