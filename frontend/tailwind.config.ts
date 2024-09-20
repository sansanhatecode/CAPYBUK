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
        brown: {
          xlight: '#FFE7DA',
          light: '#C5A27C',
          medium: '#AD7D59',
          dark: '#71604E',
          opacity: '#f1eae0b9',
        },
        pastelblue: {
          medium: '#A7C7E7'
        }
      }

    },
  },
  plugins: [],
};
export default config;
