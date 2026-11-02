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
          DEFAULT: '#F8F9FA',
          surface: '#FFFFFF',
          subtle: '#EDF0F3',
        },
        text: {
          DEFAULT: '#111315',
          muted: '#5A626A',
          dim: '#8E959E',
        },
        accent: {
          DEFAULT: '#0047FF',
          hover: '#0039CC',
        },
        border: {
          DEFAULT: '#DDE1E5',
          dark: '#B0B8C1',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '2px',
        sm: '2px',
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
