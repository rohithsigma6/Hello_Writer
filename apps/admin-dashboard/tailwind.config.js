/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                courier: ["Courier Prime", "monospace"],
                roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                "nav-theme": "#FFF8EE",
                "primary-light-blue": "#D6CCFF",
                "primary-blue": "#663EFF",
                "primary-green": "#42BA7B",
                "custom-pink": "#E86B84",
                "landing-text": "#43479B",
                "landing-btn-text": "#F28C99",
                "light-grey": "#6A6A75",
                "pricing-blue": "#43479B",
                "primary-cta": "#653EFF",
                "input-label": "#9999A0",
                "text-500": "#212131",
                "text-200": "#9999A0",
                'primary-purple': '#F0ECFF',
                'light-black': '#252C34',
                'light-blue': '#E7EDF3',
                "light-gray": "#8F8F8F",
                "dark-gray": "#E9E9EA",


            },
            screens: {
                xl: "1200px",
                "3xl": "2400px",
                "900px": "900px",
                "800px": "800px",
                xs: "470px",
                "2xl": "1441px"
            },
            backgroundColor: {
                "landing-bg": "#E7EBFF",
                "landing-btn": "#F28C99",
            },
            width: {
                "sceneInfoFirstRow": "60px",
                "category-all-elements-xl": "315px"
            },
            borderColor: {
                "landing-btn-border": "#F28C99",
                "border-input": "#d1d5db",

            },
            borderWidth: {
                "thin": "1px",
            },
            borderRadius: {
                inputStandard: "0.75rem",
            },
            backgroundImage: {
                'generate-gradient': 'linear-gradient(90deg, #003499 0%, #259999 100%)',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
