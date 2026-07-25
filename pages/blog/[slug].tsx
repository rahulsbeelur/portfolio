import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { getMDData, getSlugs } from '../../modules/common/utils/mdxUtils';
import { renderMDSection } from '../../modules/common/utils/mdxBundlerUtils';
import { MdxPaths } from '../../constant/paths';

export interface BlogPost {
    title: string;
    summary: string;
    publishedAt: string;
    readingTime?: string;
    tags?: string[];
}

const BlogPostPage = ({
    post
}: {
    post: { code: string; frontmatter: BlogPost; slug: string };
}): JSX.Element => {
    return (
        <Wrapper classes="normal-case">
            <SEO
                title={`${post.frontmatter.title} | Rahul S Beelur`}
                description={post.frontmatter.summary}
                path={`/blog/${post.slug}`}
            />
            <main className="mx-auto max-w-[760px] pt-32 pb-20">
                <Link href="/blog" className="font-robotoMono text-sm text-muted hover:text-accent">
                    {'<-'} blog
                </Link>
                <header className="mt-8 border-b dev-divider pb-8">
                    <p className="font-robotoMono text-sm text-muted">
                        {post.frontmatter.publishedAt}
                        {post.frontmatter.readingTime ? ` · ${post.frontmatter.readingTime}` : ''}
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
    post: { code: string; frontmatter: BlogPost; slug: string };
}> = async ({ params }) => {
    const slug = String(params?.slug);
    const { code, frontmatter } = await getMDData<BlogPost>(`${MdxPaths.Blog}/${slug}.mdx`);

    return {
        props: {
            post: { code, frontmatter, slug }
        }
    };
};
