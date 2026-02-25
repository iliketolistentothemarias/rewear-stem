/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['"TiemposText"', 'Georgia', 'serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: 'var(--card)',
                cardForeground: 'var(--card-foreground)',
                border: 'var(--border)',
                primary: 'var(--primary)',
                primaryForeground: 'var(--primary-foreground)',
                muted: 'var(--muted)',
                mutedForeground: 'var(--muted-foreground)',
                accent: 'var(--accent)',
                accentForeground: 'var(--accent-foreground)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(15px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
