/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        'custom-gray': '#515154',
        'color-footer': '#86868B',
        'color-title-footer': '#D2D2D7'
      },
      boxShadow: {
        'custom': '0px 1px 8px rgba(0, 0, 0, 0.2)', // Tạo giá trị shadow tùy chỉnh
      },
      fontSize: {
        '13': '13px',
        '15': '15px'
      }
    },
  },
  plugins: [],
}

