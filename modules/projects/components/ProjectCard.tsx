import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../pages/projects';

export const ProjectCard = ({
    projects
}: {
    projects: { code: string; frontmatter: Project }[];
}): JSX.Element => {
    const accentColors: string[] = ['#2DD4BF', '#8B5CF6', '#F59E0B', '#38BDF8'];

    return (
        <div className="grid gap-6 desktop:grid-cols-3 tablet:grid-cols-2">
            {projects.map((project, index) => (
                <Link
                    key={project.frontmatter.projectName}
                    href={(project.frontmatter?.deployedLink ?? project.frontmatter.gitHubLink) ?? ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.frontmatter.projectName}
                    className="group h-full">
                    <article className="repo-card flex h-full flex-col overflow-hidden rounded-2xl transition duration-200 group-hover:-translate-y-1">
                        <div className="relative aspect-video overflow-hidden border-b dev-divider bg-[var(--code-bg)]">
                            <div
                                className="absolute inset-x-0 top-0 h-1"
                                style={{ backgroundColor: accentColors[index % accentColors.length] }}
                            />
                            <Image
                                src={'/projects/' + project.frontmatter.image}
                                alt={project.frontmatter.projectName}
                                width={1000}
                                height={1000}
                                priority
                                className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-5 p-6">
                            <div>
                                <p className="font-robotoMono text-xs text-accent">
                                    repo/{String(index + 1).padStart(2, '0')}
                                </p>
                                <h2 className="sub-headline1 mt-2 text-foreground">
                                    {project.frontmatter.projectName}
                                </h2>
                            </div>
                            <p className="body2 flex-1 text-foreground/78">
                                {project.frontmatter.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.frontmatter.techStack.map((tech) => (
                                    <span key={tech} className="code-chip">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between border-t dev-divider pt-4">
                                <span className="font-robotoMono text-xs text-muted">
                                    {project.frontmatter?.deployedLink ? 'deployment' : 'github'}
                                </span>
                                <span className="rounded-full border dev-divider px-3 py-1 font-robotoMono text-xs text-foreground transition group-hover:text-accent">
                                    open_repo()
                                </span>
                            </div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
};
