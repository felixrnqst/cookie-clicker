const withPlugins = require('next-compose-plugins');
const sass = require('sass')
const path = require('path')

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }
//
// module.exports = nextConfig

module.exports = withPlugins([
  // withVideos,
  [sass, {
    includePaths: [path.join(__dirname, 'css'), path.join(__dirname, 'components'), path.join(__dirname, 'components/small')],
  }]
],{images: {
    domains: [
    ],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },});
