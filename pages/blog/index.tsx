import fs from 'fs';
import Link from 'next/link';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import type { BlogPost } from './[slug]';

const BlogPage = ({
    posts,
    pageContent
}: {
    posts: { frontmatter: BlogPost; slug: string }[];
    pageContent: PageContent;
}): JSX.Element => {
    return (
        <Wrapper classes="normal-case">
            <SEO
                title={pageContent.seoTitle}
                description={pageContent.seoDescription}
                path="/blog"
            />
            <main className="mx-auto max-w-[980px] pt-32 pb-20">
                <header className="max-w-2xl">
                    <p className="font-robotoMono text-sm text-muted">{pageContent.eyebrow}</p>
                    <h1 className="mt-3 text-[48px] font-poppins font-[600] leading-[58px] text-foreground mobile:text-[36px] mobile:leading-[44px]">
                        {pageContent.title}
                    </h1>
                    <p className="body1 mt-4 text-muted">{pageContent.description}</p>
                </header>

                <section className="mt-12 grid gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="quiet-card block p-6 transition hover:border-[var(--accent)]">
                            <div className="flex flex-wrap items-center gap-3 font-robotoMono text-sm text-muted">
                                <span>{post.frontmatter.publishedAt}</span>
                                {post.frontmatter.readingTime && <span>{post.frontmatter.readingTime}</span>}
                            </div>
                            <h2 className="sub-headline1 mt-3 text-foreground">
                                {post.frontmatter.title}
                            </h2>
                            <p className="body2 mt-3 max-w-2xl text-muted">{post.frontmatter.summary}</p>
                            {post.frontmatter.tags && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {post.frontmatter.tags.map((tag) => (
                                        <span key={tag} className="code-chip">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
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
    props: { posts: { frontmatter: BlogPost; slug: string }[]; pageContent: PageContent };
}> => {
    const files = fs.existsSync(MdxPaths.Blog) ? fs.readdirSync(MdxPaths.Blog) : [];
    const posts = await Promise.all(
        files
            .filter((file) => file.endsWith('.mdx'))
            .map(async (file) => {
                const slug = file.replace(/\.mdx$/, '');
                const { frontmatter } = await getMDData<BlogPost>(`${MdxPaths.Blog}/${file}`);
                return { frontmatter, slug };
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
