import { WorkExperience } from '../../../pages/resume';
import { renderMDSection } from '../../common/utils/mdxBundlerUtils';

export const WorkExperienceCard = (
    content: { code: string; frontmatter: WorkExperience }[]
): JSX.Element => {
    return (
        <div className="relative ml-3 grid gap-5 border-l dev-divider pl-6">
            {content.map((experience) => (
                <article key={content.indexOf(experience)} className="quiet-card relative p-5">
                    <span className="timeline-dot" />
                    <div className="grid gap-6 desktop:grid-cols-[210px_1fr]">
                        <div>
                            <div className="inline-flex rounded-md border dev-divider bg-surface px-2.5 py-1 font-robotoMono text-xs text-muted">
                                {experience.frontmatter.startDate} - {}
                                {experience.frontmatter.endDate
                                    ? experience.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div className="mt-3">
                                <div className="text-[17px] font-[700] leading-6 text-foreground">
                                    {experience.frontmatter.role}
                                </div>
                                <div className="body2 mt-1 font-[700] text-muted">
                                    {experience.frontmatter.companyName}
                                </div>
                            </div>
                        </div>
                        <div>
                            {renderMDSection(experience.code, 'ResumeLayout')}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};
