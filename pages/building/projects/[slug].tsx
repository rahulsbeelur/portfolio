import type { CSSProperties } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Wrapper } from '../../../modules/common/components/Wrapper';
import { SEO } from '../../../modules/common/components/SEO';
import { loadBuildProjects, loadBuildUpdates } from '../../../modules/building/loadBuilding';
import { BuildProject, BuildUpdateDocument } from '../../../modules/building/types';
import { buildProjectStatusLabel, getProject } from '../../../modules/building/utils';
import {
    BuildUpdateCard,
    formatBuildDate
} from '../../../modules/building/components/BuildUpdateCard';

interface BuildProjectPageProps {
    project: BuildProject;
    updates: BuildUpdateDocument[];
}

const BuildProjectPage = ({ project, updates }: BuildProjectPageProps): JSX.Element => (
    <Wrapper classes="normal-case !max-w-[1040px]">
        <SEO
            title={`${project.name} | Build project`}
            description={project.description}
            path={`/building/projects/${project.slug}`}
        />
        <main className="build-project-detail pb-20 pt-32 mobile:pt-24">
            <nav aria-label="Breadcrumb" className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/building">Build log</Link>
                <span>/</span>
                <span>Project</span>
            </nav>

            <header>
                <div className="build-project-detail__meta">
                    <p className="page-file">project.md</p>
                    <span className={`project-status project-status--${project.status}`}>
                        {buildProjectStatusLabel(project.status)}
                    </span>
                </div>
                <h1>{project.name}</h1>
                <p className="build-project-detail__description">{project.description}</p>

                <div className="build-project-detail__progress">
                    <div>
                        <span>Overall progress</span>
                        <strong>{project.progress}%</strong>
                    </div>
                    <div className="progress-track" aria-hidden="true">
                        <span
                            style={
                                {
                                    '--build-progress': `${project.progress}%`
                                } as CSSProperties
                            }
                        />
                    </div>
                </div>
            </header>

            <section className="build-project-detail__overview">
                <article>
                    <p className="page-file">goal.md</p>
                    <h2>What this project is trying to do.</h2>
                    <p>{project.goal}</p>
                </article>
                <aside>
                    <div>
                        <span>Started</span>
                        <strong>{formatBuildDate(project.startedAt)}</strong>
                    </div>
                    <div>
                        <span>Updates</span>
                        <strong>{updates.length}</strong>
                    </div>
                    <div>
                        <span>Status</span>
                        <strong>{buildProjectStatusLabel(project.status)}</strong>
                    </div>
                </aside>
            </section>

            <section className="build-project-detail__work">
                <div>
                    <p className="page-file">focus.md</p>
                    <h2>{project.status === 'active' ? 'Current focus.' : 'Key work.'}</h2>
                    <ul>
                        {project.focus.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="page-file">stack.md</p>
                    <h2>Tools and technologies.</h2>
                    <div className="build-project-detail__stack">
                        {project.stack.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="plain-section mt-20">
                <div className="plain-section__heading">
                    <div>
                        <p className="page-file">updates.md</p>
                        <h2>Project updates.</h2>
                    </div>
                    <span>{updates.length} published</span>
                </div>
                {updates.length > 0 ? (
                    <div className="build-archive">
                        {updates.map((update, index) => (
                            <BuildUpdateCard
                                key={update.slug}
                                update={update}
                                project={project}
                                featured={index === 0}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">
                        This project overview is published; its first detailed update is still to
                        come.
                    </p>
                )}
            </section>

            <div className="mt-16 border-t dev-divider pt-8">
                <Link href="/building" className="text-link">
                    ← Back to every build project
                </Link>
            </div>
        </main>
    </Wrapper>
);

export default BuildProjectPage;

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: loadBuildProjects().map((project) => ({ params: { slug: project.slug } })),
    fallback: false
});

export const getStaticProps: GetStaticProps<BuildProjectPageProps> = async ({ params }) => {
    const projects = loadBuildProjects();
    const project = getProject(projects, String(params?.slug));
    if (!project) return { notFound: true };

    const updates = (await loadBuildUpdates()).filter(
        (update) => update.frontmatter.project === project.slug
    );
    return { props: { project, updates } };
};
