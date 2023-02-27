/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: "Montserrat, sans-serif",
            },
            colors: {
                base: "#121212",
                prime: "#1A1A1B",
                secondary: "#25262C",
            },
        },
    },
    plugins: [],
};
