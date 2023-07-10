/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
});

import('next-fonts');

const locales = process.env.NEXT_PUBLIC_GENERATE_FRENCH_CONTENT === 'on' ? ['en', 'fr'] : ['en'];

module.exports = withMDX({
    reactStrictMode: true,
    i18n: {
        locales,
        defaultLocale: 'en'
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
    images: {
        domains: ['cdn.hashnode.com', 'marketplace.visualstudio.com', 'github.com']
    }
    // webpack: (config) => {
    //     const environmentVariables = ['NEXT_PUBLIC_BLOG_POSTS_PER_PAGE'];
    //     environmentVariables.forEach((variable) => {
    //         if (!process.env[variable]) {
    //             throw new Error(`Environment variable ${variable} is not defined`);
    //         }
    //     });

    //     return config;
    // }
});
