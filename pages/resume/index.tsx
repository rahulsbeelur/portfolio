import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { Download } from '../../icons/Download';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';

const Resume = ({ workExperience }: { workExperience: WorkExperience[] }): JSX.Element => {
    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light">
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
                        <div className="desktop:sub-headline1 sub-headline2">Work Experience</div>
                        {workExperience.map((experience) => (
                            <div
                                key={workExperience.indexOf(experience)}
                                className="min-h-[250px] desktop:sub-headline3 sub-headline4 bg-white dark:bg-neutral-black-darker mt-5 p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                                <div className="flex justify-between sub-headline3">
                                    <div className="flex-col mt-10">
                                        <div>
                                            {experience.startDate} to
                                            {experience.endDate ? experience.endDate : 'Present'}
                                        </div>
                                        <div>{experience.companyName}</div>
                                        <div>{experience.role}</div>
                                    </div>
                                    <div>2</div>
                                </div>
                            </div>
                        ))}
                        <div className="desktop:sub-headline1 sub-headline2 mt-20">Education</div>
                        <div className="desktop:sub-headline3 sub-headline4 bg-white dark:bg-neutral-black-darker mt-5 p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                            Card
                        </div>
                        <div className="desktop:sub-headline1 sub-headline2 mt-20">Languages</div>
                        <div className="desktop:sub-headline3 sub-headline4 bg-white dark:bg-neutral-black-darker mt-5 p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                            Card
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Resume;

interface WorkExperience {
    companyName: string;
    role: string;
    startDate: string;
    endDate?: string;
}

export const getStaticProps = async (): Promise<{
    props: { workExperience: WorkExperience[] };
}> => {
    const files = fs.readdirSync(MdxPaths.WorkExperience).reverse();
    const workExperience: WorkExperience[] = await Promise.all(
        files.map(async (file) => {
            const { frontmatter }: { frontmatter: WorkExperience } = await getMDData(
                MdxPaths.WorkExperience + '/' + file
            );
            return frontmatter;
        })
    );
    return {
        props: {
            workExperience
        }
    };
};
