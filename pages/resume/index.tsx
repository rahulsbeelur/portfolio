import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
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
    const researchInterests = pageContent.researchInterests ?? [];

    return (
        <Wrapper classes="normal-case">
            <SEO
                title={pageContent.seoTitle}
                description={pageContent.seoDescription}
                path="/resume"
            />
            <div className="mx-auto max-w-[1120px] desktop:mt-[138px] tablet:mt-[128px] mt-24 py-8">
                <header className="mb-10 grid gap-8 text-foreground desktop:grid-cols-[1fr_360px] desktop:items-end">
                    <div className="max-w-3xl">
                    <p className="font-robotoMono text-sm text-muted">{pageContent.eyebrow}</p>
                    <h1 className="mt-3 text-[44px] font-poppins font-[600] leading-[54px] mobile:text-[34px] mobile:leading-[42px]">
                        {pageContent.title}
                    </h1>
                    <p className="body1 mt-4 text-foreground/75">{pageContent.description}</p>
                    </div>
                    <div className="quiet-card grid grid-cols-3 divide-x dev-divider overflow-hidden mobile:grid-cols-1 mobile:divide-x-0 mobile:divide-y">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="p-4">
                                <p className="font-robotoMono text-[11px] text-muted">{metric.label}</p>
                                <p className="mt-2 text-sm font-[700] text-foreground">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </header>
                <div className="flex justify-center mobile:flex-col text-foreground">
                    <div className="grid w-full gap-8 desktop:grid-cols-[minmax(0,1fr)_340px]">
                        <div>
                            <div className="mb-5 flex items-center justify-between border-b dev-divider pb-3">
                                <h2 className="sub-headline1 text-foreground">{pageContent.workTitle}</h2>
                                <span className="font-robotoMono text-xs text-muted">{pageContent.workMeta}</span>
                            </div>
                            {WorkExperienceCard(resume.workExperience)}
                        </div>
                        <div>
                            <div className="quiet-card p-5">
                                <p className="font-robotoMono text-xs text-muted">{pageContent.profileTitle}</p>
                                <p className="body2 mt-3 text-foreground/80">{pageContent.profileSummary}</p>
                                <div className="mt-5 border-t dev-divider pt-5">
                                    <p className="font-robotoMono text-xs text-muted">
                                        {pageContent.researchInterestsTitle}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {researchInterests.map((interest) => (
                                            <span key={interest} className="code-chip">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-5 mt-8 border-b dev-divider pb-3">
                                    <h2 className="sub-headline1 text-foreground">{pageContent.educationTitle}</h2>
                                </div>
                                {EducationCard(resume.education)}
                            </div>
                            <div className="mt-10">
                                <div className="mb-5 border-b dev-divider pb-3">
                                    <h2 className="sub-headline1 text-foreground">{pageContent.languagesTitle}</h2>
                                </div>
                                <div className="quiet-card p-4 text-foreground">
                                    <div className="text-left flex flex-wrap gap-2">
                                        {resume.speakingLanguages.map((language) => (
                                            <div key={language} className="code-chip">
                                                {language}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    workMeta: string;
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
