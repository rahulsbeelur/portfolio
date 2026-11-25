import { Education } from '../../../pages/resume';

export const EducationCard = (content: { code: string; frontmatter: Education }[]): JSX.Element => (
    <div className="education-list">
        {content.map((education) => (
            <article
                key={`${education.frontmatter.name}-${education.frontmatter.startDate}`}
                className="education-list__item">
                <p>
                    {education.frontmatter.startDate} — {education.frontmatter.endDate ?? 'Present'}
                </p>
                <h3>{education.frontmatter.name}</h3>
                <span>{education.frontmatter.course ?? education.frontmatter.degreeType}</span>
                <small>
                    {education.frontmatter.location} · {education.frontmatter.score}
                </small>
            </article>
        ))}
    </div>
);
