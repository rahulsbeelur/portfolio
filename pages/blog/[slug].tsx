import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
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

const BlogPostPage = ({
    post
}: {
    post: { code: string; frontmatter: BlogPost; slug: string; readingTime: string };
}): JSX.Element => {
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
                    <Link href="/blog">Blog</Link>
                    <span>/</span>
                    <span>Article</span>
                </nav>
                <Link
                    href="/blog"
                    className="mt-5 inline-flex font-robotoMono text-sm text-muted hover:text-accent">
                    {'←'} Back to the blog
                </Link>
                <header className="mt-8 border-b dev-divider pb-8">
                    <p className="page-file">blog.md</p>
                    <p className="mt-4 font-robotoMono text-sm text-muted">
                        {post.frontmatter.publishedAt}
                        {` · ${post.readingTime}`}
                    </p>
                    <h1 className="mt-4 text-[42px] font-poppins font-[600] leading-[52px] text-foreground mobile:text-[34px] mobile:leading-[42px]">
                        {post.frontmatter.title}
                    </h1>
                    <p className="body1 mt-4 text-muted">{post.frontmatter.summary}</p>
                    {post.frontmatter.tags && (
                        <div className="article-tags mt-6">
                            {post.frontmatter.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
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
