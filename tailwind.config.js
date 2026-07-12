/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // neutrals — off-white base, warm white cards, charcoal text
        cream: {
          50: "#FFFBF5",   // page background
          100: "#FFF6EC",
          200: "#FDEFDD",  // subtle section tint
        },
        ink: {
          900: "#231F20",  // primary text (not pure black)
          700: "#4A4340",
          500: "#786F6B",  // muted/secondary text
          300: "#B8AEA9",  // borders, dividers
          100: "#EDE6E1",
        },
        // festive accents
        saffron: { 400: "#FF9933", 500: "#FF7A00", 600: "#E86A00" },
        peacock: { 400: "#1CA9A0", 500: "#0F7A78", 600: "#0B5E5C" },
        lotus:   { 400: "#F472B6", 500: "#EC4899", 600: "#D6317E" },
        marigold:{ 400: "#FDB022", 500: "#F59E0B", 600: "#DC8A05" },
        turmeric:{ 400: "#FFD23F", 500: "#FBBF24", 600: "#E8A90E" },
        leaf:    { 400: "#4ADE80", 500: "#16A34A", 600: "#0E7C39" },
        plum:    { 400: "#A78BFA", 500: "#8B5CF6", 600: "#7440E0" },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(35, 31, 32, 0.06)",
        "card-hover": "0 8px 28px rgba(35, 31, 32, 0.1)",
      },
      borderRadius: { xl2: "20px", xl3: "24px" },
    },
  },
  plugins: [],
};
