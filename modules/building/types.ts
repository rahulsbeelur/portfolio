export type BuildStatus = 'exploring' | 'in-progress' | 'shipped' | 'blocked';

export interface BuildProject {
    slug: string;
    name: string;
    eyebrow: string;
    description: string;
    goal: string;
    status: 'active' | 'paused' | 'complete';
    startedAt: string;
    progress: number;
    focus: string[];
    stack: string[];
    repository?: string;
    website?: string;
}

export interface BuildUpdate {
    title: string;
    summary: string;
    publishedAt: string;
    project: string;
    status: BuildStatus;
    progress: number;
    timeSpent: string;
    shipped: string[];
    next?: string;
    tags?: string[];
}

export interface BuildUpdateDocument {
    code: string;
    frontmatter: BuildUpdate;
    slug: string;
}
