import { Education } from '../../../pages/resume';

export const EducationCard = (content: { code: string; frontmatter: Education }[]): JSX.Element => {
    return (
        <div className="flex flex-col gap-4">
            {content.map((education) => (
                <div
                    key={`${education.frontmatter.name}-${education.frontmatter.course ?? ''}`}
                    className="rounded-2xl border dev-divider bg-surface p-4 text-foreground">
                    <div className="flex mobile:flex-col desktop:justify-between tablet:justify-between gap-4">
                        <div className="flex-col w-[62%] mobile:w-full">
                            <div className="font-robotoMono text-xs text-accent">
                                {education.frontmatter.startDate} - {}
                                {education.frontmatter.endDate
                                    ? education.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div>
                                <div className="sub-headline3 mt-2">
                                    {education.frontmatter.name}
                                </div>
                                <div className="body2 text-muted">
                                    {education.frontmatter.degreeType}
                                </div>
                                <div className="body3 text-muted">
                                    {education.frontmatter.location}
                                </div>
                            </div>
                        </div>
                        <div className="w-[38%] my-auto text-right mobile:w-[100%] mobile:text-left">
                            <div className="body2 text-foreground/80">
                                {education.frontmatter.course}
                            </div>
                            <div className="h5 text-accent">{education.frontmatter.score}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
