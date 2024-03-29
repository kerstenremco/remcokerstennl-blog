/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [{ pattern: /alert-./ }, { pattern: /badge-./ }],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["emerald", "dracula"],
  },
  plugins: [require("daisyui")],
};
