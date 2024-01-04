import { WorkExperience } from '../../../pages/resume';
import { renderMDSection } from '../../common/utils/mdxBundlerUtils';

export const WorkExperienceCard = (
    content: { code: string; frontmatter: WorkExperience }[]
): JSX.Element => {
    return (
        <>
            {content.map((experience) => (
                <div
                    key={content.indexOf(experience)}
                    className="desktop:h-[200px] mobile:h-[300px] tablet:h-[250px] mx-auto bg-white dark:bg-neutral-black-darker my-5 p-3 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-neutral-white-darker">
                    <div className="flex mobile:flex-col desktop:justify-between tablet:justify-between mobile:gap-0 gap-[100px] tablet:gap-[40px]">
                        <div className="flex-col w-[30%] mobile:w-full">
                            <div className="whitespace-nowrap body1 mobile:sub-headline3">
                                {experience.frontmatter.startDate} - {}
                                {experience.frontmatter.endDate
                                    ? experience.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div>
                                <div className="w-[100%] sub-headline4 desktop:sub-headline3">
                                    {experience.frontmatter.role}
                                </div>
                                <div className="flex body3 desktop:body1">
                                    {experience.frontmatter.companyName}
                                </div>
                            </div>
                        </div>
                        <div className="w-[70%] mobile:w-full tablet:w-full">
                            {renderMDSection(experience.code, 'ResumeLayout')}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
