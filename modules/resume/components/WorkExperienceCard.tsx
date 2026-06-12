import { WorkExperience } from '../../../pages/resume';
import { renderMDSection } from '../../common/utils/mdxBundlerUtils';

export const WorkExperienceCard = (
    content: { code: string; frontmatter: WorkExperience }[]
): JSX.Element => {
    return (
        <div className="flex flex-col gap-5">
            {content.map((experience, index) => (
                <div
                    key={`${experience.frontmatter.companyName}-${experience.frontmatter.role}`}
                    className="repo-card rounded-2xl p-5 text-foreground">
                    <div className="flex mobile:flex-col gap-8">
                        <div className="flex w-[32%] mobile:w-full flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl border dev-divider bg-surface font-robotoMono text-xs text-accent">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="font-robotoMono text-xs text-muted">
                                    work.commit
                                </div>
                            </div>
                            <div className="whitespace-nowrap body2 text-foreground/80">
                                {experience.frontmatter.startDate} - {}
                                {experience.frontmatter.endDate
                                    ? experience.frontmatter.endDate
                                    : 'Present'}
                            </div>
                            <div>
                                <div className="sub-headline2 text-foreground">
                                    {experience.frontmatter.role}
                                </div>
                                <div className="body2 text-muted">
                                    {experience.frontmatter.companyName}
                                </div>
                            </div>
                        </div>
                        <div className="w-[68%] mobile:w-full tablet:w-full">
                            {renderMDSection(experience.code, 'ResumeLayout')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
