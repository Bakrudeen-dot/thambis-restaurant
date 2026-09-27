import type { Config } from "tailwindcss";

/**
 * Thambis design system
 * ink     – deep charcoal / near black (primary)
 * cream   – warm cream / ivory (secondary)
 * maroon  – deep Tamil red / burgundy (accent)
 * brass   – muted gold (subtle accent)
 * All colours are driven by CSS variables in app/globals.css.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: { xs: "390px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px", "3xl": "1800px" },
    extend: {
      colors: {
        ink: { DEFAULT: "rgb(var(--ink) / <alpha-value>)", soft: "rgb(var(--ink-soft) / <alpha-value>)", line: "rgb(var(--ink-line) / <alpha-value>)" },
        cream: { DEFAULT: "rgb(var(--cream) / <alpha-value>)", deep: "rgb(var(--cream-deep) / <alpha-value>)" },
        ivory: "rgb(var(--ivory) / <alpha-value>)",
        maroon: { DEFAULT: "rgb(var(--maroon) / <alpha-value>)", deep: "rgb(var(--maroon-deep) / <alpha-value>)", bright: "rgb(var(--maroon-bright) / <alpha-value>)" },
        brass: { DEFAULT: "rgb(var(--brass) / <alpha-value>)", light: "rgb(var(--brass-light) / <alpha-value>)" },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: { site: "1680px" },
      transitionTimingFunction: { luxe: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "hero-zoom": { "0%": { transform: "scale(1.06)" }, "100%": { transform: "scale(1)" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "hero-zoom": "hero-zoom 2.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up": "fade-up 1s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin-slow 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
