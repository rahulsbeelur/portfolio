import { Education } from '../../../pages/resume';

export const EducationCard = (content: { code: string; frontmatter: Education }[]): JSX.Element => {
    return (
        <>
            {content.map((education) => (
                <div
                    key={content.indexOf(education)}
                    className="min-h-[100px] mx-auto bg-white dark:bg-neutral-black-darker my-5 p-3 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white">
                    <div className="flex mobile:flex-col desktop:justify-between tablet:justify-between mobile:gap-0 gap-[100px]">
                        <div className="flex-col w-[60%] mobile:w-full">
                            <div className="whitespace-nowrap body1 mobile:sub-headline3">
                                {education.frontmatter.startDate} - {}
                                {education.frontmatter.endDate
                                    ? education.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div>
                                <div className="w-[100%] sub-headline4 desktop:sub-headline3">
                                    {education.frontmatter.name}
                                </div>
                                <div className="flex body3 desktop:body1">
                                    {education.frontmatter.degreeType}
                                </div>
                                <div className="flex body3 desktop:body1">
                                    {education.frontmatter.location}
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] my-auto text-right mobile:w-[100%] mobile:mt-5">
                            <div className="sub-headline4 desktop:sub-headline3">
                                {education.frontmatter.course}
                            </div>
                            <div className="h5">{education.frontmatter.score}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
