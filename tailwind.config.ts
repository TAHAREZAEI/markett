import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#FAFAF7",
        ink: {
          DEFAULT: "#12151C",
          soft: "#1D212B",
          muted: "#4B5160"
        },
        teal: {
          50: "#EAF5F3",
          100: "#CDE7E2",
          400: "#1B8F7E",
          500: "#0F6659",
          600: "#0B4F45",
          700: "#083A33"
        },
        gold: {
          300: "#F1CE87",
          400: "#E4A93B",
          500: "#C98F24"
        },
        sand: "#E7E3DA",
        slate: {
          400: "#8A8F9C",
          500: "#6B7280"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,21,28,0.04), 0 8px 24px -12px rgba(18,21,28,0.12)",
        lift: "0 20px 40px -16px rgba(18,21,28,0.25)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "ticket-in": {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(4px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "ticket-in": "ticket-in 0.35s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
