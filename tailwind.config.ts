import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        forest: {
          DEFAULT: "rgb(var(--forest-green))",
        },
        olive: {
          DEFAULT: "rgb(var(--muted-olive))",
        },
        stone: {
          DEFAULT: "rgb(var(--natural-stone))",
        },
        ivory: {
          DEFAULT: "#F5F5F0",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
