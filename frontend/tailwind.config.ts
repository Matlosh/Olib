import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)'
      },
      screens: {
        'ps': '1600px'
      },
      width: {
        'ps': 'var(--ps)'
      },
      spacing: {
        'ps': 'var(--ps)'
      },
      maxWidth: {
        'ps': 'var(--ps)'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
