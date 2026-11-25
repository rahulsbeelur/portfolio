import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { PageHeader } from '../../modules/common/components/PageHeader';
import { loadBuildProjects, loadBuildUpdates } from '../../modules/building/loadBuilding';
import { buildProjectStatusLabel, getProject } from '../../modules/building/utils';
import { BuildProject, BuildUpdateDocument } from '../../modules/building/types';
import { BuildUpdateCard } from '../../modules/building/components/BuildUpdateCard';
import { ActiveBuildPanel } from '../../modules/building/components/ActiveBuildPanel';

interface BuildingPageProps {
    projects: BuildProject[];
    updates: BuildUpdateDocument[];
    updateCount: number;
    projectUpdateCounts: Record<string, number>;
}

const BuildingPage = ({
    projects,
    updates,
    updateCount,
    projectUpdateCounts
}: BuildingPageProps): JSX.Element => (
    <Wrapper classes="normal-case !max-w-[1120px]">
        <SEO
            title="Building in public | Rahul S Beelur"
            description="Projects Rahul S Beelur is building, with dated updates, progress, completed work, and next steps."
            path="/building"
        />
        <main className="pb-20 pt-32 mobile:pt-24">
            <PageHeader
                fileName="build-log.md"
                title="What I’m building."
                description="Dated updates from active projects: what changed, time spent, and what comes next."
            />

            <section className="mt-16">
                <ActiveBuildPanel projects={projects} />
            </section>

            {projects.some((project) => project.status !== 'active') && (
                <section className="plain-section mt-20">
                    <div className="plain-section__heading">
                        <div>
                            <p className="page-file">project-archive.md</p>
                            <h2>Completed and stopped.</h2>
                        </div>
                        <span>
                            {projects.filter((project) => project.status === 'complete').length}{' '}
                            completed ·{' '}
                            {projects.filter((project) => project.status === 'paused').length}{' '}
                            stopped
                        </span>
                    </div>
                    <div className="build-project-list">
                        {projects
                            .filter((project) => project.status !== 'active')
                            .map((project) => {
                                const projectUpdateCount = projectUpdateCounts[project.slug] ?? 0;
                                return (
                                    <Link
                                        key={project.slug}
                                        href={`/building/projects/${project.slug}`}
                                        className={`build-project-card build-project-card--${project.status}`}>
                                        <div className="build-project-card__meta">
                                            <span>{buildProjectStatusLabel(project.status)}</span>
                                            <small>{project.progress}% complete</small>
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
                                        <b>
                                            {projectUpdateCount}{' '}
                                            {projectUpdateCount === 1 ? 'update' : 'updates'}
                                            <span aria-hidden="true"> · View project →</span>
                                        </b>
                                    </Link>
                                );
                            })}
                    </div>
                </section>
            )}

            <section className="plain-section mt-20">
                <div className="plain-section__heading">
                    <div>
                        <p className="page-file">updates.md</p>
                        <h2>Newest updates.</h2>
                    </div>
                    <span>
                        Showing {updates.length} of {updateCount} · newest first
                    </span>
                </div>
                {updates.length > 0 ? (
                    <div className="build-archive">
                        {updates.slice(0, 12).map((update, index) => (
                            <BuildUpdateCard
                                key={update.slug}
                                update={update}
                                project={getProject(projects, update.frontmatter.project)}
                                featured={index === 0}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">The first build note is being prepared.</p>
                )}
            </section>

            <section className="page-end-link mt-20">
                <div>
                    <p className="page-file">blog.md</p>
                    <h2>Longer ideas live on the blog.</h2>
                </div>
                <Link href="/blog" className="text-link">
                    Read the blog →
                </Link>
            </section>
        </main>
    </Wrapper>
);

export default BuildingPage;

export const getStaticProps = async (): Promise<{ props: BuildingPageProps }> => {
    const projects = loadBuildProjects();
    const allUpdates = await loadBuildUpdates();
    const projectUpdateCounts = allUpdates.reduce<Record<string, number>>((counts, update) => {
        const project = update.frontmatter.project;
        counts[project] = (counts[project] ?? 0) + 1;
        return counts;
    }, {});
    return {
        props: {
            projects,
            updates: allUpdates.slice(0, 12),
            updateCount: allUpdates.length,
            projectUpdateCounts
        }
    };
};
