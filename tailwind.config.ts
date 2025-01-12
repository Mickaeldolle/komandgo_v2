import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "rgb(var(--primary))",
        buttonHoverColor: "rgb(var(--button-hover-color))",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: "var(--font-roboto)",
        inter: "var(--font-inter)",
        pacifico: "var(--font-pacifico)",
        blackOpsOne: "var(--font-black-ops-one)",
      },
      backgroundImage: {
        'hero-home': "url('https://img.freepik.com/photos-premium/plat-restauration-rapide-fond-jaune-ensemble-restauration-rapide-burger-viande-poulet-frit-frites-restauration-rapide-emporter-ai-generative_410516-1055.jpg')",
      }
    },
  },
  plugins: [
  ],
} satisfies Config;
