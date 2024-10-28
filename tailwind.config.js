/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '22.5': '5.625rem', // 5.625rem = 90px (если базовый размер шрифта 16px)
        '18': '4.5rem',
        '55': '13.75rem',
        '30': '7.5rem',
         '4.5': '1.125rem',
         '35': '8.75rem',
         '17': '4.25rem',
         '12.5': '3.125rem', // Добавляем класс для padding-top
         '7.5': '1.875rem', // Добавляем значение gap: 1.875rem
         '27.5': '6.875rem', // Определяем кастомное значение для padding-bottom
         '17.5': '4.375rem', // Определяем кастомное значение для padding-top
         '15': '3.75rem',
         '9.5': '2.375rem',
      },
      zIndex: {
        '999': '999', // Кастомный класс z-999
      },
      fontSize: {
        'heading-1': ['60px', { lineHeight: '72px' }],
        'heading-2': ['48px', { lineHeight: '58px' }],
      },
      zIndex: {
        '-1': '-1', // Добавляем кастомное значение для z-index
      },
      margin: {
        '5.5': '1.375rem', // Добавляем класс для отступа mb-5.5
      },
    },
  },
  plugins: [],
}