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
        border: "#E5E7EB",
        muted: "#F9FAFB",
        ink: {
          900: "#0A0A0A",
          700: "#171717",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          100: "#F3F4F6",
          50: "#F9FAFB",
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
        soft: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)",
        card: "0 1px 2px rgba(0,0,0,0.04)",
      },
      maxWidth: {
        content: "1120px",
      }
    },
  },
  plugins: [],
};
export default config;
