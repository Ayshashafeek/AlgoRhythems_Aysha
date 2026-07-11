/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08070c",
          900: "#0c0a14",
          800: "#13111e",
          700: "#1b1829",
          600: "#241f36",
        },
        violet: {
          400: "#9b8cff",
          500: "#7c5cfc",
          600: "#6842f0",
          700: "#5731d1",
        },
        cyan: {
          300: "#8ff0ee",
          400: "#4fe0dd",
          500: "#22d3ee",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 92, 252, 0.45)",
        "glow-cyan": "0 0 40px -10px rgba(34, 211, 238, 0.4)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(124,92,252,0.18), transparent 45%), radial-gradient(circle at 85% 10%, rgba(34,211,238,0.12), transparent 40%)",
      },
      borderRadius: {
        xl2: "20px",
        xl3: "24px",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(560px)", opacity: "1" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(124,92,252,0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgba(124,92,252,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
