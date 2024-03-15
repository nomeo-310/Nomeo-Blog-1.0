import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#242424',
      'grey': '#F3F3F3',
      'dark-grey': '#6B6B6B',
      'red': '#FF4E4E',
      'transparent': 'transparent',
      'twitter': '#1DA1F2',
      'purple': '#8B46FF'
    },
    extend: {},
  },
  plugins: [],
};
export default config;
