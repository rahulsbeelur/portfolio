import fs from 'fs';
import YAML from 'yaml';
import { MdxPaths } from '../../constant/paths';
import { getMDData } from '../common/utils/mdxUtils';
import { BuildProject, BuildUpdate, BuildUpdateDocument } from './types';

const projectsFile = 'modules/building/projects.yml';

export const loadBuildProjects = (): BuildProject[] => {
    if (!fs.existsSync(projectsFile)) return [];
    const source = YAML.parse(fs.readFileSync(projectsFile, 'utf8')) as {
        projects?: BuildProject[];
    };
    return source.projects ?? [];
};

export const loadBuildUpdates = async (): Promise<BuildUpdateDocument[]> => {
    if (!fs.existsSync(MdxPaths.Building)) return [];
    const files = fs.readdirSync(MdxPaths.Building).filter((file) => file.endsWith('.mdx'));
    const updates = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            const { code, frontmatter } = await getMDData<BuildUpdate>(
                `${MdxPaths.Building}/${file}`
            );
            return { code, frontmatter, slug };
        })
    );

    return updates.sort(
        (a, b) =>
            new Date(b.frontmatter.publishedAt).getTime() -
            new Date(a.frontmatter.publishedAt).getTime()
    );
};

export const getActiveBuildProject = (projects: BuildProject[]): BuildProject | undefined =>
    projects.find((project) => project.status === 'active') ?? projects[0];
