/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                eco: {
                    green: '#2E8B57', // SeaGreen
                    dark: '#1a4a31',
                    light: '#8FBC8F', // DarkSeaGreen
                    cream: '#F5F5DC', // Beige
                    brown: '#8B4513', // SaddleBrown
                    text: '#2C3E50',
                    bg: '#F9FFF9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
