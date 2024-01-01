// tailwind.config.js
module.exports = {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}", // Add your project source files
  ],
  plugins: [require("daisyui")],
};
