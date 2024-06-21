/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        cust1: ["PoorStory", "sans-serif"],
        pacifico: ["pacifico", "sans-serif"],
        poppins: ["poppins", "serif"],
        geologica: ["geologica", "sans-serif"],
      },
      screens: {
        sn: {
          min: "0px",
          max: "300px",
        },
        ns: {
          min: "0px",
          max: "639px",
        },
        sp: {
          min: "301px",
          max: "410px",
        },
        se: {
          min: "411px",
          max: "639px",
        },
        si: {
          min: "700px",
          max: "800px",
        },
        sr: {
          min: "801px",
          max: "930px",
        },
        exMd: {
          min: "0px",
          max: "767px",
        },
        phone: { max: "639px" }, // Phones and smaller devices
        tablet: { min: "700px", max: "1023px" }, // Tablets and larger phones
        laptop: { min: "1024px", max: "1920px" },
        desktop: { min: "1921px" },
      },

      height: {
        "250px": "250px",
        "300px": "300px",
      },
    },
  },
  plugins: [],
};
