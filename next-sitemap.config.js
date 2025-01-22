/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://medical-tau-nine.vercel.app',
  generateRobotsTxt: true, // Генерация robots.txt
  changefreq: 'daily', // Частота изменений страниц
  priority: 0.7,
  sitemapSize: 5000,
  // Настройка локалей для sitemap
  i18n: {
    locales: [, 'ro-RO'],
    defaultLocale: 'ro-RO',
  },
};
