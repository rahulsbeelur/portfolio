import fs from 'fs';
import Link from 'next/link';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { getReadingTime } from '../../modules/common/utils/readTime';
import { PageHeader } from '../../modules/common/components/PageHeader';
import type { BlogPost } from './[slug]';

const BlogPage = ({
    posts,
    pageContent
}: {
    posts: { frontmatter: BlogPost; slug: string; readingTime: string }[];
    pageContent: PageContent;
}): JSX.Element => {
    return (
        <Wrapper classes="normal-case">
            <SEO
                title={pageContent.seoTitle}
                description={pageContent.seoDescription}
                path="/blog"
            />
            <main className="mx-auto max-w-[1080px] pt-32 pb-20 mobile:pt-24">
                <PageHeader
                    fileName={pageContent.eyebrow}
                    title={pageContent.title}
                    description={pageContent.description}
                />

                <section className="blog-index mt-16">
                    {posts.map((post, index) =>
                        index === 0 ? (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="blog-feature group">
                                <span className="blog-feature__number" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <article>
                                    <div className="blog-feature__meta">
                                        <p className="page-file">featured-post.md</p>
                                        <span>
                                            {post.frontmatter.publishedAt} · {post.readingTime}
                                        </span>
                                    </div>
                                    <h2>{post.frontmatter.title}</h2>
                                    <p>{post.frontmatter.summary}</p>
                                    {post.frontmatter.tags && (
                                        <div className="blog-feature__tags">
                                            {post.frontmatter.tags.map((tag) => (
                                                <span key={tag}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    <b>Read the article →</b>
                                </article>
                            </Link>
                        ) : (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="editorial-index__item group">
                                <div className="editorial-index__meta">
                                    <strong>{String(index + 1).padStart(2, '0')}</strong>
                                    <span>{post.frontmatter.publishedAt}</span>
                                    <span>{post.readingTime}</span>
                                </div>
                                <div>
                                    <h2>{post.frontmatter.title}</h2>
                                    <p>{post.frontmatter.summary}</p>
                                    {post.frontmatter.tags && (
                                        <div className="editorial-index__tags">
                                            {post.frontmatter.tags.map((tag) => (
                                                <span key={tag}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="editorial-index__arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </Link>
                        )
                    )}
                </section>
            </main>
        </Wrapper>
    );
};

export default BlogPage;

interface PageContent {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    description: string;
}

export const getStaticProps = async (): Promise<{
    props: {
        posts: { frontmatter: BlogPost; slug: string; readingTime: string }[];
        pageContent: PageContent;
    };
}> => {
    const files = fs.existsSync(MdxPaths.Blog) ? fs.readdirSync(MdxPaths.Blog) : [];
    const posts = await Promise.all(
        files
            .filter((file) => file.endsWith('.mdx'))
            .map(async (file) => {
                const slug = file.replace(/\.mdx$/, '');
                const { frontmatter } = await getMDData<BlogPost>(`${MdxPaths.Blog}/${file}`);
                return {
                    frontmatter,
                    slug,
                    readingTime: getReadingTime(`${MdxPaths.Blog}/${file}`).label
                };
            })
    );
    const { frontmatter: pageContent } = await getMDData<PageContent>(`${MdxPaths.Pages}/blog.mdx`);

    return {
        props: {
            posts: posts.sort(
                (a, b) =>
                    new Date(b.frontmatter.publishedAt).getTime() -
                    new Date(a.frontmatter.publishedAt).getTime()
            ),
            pageContent
        }
    };
};
