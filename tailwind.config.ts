import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        moni: {
          50: "#FFF0F6",
          100: "#FFE4EC",
          200: "#FFC2D4",
          300: "#FF8FAD",
          400: "#FF5A8A",
          500: "#FF2D78",
          600: "#E6005C",
          700: "#C1004A",
          900: "#7F0A33",
        },
        ink: {
          900: "#000000",
          800: "#000000",
          700: "#000000",
          500: "#000000",
          300: "#000000",
          100: "#FFFFFF",
          50: "#FFF8FB",
        }
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        'card': '0 4px 20px -4px rgb(255 45 120 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        'card-hover': '0 12px 40px -8px rgb(255 45 120 / 0.15), 0 8px 16px -4px rgb(0 0 0 / 0.08)',
        'pink': '0 8px 32px -8px rgb(255 45 120 / 0.35)',
        'pink-lg': '0 16px 48px -12px rgb(255 45 120 / 0.45)',
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-6px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        pulsePink: { "0%,100%": { boxShadow: "0 0 0 0 rgb(255 45 120 / 0.4)" }, "50%": { boxShadow: "0 0 0 12px rgb(255 45 120 / 0)" } },
        rise: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shine: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        pulsePink: "pulsePink 2s infinite",
        rise: "rise 0.6s ease-out forwards",
        shine: "shine 1.2s ease-out",
      }
    },
  },
  plugins: [],
};
export default config;
