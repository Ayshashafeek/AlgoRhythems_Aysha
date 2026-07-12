/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#140b0d",
          900: "#1c1014",
          800: "#26161c",
          700: "#301c24",
          600: "#3d232b",
        },
        // was violet — now saffron/marigold, the primary accent
        violet: {
          400: "#f5b04a",
          500: "#e8871e",
          600: "#d1721a",
          700: "#a85814",
        },
        // was cyan — now peacock teal, the secondary accent
        cyan: {
          300: "#7fe0d2",
          400: "#3bbfae",
          500: "#116466",
        },
        // new: temple gold, for highlights/borders
        gold: {
          400: "#d9b45c",
          500: "#c9a24b",
        },
        maroon: {
          500: "#7a1f2b",
          600: "#5e1520",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(232, 135, 30, 0.45)",
        "glow-cyan": "0 0 40px -10px rgba(17, 100, 102, 0.45)",
        card: "0 8px 30px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(232,135,30,0.16), transparent 45%), radial-gradient(circle at 85% 10%, rgba(17,100,102,0.16), transparent 40%)",
      },
      borderRadius: {
        xl2: "20px",
        xl3: "24px",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(232,135,30,0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgba(232,135,30,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
