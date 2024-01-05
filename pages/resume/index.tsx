import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
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
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px] mt-24">
                <div className="flex justify-center mobile:flex-col mt-10 text-neutral-black-darker dark:text-neutral-white-darker">
                    <div className="w-[80%] tablet:w-[100%] mobile:w-full flex gap-10 mobile:flex-col">
                        <div className="w-[60%] mobile:w-full">
                            <div className="h4 mobile:h5">Work Experience</div>
                            {WorkExperienceCard(resume.workExperience)}
                        </div>
                        <div className="w-[30%] tablet:w-[40%] mobile:w-full">
                            <div>
                                <div className="h4 mobile:h5">Education</div>
                                {EducationCard(resume.education)}
                            </div>
                            <div className="mt-10 desktop:mt-20">
                                <div className="h4 mobile:h5">Languages</div>
                                <div className="desktop:sub-headline3 sub-headline4 bg-white dark:bg-neutral-black-darker mt-5 p-3 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                                    <div className="text-left flex flex-col">
                                        {resume.speakingLanguages.map((language) => (
                                            <div key={resume.speakingLanguages.indexOf(language)}>
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
