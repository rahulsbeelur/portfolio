import fs from 'fs';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { PageHeader } from '../../modules/common/components/PageHeader';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { WorkExperienceCard } from '../../modules/resume/components/WorkExperienceCard';
import { EducationCard } from '../../modules/resume/components/EducationCard';

const Resume = ({
    resume,
    pageContent
}: {
    resume: {
        workExperience: { code: string; frontmatter: WorkExperience }[];
        education: { code: string; frontmatter: Education }[];
        speakingLanguages: string[];
    };
    pageContent: ResumePageContent;
}): JSX.Element => {
    const metrics = pageContent.metrics ?? [];
    const interests = pageContent.researchInterests ?? [];

    return (
        <Wrapper classes="normal-case !max-w-[1120px]">
            <SEO
                title={pageContent.seoTitle}
                description={pageContent.seoDescription}
                path="/resume"
            />
            <main className="pb-20 pt-32 mobile:pt-24">
                <PageHeader
                    fileName={pageContent.eyebrow}
                    title={pageContent.title}
                    description={pageContent.description}
                    action={
                        <a
                            href="mailto:srahulbeelur@gmail.com?subject=Resume%20request"
                            className="text-link">
                            Reach out for my resume →
                        </a>
                    }
                />

                <section className="resume-overview mt-16">
                    <p>{pageContent.profileSummary}</p>
                    <div className="resume-metrics">
                        {metrics.map((metric) => (
                            <div key={metric.label}>
                                <span>{metric.label}</span>
                                <strong>{metric.value}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="resume-layout mt-20">
                    <section>
                        <div className="plain-section__heading">
                            <div>
                                <p className="page-file">experience.md</p>
                                <h2>{pageContent.workTitle}</h2>
                            </div>
                        </div>
                        {WorkExperienceCard(resume.workExperience)}
                    </section>

                    <aside className="resume-sidebar">
                        <section>
                            <p className="page-file">focus.md</p>
                            <h2>{pageContent.researchInterestsTitle}</h2>
                            <ul>
                                {interests.map((interest) => (
                                    <li key={interest}>{interest}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <p className="page-file">education.md</p>
                            <h2>{pageContent.educationTitle}</h2>
                            {EducationCard(resume.education)}
                        </section>

                        <section>
                            <p className="page-file">languages.md</p>
                            <h2>{pageContent.languagesTitle}</h2>
                            <p className="resume-languages">
                                {resume.speakingLanguages.join(' · ')}
                            </p>
                        </section>
                    </aside>
                </div>

                <section className="page-end-link mt-20">
                    <div>
                        <p className="page-file">contact.md</p>
                        <h2>Want to work together?</h2>
                    </div>
                    <a href="mailto:srahulbeelur@gmail.com" className="text-link">
                        Email me →
                    </a>
                </section>
            </main>
        </Wrapper>
    );
};

export default Resume;

export interface WorkExperience {
    companyName: string;
    role: string;
    startDate: string;
    endDate?: string;
}

export interface Education {
    name: string;
    degreeType: string;
    location: string;
    score: string;
    startDate: string;
    endDate?: string;
    course?: string;
}

export interface SpeakingLanguages {
    languages: string[];
}

interface ResumePageContent {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    description: string;
    workTitle: string;
    educationTitle: string;
    languagesTitle: string;
    profileTitle: string;
    profileSummary: string;
    researchInterestsTitle: string;
    researchInterests: string[];
    metrics: {
        label: string;
        value: string;
    }[];
}

export const getStaticProps = async (): Promise<{
    props: {
        resume: {
            workExperience: { code: string; frontmatter: WorkExperience }[];
            education: { code: string; frontmatter: Education }[];
            speakingLanguages: string[];
        };
        pageContent: ResumePageContent;
    };
}> => {
    const experienceFiles = fs.readdirSync(MdxPaths.WorkExperience).reverse();
    const workExperience: { code: string; frontmatter: WorkExperience }[] = await Promise.all(
        experienceFiles.map(async (file) => {
            const { code, frontmatter }: { code: string; frontmatter: WorkExperience } =
                await getMDData(MdxPaths.WorkExperience + '/' + file);
            return { code, frontmatter };
        })
    );
    const educationFiles = fs.readdirSync(MdxPaths.Education).reverse();
    const education: { code: string; frontmatter: Education }[] = await Promise.all(
        educationFiles.map(async (file) => {
            const { code, frontmatter }: { code: string; frontmatter: Education } = await getMDData(
                MdxPaths.Education + '/' + file
            );
            return { code, frontmatter };
        })
    );
    const speakingLanguages: { frontmatter: SpeakingLanguages } = await getMDData(
        MdxPaths.SpeakingLanguages
    );
    const { frontmatter: pageContent } = await getMDData<ResumePageContent>(
        `${MdxPaths.Pages}/resume.mdx`
    );
    return {
        props: {
            resume: {
                workExperience,
                education,
                speakingLanguages: speakingLanguages.frontmatter.languages
            },
            pageContent
        }
    };
};
