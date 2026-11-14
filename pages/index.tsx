import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import YAML from 'yaml';
import { headerCase, paramCase } from 'change-case';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SEO } from '../modules/common/components/SEO';
import { personDetails } from '../modules/common/data/person';
import { checkImageResolutions } from '../modules/common/utils/imageUtils';
import { getMDData } from '../modules/common/utils/mdxUtils';
import { MdxPaths, TechnologiesPath } from '../constant/paths';
import { AboutMeIntroduction } from '../modules/about-me/models/type';
import { QuickRead } from '../modules/quick-reads/content';
import { loadQuickReads } from '../modules/quick-reads/loadQuickReads';

interface Technology {
    fileName: string;
    title: string;
    level: number;
}
interface TechnologiesData {
    [key: string]: Technology[];
}

const Home = ({
    introductionContent,
    techStack,
    quickReads
}: {
    introductionContent: AboutMeIntroduction;
    techStack: TechnologiesData;
    quickReads: { frontmatter: QuickRead; slug: string }[];
}): JSX.Element => {
    const highlights = introductionContent.highlights ?? [];
    return (
        <div className="relative overflow-hidden pt-[80px]">
            <SEO
                title="Rahul S Beelur | AI Systems & Backend Engineer"
                description="Rahul S Beelur builds reliable backend systems and thoughtful AI-powered products."
            />
            <Wrapper classes="relative py-8 desktop:py-12">
                <section className="hero-grid">
                    <div className="max-w-4xl">
                        <p className="eyebrow">
                            AI systems · backend engineering · product thinking
                        </p>
                        <h1 className="display-title mt-5">
                            Building the dependable layer beneath intelligent products.
                        </h1>
                        <p className="lead-copy mt-7 max-w-2xl">
                            I’m Rahul, a software engineer moving deeper into AI. I write about
                            turning ambitious ideas into systems that are useful, observable, and
                            built to last.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href="/blog" className="button-primary">
                                Read my writing <span>↗</span>
                            </Link>
                            <Link href="/quick-reads" className="button-secondary">
                                Explore quick reads <span>↓</span>
                            </Link>
                        </div>
                        <div className="mt-12 grid gap-3 sm:grid-cols-2">
                            {highlights.map((highlight) => (
                                <div key={highlight.label} className="signal-card">
                                    <p>{highlight.label}</p>
                                    <strong>{highlight.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside className="profile-panel">
                        <div className="flex items-center justify-between border-b dev-divider pb-5 font-robotoMono text-xs text-muted">
                            <span>now.md</span>
                            <span>open to ideas</span>
                        </div>
                        <div className="mt-7 flex items-center gap-5">
                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border dev-divider">
                                <Image
                                    src="/my-photo.jpeg"
                                    alt="Rahul S Beelur"
                                    width={320}
                                    height={320}
                                    priority
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-foreground">
                                    {personDetails.name}
                                </p>
                                <p className="mt-1 font-robotoMono text-xs text-muted">
                                    {personDetails.designation}
                                </p>
                            </div>
                        </div>
                        <div className="profile-note mt-8">
                            Currently exploring the junction of dependable infrastructure and AI
                            systems that earn trust in production.
                        </div>
                        <Link
                            href="/resume"
                            className="mt-8 inline-flex font-robotoMono text-sm text-accent hover:text-foreground">
                            View background →
                        </Link>
                    </aside>
                </section>
            </Wrapper>

            <section className="border-y dev-divider bg-surface/40">
                <Wrapper classes="py-16 desktop:py-20">
                    <div className="flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="eyebrow">A faster format</p>
                            <h2 className="section-title mt-3">Worth your next minute.</h2>
                        </div>
                        <Link href="/quick-reads" className="text-link">
                            See every quick read →
                        </Link>
                    </div>
                    <div className="quick-preview mt-10">
                        {quickReads.map((post, index) => (
                            <Link
                                href="/quick-reads"
                                key={post.slug}
                                className="quick-preview-card">
                                <span>
                                    {String(index + 1).padStart(2, '0')} — {post.frontmatter.area}
                                </span>
                                <h3>{post.frontmatter.title}</h3>
                                <p>{post.frontmatter.summary}</p>
                                <b>Read in 60 sec ↗</b>
                            </Link>
                        ))}
                    </div>
                </Wrapper>
            </section>

            <Wrapper classes="py-16 desktop:py-20">
                <section className="grid gap-10 desktop:grid-cols-[0.75fr_1.25fr] desktop:items-start">
                    <div>
                        <p className="eyebrow">How I work</p>
                        <h2 className="section-title mt-3">Practical systems thinking.</h2>
                        <p className="lead-copy mt-5 text-[17px]">
                            The tools change. Clear boundaries, meaningful telemetry, and calm
                            operational defaults do not.
                        </p>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(techStack).map(([category, technologies]) => (
                            <div key={category} className="stack-row">
                                <p>{headerCase(category).replace('-', ' ')}</p>
                                <div>
                                    {technologies.slice(0, 6).map((tech) => (
                                        <span key={tech.fileName}>
                                            <Image
                                                src={`/tech-stack/${paramCase(category)}/${
                                                    tech.fileName
                                                }.png`}
                                                alt=""
                                                width={18}
                                                height={18}
                                            />
                                            {tech.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Wrapper>
        </div>
    );
};

export default Home;

export const getStaticProps = async (): Promise<{
    props: {
        introductionContent: AboutMeIntroduction;
        techStack: TechnologiesData;
        quickReads: { frontmatter: QuickRead; slug: string }[];
    };
}> => {
    checkImageResolutions('public');
    const introduction = await getMDData<AboutMeIntroduction>(
        `${MdxPaths.AboutMeIntroduction}/introduction.mdx`
    );
    const technologies: TechnologiesData = {};
    Object.entries(TechnologiesPath).forEach(([key, value]) => {
        technologies[key] = YAML.parse(fs.readFileSync(value, 'utf8')).technologies as Technology[];
    });
    const quickReads = (await loadQuickReads())
        .slice(0, 3)
        .map(({ frontmatter, slug }) => ({ frontmatter, slug }));
    return {
        props: {
            introductionContent: {
                code: introduction.code,
                layout: introduction.frontmatter.layout ?? 'DefaultLayout',
                eyebrow: introduction.frontmatter.eyebrow,
                headline: introduction.frontmatter.headline,
                summary: introduction.frontmatter.summary,
                profileFileName: introduction.frontmatter.profileFileName,
                profileStatus: introduction.frontmatter.profileStatus,
                profileSnippet: introduction.frontmatter.profileSnippet,
                highlights: introduction.frontmatter.highlights,
                toolsEyebrow: introduction.frontmatter.toolsEyebrow,
                toolsTitle: introduction.frontmatter.toolsTitle
            },
            techStack: technologies,
            quickReads
        }
    };
};
