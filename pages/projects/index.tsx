import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { ProjectCard } from '../../modules/projects/components/ProjectCard';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';

const Projects = ({
    projects
}: {
    projects: { code: string; frontmatter: Project }[];
}): JSX.Element => {
    return (
        <Wrapper classes="engineer-grid normal-case">
            <SEO
                title="Projects | Rahul S Beelur"
                description="Selected projects by Rahul S Beelur, including product interfaces, full-stack builds, and implementation details across React, Next.js, Python, and Node.js."
                path="/projects"
            />
            <div className="mx-auto max-w-[1180px] desktop:mt-[138px] tablet:mt-[128px] mt-24 py-8">
                <header className="mb-10 max-w-3xl">
                    <p className="font-robotoMono text-sm text-accent">git log --projects</p>
                    <h1 className="desktop:h2 h4 mt-2 text-foreground">Projects that show how I build.</h1>
                    <p className="body1 mt-4 text-foreground/75">
                        Selected work with the stack, constraints, and implementation choices visible
                        instead of hidden behind a sales pitch.
                    </p>
                </header>
                {ProjectCard({ projects })}
            </div>
        </Wrapper>
    );
};

export default Projects;

export interface Project {
    projectName: string;
    techStack: string[];
    summary: string;
    image: string;
    deployedLink?: string;
    gitHubLink?: string;
}

export const getStaticProps = async (): Promise<{
    props: { projects: { code: string; frontmatter: Project }[] };
}> => {
    const projectsFiles = fs.readdirSync(MdxPaths.Projects).reverse();
    const projects: { code: string; frontmatter: Project }[] = await Promise.all(
        projectsFiles.map(async (file) => {
            const { code, frontmatter }: { code: string; frontmatter: Project } = await getMDData(
                MdxPaths.Projects + '/' + file
            );
            return { code, frontmatter };
        })
    );
    return {
        props: {
            projects
        }
    };
};
