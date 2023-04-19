module.exports = {
  swcMinify: true,
  images: {
    deviceSizes: [768, 1024, 1280, 1600, 1920, 2400, 3800],
    imageSizes: [32, 64, 96, 128, 256, 350, 500],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placedog.net',
      }, {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      }, {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
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