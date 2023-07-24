/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
});

import('next-fonts');

module.exports = withMDX({
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
    images: {
        domains: ['cdn.hashnode.com', 'marketplace.visualstudio.com', 'github.com']
    },
    webpack: (config) => {
        const environmentVariables = ['BLOG_PAGE_PRESENT'];
        environmentVariables.forEach((variable) => {
            if (!process.env[variable]) {
                throw new Error(`Environment variable ${variable} is not defined`);
            }
        });
        return config;
    }
});
