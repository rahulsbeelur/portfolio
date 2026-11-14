import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { getMDData, getSlugs } from '../../modules/common/utils/mdxUtils';
import { renderMDSection } from '../../modules/common/utils/mdxBundlerUtils';
import { MdxPaths } from '../../constant/paths';
import { getReadingTime } from '../../modules/common/utils/readTime';

export interface BlogPost {
    title: string;
    summary: string;
    publishedAt: string;
    tags?: string[];
}

const quickReadsReturnPath = (value: string | string[] | undefined): string | undefined => {
    if (typeof value !== 'string') return undefined;
    if (
        !value.startsWith('/quick-reads') ||
        value.startsWith('//') ||
        value.includes('://') ||
        value.includes('\\')
    ) {
        return undefined;
    }
    return value;
};

const BlogPostPage = ({
    post
}: {
    post: { code: string; frontmatter: BlogPost; slug: string; readingTime: string };
}): JSX.Element => {
    const { query } = useRouter();
    const returnPath = quickReadsReturnPath(query.return);
    const cameFromQuickReads = query.from === 'quick-reads' || Boolean(returnPath);
    const backHref = returnPath ?? (cameFromQuickReads ? '/quick-reads' : '/blog');
    const backLabel = returnPath?.startsWith('/quick-reads/focus')
        ? 'Focus'
        : cameFromQuickReads
        ? 'Quick reads'
        : 'Writing';
    return (
        <Wrapper classes="normal-case">
            <SEO
                title={`${post.frontmatter.title} | Rahul S Beelur`}
                description={post.frontmatter.summary}
                path={`/blog/${post.slug}`}
            />
            <main className="mx-auto max-w-[760px] pt-32 pb-20">
                <nav aria-label="Breadcrumb" className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    {cameFromQuickReads ? (
                        <>
                            <Link href="/quick-reads">Quick reads</Link>
                            {returnPath?.startsWith('/quick-reads/focus') && (
                                <>
                                    <span>/</span>
                                    <Link href={returnPath}>Focus</Link>
                                </>
                            )}
                            <span>/</span>
                            <span>Deep dive</span>
                        </>
                    ) : (
                        <>
                            <Link href="/blog">Writing</Link>
                            <span>/</span>
                            <span>Article</span>
                        </>
                    )}
                </nav>
                <Link
                    href={backHref}
                    className="mt-5 inline-flex font-robotoMono text-sm text-muted hover:text-accent">
                    {'←'} Back to {backLabel}
                </Link>
                <header className="mt-8 border-b dev-divider pb-8">
                    <p className="font-robotoMono text-sm text-muted">
                        {post.frontmatter.publishedAt}
                        {` · ${post.readingTime}`}
                    </p>
                    <h1 className="mt-4 text-[42px] font-poppins font-[600] leading-[52px] text-foreground mobile:text-[34px] mobile:leading-[42px]">
                        {post.frontmatter.title}
                    </h1>
                    <p className="body1 mt-4 text-muted">{post.frontmatter.summary}</p>
                    {post.frontmatter.tags && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {post.frontmatter.tags.map((tag) => (
                                <span key={tag} className="code-chip">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>
                <article className="prose-content mt-10">
                    {renderMDSection(post.code, 'DefaultLayout')}
                </article>
            </main>
        </Wrapper>
    );
};

export default BlogPostPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = fs.existsSync(MdxPaths.Blog) ? getSlugs(MdxPaths.Blog) : [];

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<{
    post: { code: string; frontmatter: BlogPost; slug: string; readingTime: string };
}> = async ({ params }) => {
    const slug = String(params?.slug);
    const { code, frontmatter } = await getMDData<BlogPost>(`${MdxPaths.Blog}/${slug}.mdx`);

    return {
        props: {
            post: {
                code,
                frontmatter,
                slug,
                readingTime: getReadingTime(`${MdxPaths.Blog}/${slug}.mdx`).label
            }
        }
    };
};
