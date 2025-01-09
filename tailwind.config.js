/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Включение темной темы
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Шаблоны в директории app
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Шаблоны в директории pages
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Шаблоны в директории components
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Шаблоны в директории src (если используется)
  ],
  theme: {
    extend: {
      // Кастомные размеры шрифтов
      fontSize: {
        'h1-sm': ['2rem', { lineHeight: '2.5rem' }], // h1 для маленьких экранов
        'h1-md': ['2.5rem', { lineHeight: '3rem' }],
        'h1-lg': ['3rem', { lineHeight: '3.5rem' }],
        'h1-xl': ['3.5rem', { lineHeight: '4rem' }],
        'h2-sm': ['1.75rem', { lineHeight: '2.25rem' }], // h2
        'h2-md': ['2rem', { lineHeight: '2.5rem' }],
        'h2-lg': ['2.25rem', { lineHeight: '2.75rem' }],
        'h2-xl': ['2.5rem', { lineHeight: '3rem' }],
        'h3-sm': ['1.5rem', { lineHeight: '2rem' }], // h3
        'h3-md': ['1.75rem', { lineHeight: '2.25rem' }],
        'h3-lg': ['2rem', { lineHeight: '2.5rem' }],
        'h3-xl': ['2.25rem', { lineHeight: '2.75rem' }],
        'p-sm': ['1rem', { lineHeight: '1.5rem' }], // p (абзац)
        'p-md': ['1.125rem', { lineHeight: '1.75rem' }],
        'p-lg': ['1.25rem', { lineHeight: '2rem' }],
        'p-xl': ['1.375rem', { lineHeight: '2.25rem' }],
      },

      // Кастомный шрифт
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'], // Пример кастомного шрифта
      },

      // Кастомные отступы
      spacing: {
        'custom-sm': '0.5rem', // 8px
        'custom-md': '1.25rem', // 20px
        'custom-lg': '2rem', // 32px
        'custom-xl': '4rem', // 64px
        'custom-xxl': '6rem', // 96px
      },

      // Кастомные формы (clip-path)
      clipPath: {
        star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      },

      // Кастомные цвета
      colors: {
        // Цвета кнопок
        button: {
          primary: '#2563EB', // Основной синий
          hover: '#1E3A8A', // Тёмно-синий при наведении
          secondary: '#44B67F', // Зелёный
          hoverSecondary: '#2D8654', // Тёмно-зелёный при наведении
        },

        // Цвета фона
        background: {
          blue: '#2563EB', // Синий фон
          white: '#FFFFFF', // Белый фон
        },

        // Основные цвета
        primary: {
          blue: '#005EB8', // Основной синий
          white: '#FFFFFF', // Белый
        },

        // Второстепенные цвета
        secondary: {
          gray: '#F2F2F2', // Светло-серый фон
          green: '#44B67F', // Зелёный
        },

        // Акцентные цвета
        accent: {
          turquoise: '#17C3B2', // Бирюзовый
          yellow: '#FFD700', // Жёлтый
        },

        // Цвета текста
        text: {
          main: '#333333', // Основной текст
          secondary: '#666666', // Второстепенный текст
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Анимации
  ],
};
