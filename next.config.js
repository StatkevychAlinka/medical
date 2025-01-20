/** @type {import("next").NextConfig} */

const nextConfig = {
	optimizeFonts: true,
	swcMinify: true,
	experimental: {
	  optimizeCss: false, // Отключаем critters
	},
	generateBuildId: async () => {
	  return 'build_' + Date.now(); // Генерация уникального идентификатора сборки
	},
	reactStrictMode: true,
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'images.ctfassets.net',
		  port: '',
		  pathname: '/**',
		},
		{
		  protocol: 'https',
		  hostname: 'cdn.sanity.io',
		  port: '',
		  pathname: '/**',
		},
		{
		  protocol: 'https',
		  hostname: 'assets.ctfassets.net',
		  port: '',
		  pathname: '/**',
		},
		{
		  protocol: 'https',
		  hostname: 'ayushsingh.co.in',
		  port: '',
		  pathname: '/**',
		},
		{
			protocol: 'https',
			hostname: 'orl24.md',
			port: '',
			pathname: '/**',
		  },
	  ],
	},
	async redirects() {
	  return [
		{
		  source: '/dezvoltare-web/:slug',
		  destination: '/blog/:slug/:slug',
		  permanent: true,
		},
	  ];
	},
	i18n: {
	  locales: ['ro-RO'],
	  defaultLocale: 'ro-RO',
	},
	webpack(config) {
	  config.module.rules.push({
		test: /\.svg$/,
		use: [{ loader: "@svgr/webpack", options: { icon: true } }]
	  });
	  return config;
	},
	// Добавляем PostCSS с PurgeCSS
	postcss: {
	  plugins: [
		require('postcss-flexbugs-fixes'),
		[
		  'postcss-preset-env',
		  {
			autoprefixer: {
			  flexbox: 'no-2009',
			},
			stage: 3,
			features: {
			  'custom-properties': false,
			},
		  },
		],
		[
		  '@fullhuman/postcss-purgecss',
		  {
			content: [
			  './pages/**/*.{js,jsx,ts,tsx}',
			  './components/**/*.{js,jsx,ts,tsx}'
			],
			defaultExtractor: content => content.match(/([\w-/:]+(?<!:))/g) || [],
			safelist: ['html', 'body'],
		  },
		],
	  ],
	}
  };
  
  module.exports = nextConfig;









/** const nextConfig = {
	
	reactStrictMode: true,
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'images.ctfassets.net',
			port: '', // оставьте пустым, если не требуется
			pathname: '/**', // разрешаем все пути
		  },
		],
	  },
	i18n: {
		locales: ["en", "ro", "kg"],
		defaultLocale: "ro",
		localeDetection: false
	},

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }]
		});

		return config;
	}
};

module.exports = nextConfig;
*/