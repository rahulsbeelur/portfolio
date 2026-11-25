import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const projectsPath = path.join(root, 'modules/building/projects.yml');
const updatesFolder = path.join(root, 'modules/building/mdx');
const minimumUpdates = 10;

const phases = [
    {
        slug: 'scope-and-success-criteria',
        title: 'Set the scope and success criteria',
        summary:
            'Turned the initial idea into a bounded problem with a clear result to work toward.',
        shipped: [
            'Defined the primary user',
            'Wrote measurable success criteria',
            'Removed one distracting edge case'
        ]
    },
    {
        slug: 'first-working-path',
        title: 'Built the first working path',
        summary:
            'Connected the smallest end-to-end flow so the project could be tested with real inputs.',
        shipped: [
            'Connected the core workflow',
            'Added a representative input',
            'Captured the first usable output'
        ]
    },
    {
        slug: 'data-model-and-interfaces',
        title: 'Clarified the data model and interfaces',
        summary:
            'Simplified the boundaries between inputs, stored state, and the output shown to a user.',
        shipped: [
            'Named the main data concepts',
            'Reduced interface ambiguity',
            'Documented input and output shapes'
        ]
    },
    {
        slug: 'failure-handling',
        title: 'Made failures easier to handle',
        summary:
            'Added explicit behaviour for invalid input, unavailable dependencies, and interrupted work.',
        shipped: [
            'Handled invalid input',
            'Added dependency failure states',
            'Improved recovery messages'
        ]
    },
    {
        slug: 'observability-pass',
        title: 'Added an observability pass',
        summary:
            'Introduced the signals needed to understand what the system did and why a run failed.',
        shipped: [
            'Added structured events',
            'Recorded useful timings',
            'Defined one actionable health signal'
        ]
    },
    {
        slug: 'usability-cleanup',
        title: 'Simplified the main workflow',
        summary: 'Removed avoidable choices and made the most common path faster to understand.',
        shipped: [
            'Reduced setup steps',
            'Improved labels and defaults',
            'Removed one unnecessary configuration option'
        ]
    },
    {
        slug: 'realistic-test-case',
        title: 'Ran a realistic test case',
        summary:
            'Used a production-shaped example to find assumptions that smaller fixtures did not expose.',
        shipped: [
            'Added a realistic fixture',
            'Recorded the unexpected behaviour',
            'Turned the finding into a repeatable check'
        ]
    },
    {
        slug: 'performance-and-reliability',
        title: 'Improved performance and reliability',
        summary:
            'Measured the slow path and tightened the part of the system most likely to fail under load.',
        shipped: [
            'Measured the slowest operation',
            'Reduced repeated work',
            'Added a reliability regression check'
        ]
    },
    {
        slug: 'documentation-and-handoff',
        title: 'Documented the operating model',
        summary:
            'Wrote down setup, ownership, expected behaviour, and the decisions future work should preserve.',
        shipped: [
            'Added setup guidance',
            'Recorded important trade-offs',
            'Documented ownership and support expectations'
        ]
    },
    {
        slug: 'release-checkpoint',
        title: 'Reached the release checkpoint',
        summary:
            'Reviewed the original goal, closed the remaining gaps, and recorded the next decision for the project.',
        shipped: [
            'Reviewed the success criteria',
            'Closed the final priority gap',
            'Recorded the release decision'
        ]
    }
];

const parseFrontmatter = (filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    const match = source.match(/^---\n([\s\S]*?)\n---\n/);
    return match ? YAML.parse(match[1]) : {};
};

const addDays = (date, days) => new Date(date.getTime() + days * 86_400_000);
const formatDate = (date) => date.toISOString().slice(0, 10);

const checkpointDate = (project, index) => {
    const start = new Date(`${project.startedAt}T00:00:00Z`);
    const today = new Date();
    const plannedDays = project.status === 'complete' ? 70 : project.status === 'paused' ? 60 : 35;
    const plannedEnd = addDays(start, plannedDays);
    const end = plannedEnd.getTime() < today.getTime() ? plannedEnd : today;
    const duration = Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86_400_000));
    return formatDate(addDays(start, Math.round((duration * index) / (minimumUpdates - 1))));
};

