import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          indigo: "#142238",
          "indigo-dark": "#0B1524",
          terracotta: "#C45525",
          "terracotta-light": "#E07A4B",
          clay: "#D4B996",
          ecru: "#F7F2EB",
          charcoal: "#1C1C21",
          gold: "#D4AF37",
        },
        precision: {
          slate: "#0D1721",
          "slate-light": "#1B2A3B",
          cyan: "#00E5C8",
          "cyan-dim": "rgba(0, 229, 200, 0.15)",
          white: "#F8FAFC",
          gold: "#E5B94E",
          grid: "rgba(226, 232, 240, 0.08)",
        },
        momentum: {
          amber: "#FF6B2B",
          coral: "#FF4625",
          midnight: "#0B0F19",
          "midnight-surface": "#131929",
          ivory: "#FAF7F2",
          slate: "#2E3B52",
        },
        sustainable: {
          leaf: "#2D5033",
          forest: "#152819",
          moss: "#43684B",
          cream: "#FAF8F3",
          sand: "#E5DDD0",
          earth: "#9B6840",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        }
      },
      animation: {
        scanline: "scanline 4s linear infinite",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        marqueeReverse: "marqueeReverse 35s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
