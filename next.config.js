module.exports = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placedog.net',
      }, {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      }
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/shop/collections',
        destination: '/shop',
        permanent: true,
      },
    ]
  },
};