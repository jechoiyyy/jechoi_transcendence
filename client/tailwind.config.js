export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js,tsx,jsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#D0021B',
        accent: '#F5A623',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: []
}