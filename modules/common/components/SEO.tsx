import Head from 'next/head';
import { personDetails } from '../data/person';

const siteUrl = 'https://rahulsbeelur.com';
const defaultDescription =
    'Rahul S Beelur builds dependable backend and AI systems and shares the work as it happens.';
const defaultImagePath = '/social-preview.png';
const defaultImageAlt = 'Rahul S Beelur — Backend, AI and Systems Engineering';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article';
    publishedAt?: string;
    tags?: string[];
    noIndex?: boolean;
}

const absoluteUrl = (value: string): string => {
    if (/^https?:\/\//.test(value)) return value;
    return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

export const SEO = ({
    title = `${personDetails.name} | ${personDetails.designation}`,
    description = defaultDescription,
    path = '/',
    image = defaultImagePath,
    imageAlt = defaultImageAlt,
    type = 'website',
    publishedAt,
    tags = [],
    noIndex = false
}: SEOProps): JSX.Element => {
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={personDetails.name} />
            <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content={personDetails.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1731" />
            <meta property="og:image:height" content="909" />
            <meta property="og:image:alt" content={imageAlt} />
            {type === 'article' && publishedAt && (
                <meta property="article:published_time" content={publishedAt} />
            )}
            {type === 'article' && <meta property="article:author" content={personDetails.name} />}
            {type === 'article' &&
                tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@rahul_beelur" />
            <meta name="twitter:creator" content="@rahul_beelur" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={imageAlt} />
        </Head>
    );
};
