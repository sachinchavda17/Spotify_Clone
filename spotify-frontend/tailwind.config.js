module.exports = {
  purge: [],
  darkMode: "dark", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss/base"),
    require("tailwindcss/components"),
    require("tailwindcss/utilities"),
    require("flowbite/plugin"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
