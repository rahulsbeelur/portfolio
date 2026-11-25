/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
});

const environmentVariables = ['NEXT_PUBLIC_BLOG_PAGE_PRESENT'];

environmentVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Environment variable ${variable} is not defined`);
    }
});

module.exports = withMDX({
    reactStrictMode: true,
    devIndicators: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
    allowedDevOrigins: ['127.0.0.1'],
    async redirects() {
        return [
            {
                source: '/quick-reads',
                destination: '/building',
                permanent: true
            },
            {
                source: '/quick-reads/focus',
                destination: '/building',
                permanent: true
            }
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.hashnode.com'
            },
            {
                protocol: 'https',
                hostname: 'marketplace.visualstudio.com'
            },
            {
                protocol: 'https',
                hostname: 'github.com'
            }
        ]
    },
    turbopack: {}
});
