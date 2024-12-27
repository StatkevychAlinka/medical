/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://crearesite-web.ro',
  generateRobotsTxt: true, // Enable robots.txt generation
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  // Additional paths to include
  additionalPaths: async (config) => {
    const paths = [];
    const categories = await getAllCategory('ro-RO');
    for (const category of categories) {
      paths.push({
        loc: `/${category.slug}`, // Category page
        lastmod: new Date().toISOString(),
      });
      const blogs = await getBlogsByCategorySlug('ro-RO', category.slug);
      blogs.forEach((blog) => {
        paths.push({
          loc: `/${category.slug}/${blog.slug}`, // Single post page
          lastmod: new Date().toISOString(),
        });
      });
    }
    return paths;
  },
};
