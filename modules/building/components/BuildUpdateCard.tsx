import Link from 'next/link';
import { BuildProject, BuildUpdateDocument } from '../types';

interface BuildUpdateCardProps {
    update: BuildUpdateDocument;
    project?: BuildProject;
    featured?: boolean;
}

export const formatBuildDate = (value: string): string =>
    new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));

export const statusLabel = (value: string): string =>
    value
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

export const BuildUpdateCard = ({
    update,
    project,
    featured = false
}: BuildUpdateCardProps): JSX.Element => {
    const { frontmatter } = update;
    return (
        <Link
            href={`/building/${update.slug}`}
            className={`build-entry group ${featured ? 'build-entry--featured' : ''}`}>
            <article>
                <div className="build-entry__top">
                    <p className="build-entry__date">{formatBuildDate(frontmatter.publishedAt)}</p>
                    <span className={`status-pill status-pill--${frontmatter.status}`}>
                        {statusLabel(frontmatter.status)}
                    </span>
                </div>
                <p className="build-entry__project">{project?.name ?? frontmatter.project}</p>
                <h3>{frontmatter.title}</h3>
                <p className="build-entry__summary">{frontmatter.summary}</p>
                <div className="build-entry__meta">
                    <div>
                        <span>
                            <small>Time spent</small>
                            <strong>{frontmatter.timeSpent}</strong>
                        </span>
                        <span>
                            <small>Progress</small>
                            <strong>{frontmatter.progress}%</strong>
                        </span>
                    </div>
                    <b aria-hidden="true">Read update ↗</b>
                </div>
            </article>
        </Link>
    );
};
