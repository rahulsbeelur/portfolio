import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { ProjectCard } from '../../modules/projects/components/ProjectCard';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { PageHeader } from '../../modules/common/components/PageHeader';

const Projects = ({
    projects,
    pageContent
}: {
    projects: { code: string; frontmatter: Project }[];
    pageContent: PageContent;
}): JSX.Element => {
    return (
        <Wrapper classes="normal-case">
            <SEO
                title={pageContent.seoTitle}
                description={pageContent.seoDescription}
                path="/projects"
            />
            <main className="mx-auto max-w-[1080px] pt-32 pb-20 mobile:pt-24">
                <PageHeader
                    fileName={pageContent.eyebrow}
                    title={pageContent.title}
                    description={pageContent.description}
                />
                <div className="mt-16">{ProjectCard({ projects })}</div>
            </main>
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

interface PageContent {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    description: string;
}

export const getStaticProps = async (): Promise<{
    props: { projects: { code: string; frontmatter: Project }[]; pageContent: PageContent };
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
    const { frontmatter: pageContent } = await getMDData<PageContent>(
        `${MdxPaths.Pages}/projects.mdx`
    );
    return {
        props: {
            projects,
            pageContent
        }
    };
};
