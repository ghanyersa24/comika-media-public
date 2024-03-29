
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        primary: '#006BC1',
        primaryLight: '#0080FF',
        primaryDark: '#0F60AA',
        textSecondary: '#515151',
        warning: '#EDAA21',
        bgGray: '#F8FAFF',
        bgGrayLight: '#F9F9F9',
        bgBlueLight: '#F8FAFF',
      },
      spacing: { 28: '7rem' },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        // sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        // md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.5rem',
          md: '2rem',
        },
      },
    },
    screens: {
      hp: '359px',
      hp2: '376px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  variants: {
    extend: {
      backgroundColor: ['checked', 'active', 'disabled'],
      cursor: ['disabled', 'active'],
      opacity: ['disabled'],
      borderColor: ['checked'],
    },
  },

}
