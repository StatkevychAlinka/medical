/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourwebsite.com',
  generateRobotsTxt: true, // Генерация robots.txt
  changefreq: 'daily', // Частота изменений страниц
  priority: 0.7,
  sitemapSize: 5000,
  // Настройка локалей для sitemap
  i18n: {
    locales: ['en-US', 'ro-RO'],
    defaultLocale: 'en-US',
  },
};
