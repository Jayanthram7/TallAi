/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ensure all file types are covered
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "oklch(0.922 0 0)", // Ensure border color is defined
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        marquee: "marquee 120s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // ✅ Add TailwindCSS Animate plugin
    function ({ addBase, theme }) {
      const colors = theme("colors");
      const newVars = Object.fromEntries(
        Object.entries(colors).map(([key, val]) => [
          `--${key}`,
          typeof val === "string" ? val : val[500] || val.DEFAULT,
        ])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
};
