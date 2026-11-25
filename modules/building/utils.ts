import { BuildProject } from './types';

export const getProject = (projects: BuildProject[], slug: string): BuildProject | undefined =>
    projects.find((project) => project.slug === slug);

export const buildProjectStatusLabel = (status: BuildProject['status']): string => {
    if (status === 'active') return 'In progress';
    if (status === 'complete') return 'Completed';
    return 'Stopped';
};
