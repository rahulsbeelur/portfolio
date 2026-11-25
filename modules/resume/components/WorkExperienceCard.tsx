import { WorkExperience } from '../../../pages/resume';
import { renderMDSection } from '../../common/utils/mdxBundlerUtils';

export const WorkExperienceCard = (
    content: { code: string; frontmatter: WorkExperience }[]
): JSX.Element => (
    <div className="experience-list">
        {content.map((experience, index) => (
            <article
                key={`${experience.frontmatter.companyName}-${experience.frontmatter.startDate}`}
                className="experience-list__item">
                <span className="experience-list__number">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                    <p className="experience-list__date">
                        {experience.frontmatter.startDate} —{' '}
                        {experience.frontmatter.endDate ?? 'Present'}
                    </p>
                    <h3>{experience.frontmatter.role}</h3>
                    <p className="experience-list__company">{experience.frontmatter.companyName}</p>
                    <div className="experience-list__copy">
                        {renderMDSection(experience.code, 'ResumeLayout')}
                    </div>
                </div>
            </article>
        ))}
    </div>
);
