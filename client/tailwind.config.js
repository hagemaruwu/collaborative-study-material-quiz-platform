/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0D1015',
          elevated: '#13171F',
          subtle: '#181D26',
        },
        text: {
          DEFAULT: '#E6E9EE',
          muted: '#8B949E',
          dim: '#485260',
        },
        accent: {
          DEFAULT: '#FF5500',
          hover: '#E04B00',
        },
        border: {
          DEFAULT: '#262C36',
          bright: '#3D4654',
        }
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '2px',
        lg: '2px',
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
