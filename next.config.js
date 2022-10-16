/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  reloadOnOnline: false,
  // disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({});
