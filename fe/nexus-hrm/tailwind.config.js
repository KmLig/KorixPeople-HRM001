/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#135bec',
        'primary-dark': '#4338ca',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'surface-light': '#ffffff',
        'surface-dark': '#1a2233',
        'border-light': '#e7ebf3',
        'text-main': '#0d121b',
        'text-secondary': '#4c669a',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
