import type { CSSProperties } from 'react';
import Link from 'next/link';
import { BuildProject } from '../types';

interface ActiveBuildPanelProps {
    projects: BuildProject[];
}

export const ActiveBuildPanel = ({ projects }: ActiveBuildPanelProps): JSX.Element => {
    const activeProjects = projects.filter((project) => project.status === 'active');
    const columns = Math.min(Math.max(activeProjects.length, 1), 2);

    return (
        <div className="active-build-panel">
            <header>
                <div>
                    <p className="page-file">active-builds.md</p>
                    <h2>Building now.</h2>
                </div>
                <span>
                    {activeProjects.length} in-progress{' '}
                    {activeProjects.length === 1 ? 'project' : 'projects'}
                </span>
            </header>
            {activeProjects.length > 0 ? (
                <div
                    className="active-build-panel__grid"
                    style={{ '--active-build-columns': columns } as CSSProperties}>
                    {activeProjects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/building/projects/${project.slug}`}
                            className="active-build-panel__card">
                            <article>
                                <div className="active-build-panel__meta">
                                    <span>In progress</span>
                                    <div>
                                        <strong>{project.progress}%</strong>
                                        <small>complete</small>
                                    </div>
                                </div>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <div className="progress-track" aria-hidden="true">
                                    <span
                                        style={
                                            {
                                                '--build-progress': `${project.progress}%`
                                            } as CSSProperties
                                        }
                                    />
                                </div>
                                {project.focus[0] && (
                                    <p className="active-build-panel__focus">
                                        <b>Now:</b> {project.focus[0]}
                                    </p>
                                )}
                                <div className="active-build-panel__stack">
                                    {project.stack.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                                <b className="active-build-panel__link">View project →</b>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="active-build-panel__empty">No active projects right now.</p>
            )}
        </div>
    );
};
