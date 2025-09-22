/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: {
        sans: ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Ubuntu","Arial"],
      },
      colors: {
        brand: {
          50:"#f2fbff",100:"#e6f6ff",200:"#ccecff",300:"#99dcff",
          400:"#66ccff",500:"#33bbff",600:"#149de1",700:"#0b79b4",
          800:"#095f8c",900:"#073f5c"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,.08)",
        tiny: "0 2px 10px rgba(2,6,23,.06)"
      },
      transitionTimingFunction: { smooth: "cubic-bezier(0.22, 1, 0.36, 1)" }
    },
  },
  plugins: [],
}
