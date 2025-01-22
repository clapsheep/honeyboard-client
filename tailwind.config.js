/** @type {import('tailwindcss').Config} */
import { theme } from './src/theme';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme,
    plugins: [],
    extend: {
        animation: {
            marquee: 'marquee 15s linear infinite',
        },
        keyframes: {
            marquee: {
                '0%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-50%)' },
            },
        },
    },
};
