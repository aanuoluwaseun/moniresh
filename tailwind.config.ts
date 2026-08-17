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
        border: "#E2E8F0",
        primary: "#4F46E5",
        primaryHover: "#4338CA",
        accent: "#06B6D4",
        accentSoft: "#ECFEFF",
        muted: "#F8FAFC",
        ink: {
          900: "#1E293B",
          700: "#334155",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          100: "#F1F5F9",
          50: "#F8FAFC",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(79,70,229,0.08), 0 1px 2px rgba(79,70,229,0.05)",
        card: "0 1px 2px rgba(0,0,0,0.04)",
        bright: "0 4px 20px rgba(79,70,229,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
