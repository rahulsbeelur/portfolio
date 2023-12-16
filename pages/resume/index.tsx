import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { Download } from '../../icons/Download';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { WorkExperienceCard } from '../../modules/common/components/WorkExperienceCard';
import { EducationCard } from '../../modules/common/components/EducationCard';

const Resume = ({
    resume
}: {
    resume: {
        workExperience: { code: string; frontmatter: WorkExperience }[];
        education: { code: string; frontmatter: Education }[];
    };
}): JSX.Element => {
    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px] mt-24">
                <div className="flex justify-center mobile:justify-center">
                    <button
                        className="h5 mobile:sub-headline3 tablet:sub-headline2 bg-white dark:bg-neutral-black-darker hover:bg-primary-background-color-darker hover:dark:bg-neutral-black-default p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] text-neutral-black-darker dark:text-white"
                        aria-label="Download Resume"
                        onClick={(): void => document.getElementById('resumeToDownload')?.click()}>
                        Download Resume
                        <Download
                            height={30}
                            width={30}
                            className="mobile:w-5 mobile:h-5 tablet:w-6 tablet:h-6"
                        />
                        <a
                            download="rahul-s-beelur-resume.pdf"
                            href="/assets/rahul-s-beelur-resume.pdf"
                            id="resumeToDownload"
                        />
                    </button>
                </div>
                <div className="flex justify-center mt-10 text-neutral-black-darker">
                    <div className="w-[60%] tablet:w-[80%] mobile:w-full">
                        <div className="h4 mobile:h5">Work Experience</div>
                        {WorkExperienceCard(resume.workExperience)}
                        <div className="h4 mobile:h5 mt-[120px] mobile:mt-10">Education</div>
                        {EducationCard(resume.education)}
                        {/* <div className="h4 mobile:h5 mt-20">Languages</div>
                        <div className="desktop:sub-headline3 sub-headline4 bg-white dark:bg-neutral-black-darker mt-5 p-3 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                            Card
                        </div> */}
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

export const getStaticProps = async (): Promise<{
    props: {
        resume: {
            workExperience: { code: string; frontmatter: WorkExperience }[];
            education: { code: string; frontmatter: Education }[];
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
    return {
        props: {
            resume: {
                workExperience,
                education
            }
        }
    };
};
