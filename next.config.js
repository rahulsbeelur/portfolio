/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

const environmentVariables = [
  'NEXT_PUBLIC_BLOG_PAGE_PRESENT'
];

environmentVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Environment variable ${variable} is not defined`);
  }
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: 'marketplace.visualstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  turbopack: {},
});