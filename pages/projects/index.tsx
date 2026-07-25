import fs from 'fs';
import React from 'react';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { ProjectCard } from '../../modules/projects/components/ProjectCard';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';

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
            <div className="mx-auto max-w-[1080px] desktop:mt-[138px] tablet:mt-[128px] mt-24 py-8">
                <header className="mb-10 max-w-3xl">
                    <p className="font-robotoMono text-sm text-muted">{pageContent.eyebrow}</p>
                    <h1 className="mt-3 text-[44px] font-poppins font-[600] leading-[54px] text-foreground mobile:text-[34px] mobile:leading-[42px]">
                        {pageContent.title}
                    </h1>
                    <p className="body1 mt-4 text-muted">{pageContent.description}</p>
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
