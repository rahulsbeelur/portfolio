import fs from 'fs';
import YAML from 'yaml';
import Image from 'next/image';
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
    const highlights = introductionContent.highlights ?? [];
    const profileSnippet = introductionContent.profileSnippet ?? [];

    return (
        <div className="relative overflow-hidden desktop:pt-[120px] mobile:pt-[128px]">
            <SEO
                title="Rahul S Beelur | Backend Systems & AI Engineer"
                description="Backend systems engineer specializing in AI solutions. Build scalable systems with Go, Python, and modern cloud infrastructure. Experienced in APIs, machine learning pipelines, and distributed systems."
            />
            <Wrapper classes="relative py-16">
                <section className="grid gap-10 desktop:grid-cols-[1.05fr_0.95fr] items-start">
                    <div className="space-y-8">
                        <div className="inline-flex flex-wrap items-center gap-3 rounded-full border dev-divider bg-surface px-4 py-2 text-sm text-muted">
                            <span className="font-robotoMono text-[12px]">{introductionContent.eyebrow}</span>
                            <span>{introductionContent.summary}</span>
                        </div>
                        <h1 className="max-w-3xl font-poppins text-[64px] font-[600] leading-[76px] text-foreground tablet:text-[52px] tablet:leading-[62px] mobile:text-[34px] mobile:leading-[43px]">
                            {introductionContent.headline}
                        </h1>
                        <div className="space-y-6 text-foreground/80 max-w-2xl">
                            {renderMDSection(introductionContent.code, introductionContent.layout)}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {highlights.map((highlight) => (
                                <div key={highlight.label} className="metric-tile p-5">
                                    <p className="font-robotoMono text-[12px] text-muted">
                                        {highlight.label}
                                    </p>
                                    <p className="body2 mt-3 text-foreground">{highlight.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside className="quiet-card p-6 mobile:order-first">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b dev-divider pb-4">
                                <p className="font-robotoMono text-xs text-muted">
                                    {introductionContent.profileFileName}
                                </p>
                                <p className="font-robotoMono text-xs text-muted">
                                    {introductionContent.profileStatus}
                                </p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="relative h-28 w-28 overflow-hidden rounded-2xl border dev-divider bg-surface">
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
                                    <p className="h5 text-foreground">{personDetails.name}</p>
                                    <p className="font-robotoMono text-sm text-muted">
                                        {personDetails.designation}
                                    </p>
                                </div>
                            </div>
                            <div className="editor-line rounded-lg p-4 font-robotoMono text-sm leading-7 text-foreground/90">
                                {profileSnippet.map((line) => (
                                    <p key={line} className={line.startsWith('  ') ? 'pl-4' : ''}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <SocialHandles />
                            </div>
                        </div>
                    </aside>
                </section>
            </Wrapper>
            <div className="border-t dev-divider">
                <Wrapper classes="py-12">
                    <div className="pb-8">
                        <p className="font-robotoMono text-sm text-muted">
                            {introductionContent.toolsEyebrow}
                        </p>
                        <h2 className="mt-2 text-[36px] font-poppins font-[600] leading-[46px] text-foreground mobile:text-[30px] mobile:leading-[38px]">
                            {introductionContent.toolsTitle}
                        </h2>
                    </div>
                    <div className="grid gap-3">
                        {Object.entries(techStack).map(([category, technologies]) => (
                            <div
                                key={category}
                                className="quiet-card grid gap-4 p-4 desktop:grid-cols-[220px_1fr] desktop:items-center">
                                <p className="font-robotoMono text-sm text-muted">
                                    {category === 'DevOps' ? category : headerCase(category).replace('-', ' ')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech) => (
                                        <span key={tech.fileName} className="tool-chip">
                                            <span className="relative h-4 w-4 shrink-0 overflow-hidden">
                                                <Image
                                                    src={`/tech-stack/${paramCase(category)}/${tech.fileName}.png`}
                                                    alt=""
                                                    width={24}
                                                    height={24}
                                                    className="h-full w-full object-contain"
                                                />
                                            </span>
                                            {tech.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </div>
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
                layout: introductionContent.frontmatter.layout ?? 'DefaultLayout',
                eyebrow: introductionContent.frontmatter.eyebrow,
                headline: introductionContent.frontmatter.headline,
                summary: introductionContent.frontmatter.summary,
                profileFileName: introductionContent.frontmatter.profileFileName,
                profileStatus: introductionContent.frontmatter.profileStatus,
                profileSnippet: introductionContent.frontmatter.profileSnippet,
                highlights: introductionContent.frontmatter.highlights,
                toolsEyebrow: introductionContent.frontmatter.toolsEyebrow,
                toolsTitle: introductionContent.frontmatter.toolsTitle
            },
            techStack: technologies
        }
    };
};
