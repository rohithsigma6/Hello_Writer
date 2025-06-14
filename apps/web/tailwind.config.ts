import type { Config } from "tailwindcss";

export default  {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        garnet: ["Garnett Normal Regular", "sans-serif"],
        garnetSemi: ["Garnett Semibold Regular", "sans-serif"],
        garnetMed: ["Garnett Medium Regular", "sans-serif"],
        garnetSemiItalic: ["Garnett SemiItalic", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        courier: ["var(--font-courier-prime)", "monospace"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
      },
      colors: {
        "nav-theme": "#FFF8EE",
        "primary-blue": "#663EFF",
        "primary-green": "#42BA7B",
        "custom-pink": "#E86B84",
        "landing-text": "#43479B",
        "landing-btn-text": "#F28C99",
        "light-grey": "#6A6A75",
        "pricing-blue": "#43479B",
        "primary-cta":"#653EFF",
        "input-label":"#9999A0",
        "text-500":"#212131",
        "text-200":"#9999A0",
        'primary-purple': '#F0ECFF',
        'light-black':'#252C34',
        'light-blue':'#E7EDF3',
        "light-gray": "#8F8F8F",
        "dark-gray": "#E9E9EA",


      },
      screens: {
        xl: "1200px",
        "3xl": "2400px",
        "900px": "900px",
        "800px": "800px",
        xs: "470px",
        "2xl":"1441px"
      },
      backgroundColor: {
        "landing-bg": "#E7EBFF",
        "landing-btn": "#F28C99",
      },
      width:{
        "sceneInfoFirstRow":"60px",
        "category-all-elements-xl":"315px"
      },
      borderColor: {
        "landing-btn-border": "#F28C99",
        "border-input":"#d1d5db",

      },
      borderWidth:{
        "thin":"1px",
      },
      borderRadius:{
        inputStandard:"0.75rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
