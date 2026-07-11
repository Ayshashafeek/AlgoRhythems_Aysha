import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Logo from "../components/Logo.jsx";
import DanceIllustration from "../components/DanceIllustration.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Prototype only — no auth wired up, straight to the dashboard.
    navigate("/dashboard");
  };

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden">
      {/* ambient background accents */}
      <div className="pointer-events-none absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-15%] h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* left: illustration panel */}
      <div className="relative hidden w-1/2 items-center justify-center border-r border-white/5 lg:flex">
        <div className="relative z-10 flex h-full max-h-[640px] w-full max-w-lg flex-col items-center justify-center gap-8 px-10">
          <DanceIllustration />
          <div className="text-center">
            <p className="font-heading text-lg font-semibold text-slate-100">
              Rhythm you can see, feel, and follow.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Every beat becomes a visual cue — so dance training works for every body and every sense.
            </p>
          </div>
        </div>
      </div>

      {/* right: auth panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass w-full max-w-md rounded-xl3 p-8 shadow-card sm:p-10"
        >
          <div className="mb-2 lg:hidden">
            <Logo size={36} />
          </div>
          <div className="hidden lg:block">
            <Logo size={36} />
          </div>

          <h1 className="mt-6 font-heading text-2xl font-bold text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Making dance accessible through visual rhythm.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-2 w-full"
            >
              Login
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wide text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            className="btn-ghost w-full"
          >
            Continue as Guest
          </motion.button>

          <p className="mt-8 text-center text-sm text-slate-500">
            New to RhythmBridge?{" "}
            <button type="button" className="font-medium text-violet-400 hover:text-violet-300">
              Create an account
            </button>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
