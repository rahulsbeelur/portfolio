import fs from 'fs';
import YAML from 'yaml';
import Image from 'next/image';
import Link from 'next/link';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SEO } from '../modules/common/components/SEO';
import { personDetails } from '../modules/common/data/person';
import { SocialHandles } from '../modules/common/components/SocialHandles';
import { checkImageResolutions } from '../modules/common/utils/imageUtils';
import { MdxPaths, TechnologiesPath } from '../constant/paths';
import { getMDData } from '../modules/common/utils/mdxUtils';
import { AboutMeIntroduction } from '../modules/about-me/models/type';
import { renderMDSection } from '../modules/common/utils/mdxBundlerUtils';
import { headerCase, paramCase } from 'change-case';

const Home = ({
    introductionContent,
    techStack
}: {
    introductionContent: AboutMeIntroduction;
    techStack: TechnologiesData;
}): JSX.Element => {
    return (
        <div className="engineer-grid relative overflow-hidden">
            <SEO
                title="Rahul S Beelur | Software Developer"
                description="Portfolio of Rahul S Beelur, a software developer focused on clean systems, useful product interfaces, reliable APIs, and readable code."
            />
            <Wrapper classes="relative min-h-screen">
                <section className="relative flex min-h-[calc(100vh-96px)] flex-col items-center justify-center pt-28 text-center mobile:pt-36">
                    <div className="space-y-10">
                        <div className="mx-auto flex flex-wrap items-center justify-center gap-4 font-robotoMono text-xs uppercase tracking-[0.32em] text-muted">
                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-accent-pulse" />
                                operational
                            </span>
                            <span className="text-[var(--grid-line)]">//</span>
                            <span>engineering systems</span>
                        </div>
                        <h1 className="font-robotoMono text-[96px] font-[400] leading-none tracking-0 text-foreground desktop:text-[112px] tablet:text-[76px] mobile:text-[42px]">
                            rahul.sb
                        </h1>
                        <p className="mx-auto max-w-3xl font-robotoMono text-sm uppercase leading-7 tracking-[0.28em] text-muted mobile:text-xs">
                            clean interfaces / dependable APIs / maintainable product systems
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/projects" className="system-action">
                                mission logs
                                <span>-></span>
                            </Link>
                            <Link href="/resume" className="system-action">
                                personnel file
                                <span>-></span>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-6 flex justify-between px-4 font-robotoMono text-[11px] uppercase tracking-[0.24em] text-muted mobile:bottom-3 mobile:flex-col mobile:items-center mobile:gap-2">
                        <span>system: online</span>
                        <span>v.2026.06</span>
                    </div>
                </section>
            </Wrapper>

            <div className="border-y dev-divider bg-[var(--panel-bg)]">
                <Wrapper classes="py-0">
                    <div className="grid grid-cols-[1.1fr_0.9fr] gap-0 desktop:min-h-[280px] tablet:grid-cols-1 mobile:grid-cols-1">
                        <nav className="grid border-r dev-divider tablet:border-r-0 mobile:border-r-0">
                            {[
                                { label: 'Access Logs', href: '/projects' },
                                { label: 'Personnel File', href: '/resume' },
                                { label: 'Open Channel', href: `mailto:${personDetails.mailId}` }
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="group flex items-center justify-between border-b dev-divider px-8 py-7 font-robotoMono text-sm uppercase tracking-[0.22em] text-foreground transition hover:bg-[var(--surface)] mobile:px-4">
                                    <span>{item.label}</span>
                                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-accent">
                                        -&gt;
                                    </span>
                                </Link>
                            ))}
                        </nav>
                        <div className="grid grid-cols-2 mobile:grid-cols-1">
                            <div className="border-r dev-divider p-8 mobile:border-r-0 mobile:border-b mobile:p-5">
                                <p className="font-robotoMono text-[11px] uppercase tracking-[0.28em] text-muted">
                                    active stack
                                </p>
                                <p className="mt-5 font-robotoMono text-3xl text-foreground">05</p>
                                <p className="body2 mt-2 text-muted">React, Next.js, TypeScript, Tailwind, Node.js</p>
                            </div>
                            <div className="p-8 mobile:p-5">
                                <p className="font-robotoMono text-[11px] uppercase tracking-[0.28em] text-muted">
                                    operating mode
                                </p>
                                <p className="mt-5 font-robotoMono text-3xl text-foreground">ship</p>
                                <p className="body2 mt-2 text-muted">Small decisions, clear commits, production checks.</p>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>

            <Wrapper classes="py-16">
                <section className="grid gap-8 desktop:grid-cols-[0.9fr_1.1fr]">
                    <aside className="system-panel p-5">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b dev-divider pb-4">
                                <p className="font-robotoMono text-xs uppercase tracking-[0.28em] text-muted">personnel file</p>
                                <p className="font-robotoMono text-xs text-accent">verified</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="relative h-28 w-28 overflow-hidden border dev-divider bg-surface">
                                    <Image
                                        src="/my-photo.jpeg"
                                        alt="personal image"
                                        width={1000}
                                        height={1000}
                                        priority
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-robotoMono text-xl text-foreground">{personDetails.name}</p>
                                    <p className="font-robotoMono text-sm text-muted">
                                        {personDetails.designation}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 text-foreground/80">
                                {renderMDSection(introductionContent.code, introductionContent.layout)}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <SocialHandles />
                            </div>
                        </div>
                    </aside>
                    <div>
                        <div className="mb-8 border-b dev-divider pb-5">
                            <p className="font-robotoMono text-xs uppercase tracking-[0.28em] text-muted">toolchain.lock</p>
                            <h2 className="mt-2 font-robotoMono text-3xl font-[400] text-foreground">Systems I reach for.</h2>
                        </div>
                        <div className="grid gap-4 desktop:grid-cols-2">
                        {Object.entries(techStack).map(([category, technologies]) => (
                            <div key={category} className="system-panel p-5">
                                <p className="font-robotoMono text-xs uppercase tracking-[0.24em] text-muted">
                                    {category === 'DevOps' ? category : headerCase(category).replace('-', ' ')}
                                </p>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    {technologies.map((tech) => (
                                        <div
                                            key={tech.fileName}
                                            className="flex items-center gap-3 border dev-divider bg-surface/70 p-3">
                                            <Image
                                                src={`/tech-stack/${paramCase(category)}/${tech.fileName}.png`}
                                                width={60}
                                                height={60}
                                                className="w-12 h-12"
                                                alt={tech.title}
                                            />
                                            <div>
                                                <p className="body2 text-foreground">{tech.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>
            </Wrapper>
        </div>
    );
};

export default Home;

interface Technology {
    fileName: string;
    title: string;
    level: number;
}

interface TechnologiesData {
    [key: string]: Technology[];
}

export const getStaticProps = async (): Promise<{
    props: { introductionContent: AboutMeIntroduction; techStack: TechnologiesData };
}> => {
    checkImageResolutions('public');
    const introductionContent = await getMDData<AboutMeIntroduction>(
        `${MdxPaths.AboutMeIntroduction}/introduction.mdx`
    );
    const technologies: TechnologiesData = {};
    Object.entries(TechnologiesPath).forEach(([key, value]) => {
        const yamlData = fs.readFileSync(value, 'utf8');
        technologies[key] = YAML.parse(yamlData).technologies as Technology[];
    });
    return {
        props: {
            introductionContent: {
                code: introductionContent.code,
                layout: introductionContent.frontmatter.layout ?? 'DefaultLayout'
            },
            techStack: technologies
        }
    };
};
