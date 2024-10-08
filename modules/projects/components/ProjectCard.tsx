import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../pages/projects';

export const ProjectCard = ({
    projects
}: {
    projects: { code: string; frontmatter: Project }[];
}): JSX.Element => {
    const imageBackgroundColors: string[] = [
        '#e6e6fa',
        '#add8e6',
        '#f08080',
        '#2f4f4f',
        '#191970',
        '#556b2f',
        '#98ff98',
        '#ffdab9',
        '#8b0000',
        '#36454f'
    ];
    return (
        <>
            {projects.map((project) => (
                <Link
                    key={projects.indexOf(project)}
                    href={(project.frontmatter?.deployedLink ?? project.frontmatter.gitHubLink) ?? ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.frontmatter.projectName}
                    className="mt-10">
                    <div className="flex mobile:flex-col-reverse mobile:justify-end min-h-[300px] mobile:min-h-[340px] max-w-[800px] mx-auto bg-white dark:bg-neutral-black-darker my-5 p-3 pr-0 mobile:p-0 shadow-[0_4px_8px_rgba(28,28,40)] dark:shadow-[0_4px_12px_rgba(80,80,78)] dark:text-white mt-10">
                        <div className="w-[60%] mobile:w-full mobile:h-full">
                            <div className="flex flex-col h-full gap-10">
                                <div className="flex">
                                    <div
                                        className="flex justify-start w-3 ml-[-12px] mobile:ml-0"
                                        style={{
                                            backgroundColor:
                                                imageBackgroundColors[projects.indexOf(project)]
                                        }}></div>
                                    <div className="text-left ml-2 sub-headline1 mobile:w-full mobile:sub-headline2">
                                        {project.frontmatter.projectName}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-5 justify-left mobile:justify-center">
                                    {project.frontmatter.techStack.map((tech) => (
                                        <div
                                            key={project.frontmatter.techStack.indexOf(tech)}
                                            className="flex items-center rounded-full  w-[120px] h-5 ">
                                            <div className="rounded-full bg-white border tex-neutral-white-lighter  dark:border-neutral-white-lighter sub-headline3 dark:bg-black w-[100%] text-center shadow-[0_4px_12px_rgba(100,100,100)] dark:shadow-none">
                                                {tech}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="font-normal text-sm mobile:text-center">
                                    {project.frontmatter.summary}
                                </div>
                                <button className="flex mx-auto rounded-lg shadow-[0_4px_8px_rgba(28,28,40)] hover:bg-primary-background-color-darker hover:dark:bg-neutral-black-default dark:shadow-none w-[40%] h-[40px] bg-primary-background-color dark:bg-[#A9A9A9] sub-headline2 text-neutral-black-darker mobile:mb-8">
                                {(project.frontmatter?.deployedLink ? 'Deployment' : 'GitHub Repo')}
                                </button>
                            </div>
                        </div>
                        <div
                            className="w-[40%] mobile:w-full my-[-12px] mobile:my-0 justify-center flex align-middle overflow-clip"
                            style={{
                                backgroundColor: imageBackgroundColors[projects.indexOf(project)]
                            }}>
                            <div className="w-[90%] flex align-middle mobile:h-[90%] mobile:my-4">
                                <Image
                                    src={'/projects/' + project.frontmatter.image}
                                    alt={project.frontmatter.projectName}
                                    width={1000}
                                    height={1000}
                                    priority
                                    className="aspect-video my-auto shadow-[0_4px_8px_rgba(28,28,40)]"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};
