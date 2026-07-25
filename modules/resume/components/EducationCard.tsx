import { Education } from '../../../pages/resume';

export const EducationCard = (content: { code: string; frontmatter: Education }[]): JSX.Element => {
    return (
        <div className="grid gap-3">
            {content.map((education) => (
                <article key={content.indexOf(education)} className="quiet-card p-4">
                    <div>
                        <div>
                            <div className="font-robotoMono text-xs text-muted">
                                {education.frontmatter.startDate} - {}
                                {education.frontmatter.endDate
                                    ? education.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div className="mt-3">
                                <div className="text-sm font-[700] leading-6 text-foreground">
                                    {education.frontmatter.name}
                                </div>
                                <div className="body2 mt-1 text-muted">
                                    {education.frontmatter.degreeType}
                                </div>
                                <div className="body3 mt-1 text-muted">
                                    {education.frontmatter.location}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 border-t dev-divider pt-4">
                            <div className="body3 text-muted">
                                {education.frontmatter.course}
                            </div>
                            <div className="mt-1 font-robotoMono text-xs text-foreground">{education.frontmatter.score}</div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};
