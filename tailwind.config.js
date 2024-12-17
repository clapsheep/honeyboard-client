/** @type {import('tailwindcss').Config} */
import { theme } from './src/theme';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme,
    plugins: [],
};
