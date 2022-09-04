/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});

module.exports = withBundleAnalyzer({});
