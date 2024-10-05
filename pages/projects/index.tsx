import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { ProjectCard } from '../../modules/projects/components/ProjectCard';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';

const Projects = ({
    projects
}: {
    projects: { code: string; frontmatter: Project }[];
}): JSX.Element => {
    return (
        <Wrapper classes="bg-primary-background-color dark:bg-neutral-black-light normal-case">
            <div className="mx-auto max-w-[2560px] desktop:mt-[138px] tablet:mt-[128px] mt-24 h5">
                <div className="flex justify-center">
                    <div className="mt-auto mb-auto desktop:w-5 desktop:h-5 w-4 h-4 bg-[#696969]"></div>
                    <div className="text-center ml-2 text-neutral-black-darker dark:text-neutral-white-darker">
                        Projects
                    </div>
                </div>
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
