/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
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
      colors: {
        primary: {
          // DEFAULT: "#16a34a",
          DEFAULT: "#e42012",
          light: "#fc1706",
        },
        black:{
          DEFAULT:"#000",
          light:"#121212",
        },
        darkGray:{
          DEFAULT:"#1f2937",
          light:"#4b5563",
        },
        lightGray:{
          DEFAULT:"#9ca3af",
          light:"#e5e7eb",
        },
        
      },
    },
  },
  plugins: [],
};
