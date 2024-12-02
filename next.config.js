/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@maplibre/maplibre-gl-style-spec': '@maplibre/maplibre-gl-style-spec/dist/index.es.js',
    };
    return config;
  },
};

module.exports = nextConfig;