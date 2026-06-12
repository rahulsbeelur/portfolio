import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { WorkExperienceCard } from '../../modules/resume/components/WorkExperienceCard';
import { EducationCard } from '../../modules/resume/components/EducationCard';

const Resume = ({
    resume
}: {
    resume: {
        workExperience: { code: string; frontmatter: WorkExperience }[];
        education: { code: string; frontmatter: Education }[];
        speakingLanguages: string[];
    };
}): JSX.Element => {
    return (
        <Wrapper classes="engineer-grid normal-case">
            <SEO
                title="Resume | Rahul S Beelur"
                description="Resume and experience timeline for Rahul S Beelur, covering software development roles, education, languages, and product engineering work."
                path="/resume"
            />
            <div className="mx-auto max-w-[1180px] desktop:mt-[138px] tablet:mt-[128px] mt-24 py-8">
                <header className="mb-10 max-w-3xl text-foreground">
                    <p className="font-robotoMono text-sm text-accent">career.timeline</p>
                    <h1 className="desktop:h2 h4 mt-2">Experience from real product work.</h1>
                    <p className="body1 mt-4 text-foreground/75">
                        Roles, projects, and education framed around the kind of software problems
                        I have worked through.
                    </p>
                </header>
                <div className="flex justify-center mobile:flex-col text-foreground">
                    <div className="w-full flex gap-8 mobile:flex-col">
                        <div className="w-[65%] mobile:w-full">
                            <div className="mb-5 flex items-center justify-between border-b dev-divider pb-3">
                                <h2 className="h4 mobile:h5">Work Experience</h2>
                                <span className="font-robotoMono text-xs text-muted">commits + releases</span>
                            </div>
                            {WorkExperienceCard(resume.workExperience)}
                        </div>
                        <div className="w-[35%] tablet:w-[40%] mobile:w-full">
                            <div>
                                <div className="mb-5 border-b dev-divider pb-3">
                                    <h2 className="h4 mobile:h5">Education</h2>
                                </div>
                                {EducationCard(resume.education)}
                            </div>
                            <div className="mt-10">
                                <div className="mb-5 border-b dev-divider pb-3">
                                    <h2 className="h4 mobile:h5">Languages</h2>
                                </div>
                                <div className="rounded-2xl border dev-divider bg-surface p-4 text-foreground">
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

export const getStaticProps = async (): Promise<{
    props: {
        resume: {
            workExperience: { code: string; frontmatter: WorkExperience }[];
            education: { code: string; frontmatter: Education }[];
            speakingLanguages: string[];
        };
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
    return {
        props: {
            resume: {
                workExperience,
                education,
                speakingLanguages: speakingLanguages.frontmatter.languages
            }
        }
    };
};
