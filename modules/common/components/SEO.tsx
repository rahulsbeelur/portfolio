import Head from 'next/head';
import { personDetails } from '../data/person';

const siteUrl = 'https://rahulsbeelur.com';
const defaultDescription =
    'Rahul S Beelur is a software developer building clean interfaces, reliable APIs, and practical product systems with React, Next.js, TypeScript, and Node.js.';
const defaultImage = `${siteUrl}/open-graph.gif`;

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    noIndex?: boolean;
}

export const SEO = ({
    title = `${personDetails.name} | ${personDetails.designation}`,
    description = defaultDescription,
    path = '/',
    noIndex = false
}: SEOProps): JSX.Element => {
    const canonicalUrl = `${siteUrl}${path}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={personDetails.name} />
            <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={personDetails.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={defaultImage} />
            <meta property="og:image:type" content="image/gif" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@rahul_beelur" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultImage} />
        </Head>
    );
};
