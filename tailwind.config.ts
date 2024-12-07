import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "w-screen1050": { max: "1050px" },
        "w-screen1000": { max: "1000px" },
        "w-screen950": { max: "950px" },
        "w-screen900": { max: "900px" },
        "w-screen850": { max: "850px" },
        "w-screen800": { max: "800px" },
        "w-screen750": { max: "750px" },
        "w-screen700": { max: "700px" },
        "w-screen650": { max: "650px" },
        "w-screen600": { max: "600px" },
        "w-screen550": { max: "550px" },
        "w-screen500": { max: "500px" },
        "w-screen450": { max: "450px" },
        "w-screen400": { max: "400px" },
        "w-screen350": { max: "350px" },
        "w-screen300": { max: "300px" },
        "w-screen250": { max: "250px" },
        "h-screen800": { raw: "(max-height: 800px)" },
        "h-screen750": { raw: "(max-height: 750px)" },
        "h-screen700": { raw: "(max-height: 700px)" },
        "h-screen650": { raw: "(max-height: 650px)" },
        "h-screen600": { raw: "(max-height: 600px)" },
        "h-screen550": { raw: "(max-height: 550px)" },
        "h-screen500": { raw: "(max-height: 500px)" },
        "h-screen450": { raw: "(max-height: 450px)" },
        "h-screen400": { raw: "(max-height: 400px)" },
        "h-screen350": { raw: "(max-height: 350px)" },
        "h-screen300": { raw: "(max-height: 300px)" },
        "h-screen250": { raw: "(max-height: 250px)" },
      },
    },
  },
  plugins: [],
};
export default config;
