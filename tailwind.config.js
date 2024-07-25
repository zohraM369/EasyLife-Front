/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#001F4E",
        customGreen: "#4AD163",
        customBlue2: "#1774FF",
        customRouge: "#D0021B",
        customBlue3: "#E5F1FF",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "24px": "24px",
      },
    },
  },
  plugins: [],
};
