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
    return (
        <div className="engineer-grid relative overflow-hidden desktop:pt-[120px] mobile:pt-[128px]">
            <SEO
                title="Rahul S Beelur | Backend Systems & AI Engineer"
                description="Backend systems engineer specializing in AI solutions. Build scalable systems with Go, Python, and modern cloud infrastructure. Experienced in APIs, machine learning pipelines, and distributed systems."
            />
            <Wrapper classes="relative py-16">
                <section className="grid desktop:grid-cols-[1.18fr_0.92fr] gap-10 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex flex-wrap items-center gap-3 rounded-full border dev-divider bg-surface/70 px-4 py-2 text-sm text-muted backdrop-blur-sm">
                            <span className="font-robotoMono text-[12px] text-accent">~/rahul/portfolio</span>
                            <span className="text-foreground/80">Projects, experience, shipped systems</span>
                        </div>
                        <h1 className="desktop:h1 tablet:h2 text-[46px] font-poppins font-[600] leading-[56px] text-foreground max-w-3xl">
                            Backend Engineer → AI Engineer in progress.
                        </h1>
                        <div className="space-y-6 text-foreground/80 max-w-2xl">
                            {renderMDSection(introductionContent.code, introductionContent.layout)}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="metric-tile p-5">
                                <p className="font-robotoMono text-[12px] text-accent">stack.go</p>
                                <p className="body2 mt-3 text-foreground">
                                    Go · Kafka · PostgreSQL · Docker · Kubernetes
                                </p>
                            </div>
                            <div className="metric-tile p-5">
                                <p className="font-robotoMono text-[12px] text-accent">what_i_work_on</p>
                                <p className="body2 mt-3 text-foreground">
                                    Backend platforms, telemetry pipelines, device enrolments.
                                </p>
                            </div>
                            <div className="metric-tile p-5">
                                <p className="font-robotoMono text-[12px] text-accent">what_i_debug</p>
                                <p className="body2 mt-3 text-foreground">
                                    Latency, message flows, distributed failures, production incidents.
                                </p>
                            </div>
                            <div className="metric-tile p-5">
                                <p className="font-robotoMono text-[12px] text-accent">what_i_explore</p>
                                <p className="body2 mt-3 text-foreground">
                                    AI agents, RAG pipelines, model serving, inference workloads.
                                </p>
                            </div>
                        </div>
                    </div>
                    <aside className="terminal-panel p-5">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b dev-divider pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                                    <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                                    <span className="h-3 w-3 rounded-full bg-[#2DD4BF]" />
                                </div>
                                <p className="font-robotoMono text-xs text-muted">developer.profile.ts</p>
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
                            <div className="editor-line rounded-2xl p-4 font-robotoMono text-sm leading-7 text-foreground/90">
    <p><span className="text-accent">var</span> Rahul = struct {'{'}</p>
    <p className="pl-4">{"Builds     []string"}</p>
    <p className="pl-4">{"Exploring  []string"}</p>
    <p className="pl-4">{"CaresAbout []string"}</p>
    <p>{'}{'}</p>

    <p className="pl-4">{"Builds: []string{"}</p>
    <p className="pl-8">{'"distributed systems",'}</p>
    <p className="pl-8">{'"backend platforms",'}</p>
    <p className="pl-4">{'} ,'}</p>

    <p className="pl-4">{"Exploring: []string{"}</p>
    <p className="pl-8">{'"LLMs",'}</p>
    <p className="pl-8">{'"RAG",'}</p>
    <p className="pl-8">{'"AI systems",'}</p>
    <p className="pl-4">{'} ,'}</p>

    <p className="pl-4">{"CaresAbout: []string{"}</p>
    <p className="pl-8">{'"performance",'}</p>
    <p className="pl-8">{'"reliability",'}</p>
    <p className="pl-8">{'"simplicity",'}</p>
    <p className="pl-4">{'} ,'}</p>

    <p>{'}'}</p>
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
                    <div className="mx-auto max-w-3xl text-center pb-8">
                        <p className="font-robotoMono text-sm text-accent">toolchain.lock</p>
                        <h2 className="desktop:h2 h4 text-foreground">Tools I reach for when building.</h2>
                    </div>
                    <div className="grid gap-6 desktop:grid-cols-2">
                        {Object.entries(techStack).map(([category, technologies]) => (
                            <div key={category} className="glass-card p-6">
                                <p className="font-robotoMono text-sm text-muted">
                                    {category === 'DevOps' ? category : headerCase(category).replace('-', ' ')}
                                </p>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {technologies.map((tech) => (
                                        <div
                                            key={tech.fileName}
                                            className="flex items-center gap-3 rounded-2xl bg-surface/70 p-4 border dev-divider">
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
                layout: introductionContent.frontmatter.layout ?? 'DefaultLayout'
            },
            techStack: technologies
        }
    };
};
