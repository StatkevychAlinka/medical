/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://crearesite-web.ro',
  generateRobotsTxt: true, // Enables the generation of robots.txt
  changefreq: 'daily', // Specifies how often the content changes
  priority: 0.7, // Default priority for pages
  sitemapSize: 5000, // Maximum number of entries per sitemap file
  i18n: {
    locales: ['en-US', 'ro-RO'], // Added 'en-US' for clarity; adjust based on your setup
    defaultLocale: 'ro-RO', // Default locale for the sitemap
  },
  // Custom configuration for excluding specific routes or dynamic patterns
  exclude: ['/api/*', '/admin/*'], // Exclude API and admin routes from the sitemap
  // Additional sitemap options (e.g., alternate links for localization)
  alternateRefs: [
    {
      href: 'https://crearesite-web.ro',
      hreflang: 'ro-RO',
    },
    {
      href: 'https://crearesite-web.ro/en',
      hreflang: 'en-US',
    },
  ],
};
