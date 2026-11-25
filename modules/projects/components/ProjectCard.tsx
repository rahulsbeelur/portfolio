import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../pages/projects';

export const ProjectCard = ({
    projects
}: {
    projects: { code: string; frontmatter: Project }[];
}): JSX.Element => (
    <div className="project-list">
        {projects.map((project, index) => (
            <Link
                key={project.frontmatter.projectName}
                href={project.frontmatter.deployedLink ?? project.frontmatter.gitHubLink ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.frontmatter.projectName}`}
                className="project-list__item group">
                <div className="project-list__image">
                    <Image
                        src={`/projects/${project.frontmatter.image}`}
                        alt=""
                        width={1000}
                        height={650}
                        priority={index === 0}
                    />
                </div>
                <article>
                    <p className="page-file">project-{String(index + 1).padStart(2, '0')}.md</p>
                    <h2>{project.frontmatter.projectName}</h2>
                    <p>{project.frontmatter.summary}</p>
                    <div className="project-list__stack">
                        {project.frontmatter.techStack.map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                    <b>
                        {project.frontmatter.deployedLink ? 'Open project' : 'View on GitHub'}{' '}
                        <span aria-hidden="true">↗</span>
                    </b>
                </article>
            </Link>
        ))}
    </div>
);
