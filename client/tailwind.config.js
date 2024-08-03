/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grayscale: {
        // 0: 'var(--grayscale-00)',
        // 40: 'var(--grayscale-40)',
        60: 'var(--grayscale-60)',
        70: 'var(--grayscale-70)',
        80: 'var(--grayscale-80)',
        // 100: 'var(--grayscale-100)'
        5: 'var(--grayscale-5)',
        25: 'var(--grayscale-25)',
        90: 'var(--grayscale-90)'
      },
      green: {
        light: 'var(--green-light)',
        medium: 'var(--green-med)',
        dark: 'var(--green-dark)'
      },
      pink: {
        light: 'var(--pink-light)',
        medium: 'var(--pink-medium)',
        dark: 'var(--pink-dark)'
      },
      yellow: {
        light: 'var(--yellow-light)',
        dark: 'var(--yellow-dark)'
      },
      blue: {
        light: 'var(--blue-light)',
        dark: 'var(--blue-dark)'
      },
      orange: {
        light: 'var(--orange-light)',
        dark: 'var(--orange-dark)'
      },
      black: colors.black,
      white: colors.white
    },
    extend: {
      fontFamily: {
        main: ['ApfelGrotezk', 'ui-sans-serif'],
        alt: ['Roboto']
      },
      boxShadow: {
        'glow-sm': '0 0 2px -0 var(--tw-shadow-color)',
        'glow-md': '0 0 6px -1px var(--tw-shadow-color)',
        'glow-lg': '0 0 15px -3px var(--tw-shadow-color)',
        'glow-xl': '0 0 25px -5px var(--tw-shadow-color)',
        'glow-2xl': '0 0 50px -12px var(--tw-shadow-color)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem'
      }
    }
  },
  plugins: []
};