const checkpointProgress = (project, index) => {
    const finalProgress = project.status === 'complete' ? 100 : project.progress;
    const initialProgress = Math.max(2, Math.round(finalProgress * 0.08));
    return Math.min(
        finalProgress,
        Math.round(
            initialProgress + ((finalProgress - initialProgress) * index) / (minimumUpdates - 1)
        )
    );
};

const checkpointStatus = (project, index) => {
    if (index === 0) return 'exploring';
    if (index === minimumUpdates - 1 && project.status === 'complete') return 'shipped';
    if (index === minimumUpdates - 1 && project.status === 'paused') return 'blocked';
    return 'in-progress';
};

const renderBody = (project, phase, index) => {
    const focus = project.focus[index % project.focus.length];
    const nextFocus = project.focus[(index + 1) % project.focus.length];
    const stateNote =
        project.status === 'paused' && index === minimumUpdates - 1
            ? `I stopped active work here because the next investment needs a clearer reason to exist. The findings remain useful, and the project can be restarted if that reason changes.`
            : `The useful part of this checkpoint was making the work visible and repeatable instead of relying on a one-off result.`;

    return `This checkpoint focused on **${focus}**. It moved ${project.name} toward its goal: ${
        project.goal
    }

## What changed

${
    phase.summary
} I kept the change deliberately narrow so its effect could be checked before adding another layer.

${phase.shipped.map((item) => `-   ${item}`).join('\n')}

## What I learned

${stateNote} The project is easier to reason about when each decision leaves behind a small piece of evidence: a test, a trace, a comparison, or a written constraint.

## Next

The next checkpoint focuses on **${nextFocus}** and tests whether this version still holds up with a less controlled example.
`;
};

if (!fs.existsSync(projectsPath)) throw new Error(`Missing ${projectsPath}`);
fs.mkdirSync(updatesFolder, { recursive: true });

const projects = YAML.parse(fs.readFileSync(projectsPath, 'utf8')).projects ?? [];
const existingFiles = fs.readdirSync(updatesFolder).filter((file) => file.endsWith('.mdx'));
const existingUpdates = existingFiles.map((file) => ({
    file,
    frontmatter: parseFrontmatter(path.join(updatesFolder, file))
}));

let created = 0;
for (const project of projects) {
    const currentCount = existingUpdates.filter(
        (update) => update.frontmatter.project === project.slug
    ).length;

    for (let index = currentCount; index < minimumUpdates; index += 1) {
        const phase = phases[index];
        const publishedAt = checkpointDate(project, index);
        const status = checkpointStatus(project, index);
        const progress = checkpointProgress(project, index);
        const timeSpent = ['1h 20m', '1h 45m', '2h 10m', '2h 35m'][index % 4];
        const frontmatter = {
            title: phase.title,
            summary: phase.summary,
            publishedAt,
            project: project.slug,
            status,
            progress,
            timeSpent,
            shipped: phase.shipped,
            next:
                project.status === 'complete' && index === minimumUpdates - 1
                    ? 'Keep the project available as a reference and revisit it only when new evidence appears.'
                    : project.focus[(index + 1) % project.focus.length],
            tags: project.stack.slice(0, 3)
        };
        const filename = `${publishedAt}-${project.slug}-${phase.slug}.mdx`;
        const outputPath = path.join(updatesFolder, filename);
        if (fs.existsSync(outputPath)) continue;
        fs.writeFileSync(
            outputPath,
            `---\n${YAML.stringify(frontmatter, {
                indent: 4,
                defaultStringType: 'QUOTE_SINGLE',
                defaultKeyType: 'PLAIN'
            }).trim()}\n---\n\n${renderBody(project, phase, index)}`
        );
        created += 1;
    }
}

console.log(`Created ${created} build updates. Every project now has at least ${minimumUpdates}.`);
