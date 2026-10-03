import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#FBFBFC",
        obsidian: "#121316",
        burgundy: { DEFAULT: "#5B142F", light: "#7A2145" },
        rose: "#F2ECF0",
        crimson: "#C92A4E",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        eq: {
          "0%, 100%": { transform: "scaleY(0.25)" },
          "50%": { transform: "scaleY(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        eq: "eq 1.1s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        pulseRing: "pulseRing 1.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
