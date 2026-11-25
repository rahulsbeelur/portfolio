import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SEO } from '../modules/common/components/SEO';
import { getMDData } from '../modules/common/utils/mdxUtils';
import { getReadingTime } from '../modules/common/utils/readTime';
import { MdxPaths } from '../constant/paths';
import { personDetails } from '../modules/common/data/person';
import { loadBuildProjects, loadBuildUpdates } from '../modules/building/loadBuilding';
import { getProject } from '../modules/building/utils';
import { BuildProject, BuildUpdateDocument } from '../modules/building/types';
import { BuildUpdateCard, formatBuildDate } from '../modules/building/components/BuildUpdateCard';
import { ActiveBuildPanel } from '../modules/building/components/ActiveBuildPanel';

interface LatestPost {
    title: string;
    summary: string;
    publishedAt: string;
    slug: string;
    readingTime: string;
}

interface HomeProps {
    buildProjects: BuildProject[];
    buildUpdates: BuildUpdateDocument[];
    latestPost: LatestPost | null;
    morePosts: LatestPost[];
}

const Home = ({
    buildProjects = [],
    buildUpdates = [],
    latestPost,
    morePosts = []
}: HomeProps): JSX.Element => (
    <div className="home-shell relative overflow-hidden pt-[108px] mobile:pt-[88px]">
        <SEO
            title="Rahul S Beelur | Backend, AI & Systems Engineering"
            description="Rahul S Beelur builds dependable backend and AI systems—and shares the work as it happens."
        />
        <div className="home-glow home-glow--one" aria-hidden="true" />

        <Wrapper classes="relative !max-w-[1180px] !pt-8 mobile:!pt-5">
            <main>
                <section className="simple-home-hero">
                    <div className="home-hero__copy">
                        <div className="mobile-profile">
                            <Image
                                src="/my-photo.jpeg"
                                alt="Rahul S Beelur"
                                width={64}
                                height={64}
                                priority
                            />
                            <div>
                                <strong>{personDetails.name}</strong>
                                <span>Backend and AI engineer</span>
                            </div>
                        </div>

                        <p className="page-file">home.md</p>
                        <h1 className="home-title mt-6">
                            I build software that stays{' '}
                            <span className="home-title__accent">reliable.</span>
                        </h1>
                        <p className="lead-copy mt-7 max-w-[620px]">
                            I’m Rahul, a backend and AI engineer. See what I’m building now, explore
                            my projects, or read my technical notes.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href="#building-now" className="button-primary">
                                See what I’m building <span aria-hidden="true">↓</span>
                            </Link>
                            <Link href="/blog" className="button-secondary">
                                Read the blog <span aria-hidden="true">↗</span>
                            </Link>
                        </div>
                    </div>

                    <aside className="home-portrait" aria-label="About Rahul">
                        <div className="home-portrait__image">
                            <Image
                                src="/my-photo.jpeg"
                                alt="Rahul S Beelur"
                                width={520}
                                height={620}
                                priority
                            />
                        </div>
                    </aside>
                </section>
            </main>
        </Wrapper>

        <section id="building-now" className="build-section scroll-mt-28">
            <Wrapper classes="!max-w-[1180px] !py-16 mobile:!py-12">
                <div className="section-heading">
                    <div>
                        <p className="page-file">build-log.md</p>
                        <h2 className="section-title mt-4">Projects I’m building.</h2>
                    </div>
                    <p className="section-heading__copy">
                        Short, honest updates on what changed, what I learned, and what comes next.
                    </p>
                </div>

                <div className="mt-10">
                    <ActiveBuildPanel projects={buildProjects} />
                </div>
                <div className="mt-7 text-right mobile:text-left">
                    <Link href="/building" className="text-link">
                        Open the full build log →
                    </Link>
                </div>

                {buildUpdates.length > 0 && (
                    <div className="home-build-updates mt-12">
                        <div className="home-section-label">
                            <p>Recent updates</p>
                            <span>
                                Updated {formatBuildDate(buildUpdates[0].frontmatter.publishedAt)}
                            </span>
                        </div>
                        <div className="build-entry-grid">
                            {buildUpdates.slice(0, 2).map((update, index) => (
                                <BuildUpdateCard
                                    key={update.slug}
                                    update={update}
                                    project={getProject(buildProjects, update.frontmatter.project)}
                                    featured={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Wrapper>
        </section>

        <Wrapper classes="!max-w-[1180px] !py-16 mobile:!py-12">
            {latestPost && (
                <section className="home-writing">
                    <div>
                        <p className="page-file">blog.md</p>
                        <h2 className="section-title mt-4">Blog.</h2>
                        <p className="home-writing__intro">
                            Practical lessons from backend systems, AI tools, and product work.
                        </p>
                        <Link href="/blog" className="text-link home-writing__all">
                            View every post →
                        </Link>
                    </div>
                    <div className="home-writing__feed">
                        <Link
                            href={`/blog/${latestPost.slug}`}
                            className="home-writing__post group">
                            <div className="home-writing__meta">
                                <span>Latest article</span>
                                <span>
                                    {formatBuildDate(latestPost.publishedAt)} ·{' '}
                                    {latestPost.readingTime}
                                </span>
                            </div>
                            <h3>{latestPost.title}</h3>
                            <p>{latestPost.summary}</p>
                            <b>Read the post →</b>
                        </Link>

                        {morePosts.length > 0 && (
                            <div className="home-writing__more" aria-label="More recent blog posts">
                                {morePosts.map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                                        <span>
                                            {formatBuildDate(post.publishedAt)} · {post.readingTime}
                                        </span>
                                        <strong>{post.title}</strong>
                                        <b aria-hidden="true">↗</b>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className="home-cta mt-16">
                <div>
                    <p className="page-file">contact.md</p>
                    <p className="home-cta__prompt">Want to talk about backend or AI?</p>
                    <h2>Let’s have a conversation.</h2>
                </div>
                <a href="mailto:srahulbeelur@gmail.com" className="button-primary">
                    Start a conversation <span aria-hidden="true">↗</span>
                </a>
            </section>
        </Wrapper>
    </div>
);

export default Home;

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
    const projects = loadBuildProjects();
    const buildUpdates = await loadBuildUpdates();
    const blogFiles = fs.existsSync(MdxPaths.Blog)
        ? fs.readdirSync(MdxPaths.Blog).filter((file) => file.endsWith('.mdx'))
        : [];
    const posts = await Promise.all(
        blogFiles.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            const { frontmatter } = await getMDData<{
                title: string;
                summary: string;
                publishedAt: string;
            }>(`${MdxPaths.Blog}/${file}`);
            return {
                ...frontmatter,
                slug,
                readingTime: getReadingTime(`${MdxPaths.Blog}/${file}`).label
            };
        })
    );
    const latestPost =
        posts.sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )[0] ?? null;
    const morePosts = posts.slice(1, 3);

    return {
        props: {
            buildProjects: projects,
            buildUpdates: buildUpdates.slice(0, 2),
            latestPost,
            morePosts
        }
    };
};
