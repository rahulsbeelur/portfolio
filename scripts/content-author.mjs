import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import YAML from 'yaml';

const BUILD_STATUSES = ['exploring', 'in-progress', 'shipped', 'blocked'];
const root = process.cwd();
const projectsPath = path.join(root, 'modules/building/projects.yml');
const portfolioProjectsFolder = path.join(root, 'modules/projects/mdx');
const workExperienceFolder = path.join(root, 'modules/resume/mdx/work-experience');
const educationFolder = path.join(root, 'modules/resume/mdx/education');
const languagesPath = path.join(root, 'modules/resume/mdx/speak/languages.mdx');

export const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

export const quoteYaml = (value) => `'${String(value).replace(/'/g, "''")}'`;

export const uniqueSlug = (folder, base) => {
    const safeBase = slugify(base) || 'untitled';
    let candidate = safeBase;
    let suffix = 2;
    while (fs.existsSync(path.join(folder, `${candidate}.mdx`))) {
        candidate = `${safeBase}-${suffix}`;
        suffix += 1;
    }
    return candidate;
};

const nextSequence = (folder) => {
    if (!fs.existsSync(folder)) return 1;
    const numbers = fs
        .readdirSync(folder)
        .map((file) => Number(file.match(/^(\d+)-/)?.[1] ?? 0))
        .filter((value) => Number.isInteger(value));
    return Math.max(0, ...numbers) + 1;
};

const listItems = (value) =>
    value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const yamlList = (items) => `[${items.map(quoteYaml).join(', ')}]`;

export const renderDocument = (fields, body = 'Write here.') =>
    `---\n${fields.join('\n')}\n---\n\n${body}\n`;

export const validateDocument = (filePath, requiredKeys) => {
    const source = fs.readFileSync(filePath, 'utf8');
    const match = source.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) throw new Error(`${filePath} is missing frontmatter.`);
    const data = YAML.parse(match[1]);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error(`${filePath} frontmatter did not parse as a mapping.`);
    }
    const missing = requiredKeys.filter((key) => data[key] === undefined || data[key] === '');
    if (missing.length > 0) throw new Error(`${filePath} is missing ${missing.join(', ')}.`);
    return data;
};

const askRequired = async (rl, label) => {
    while (true) {
        const value = (await rl.question(`${label}: `)).trim();
        if (value) return value;
        console.log(`${label} is required.`);
    }
};

const askOptional = async (rl, label, fallback = '') => {
    const value = (await rl.question(`${label}${fallback ? ` (${fallback})` : ''}: `)).trim();
    return value || fallback;
};

const askList = async (rl, label, required = false) => {
    while (true) {
        const items = listItems(await askOptional(rl, label));
        if (!required || items.length > 0) return items;
        console.log('Add at least one item, separated with commas.');
    }
};

const askChoice = async (rl, label, choices, fallback) => {
    while (true) {
        const value = (await askOptional(rl, `${label} (${choices.join(', ')})`, fallback))
            .toLowerCase()
            .trim();
        if (choices.includes(value)) return value;
        console.log(`Choose one of: ${choices.join(', ')}.`);
    }
};

const askProgress = async (rl, fallback = '0') => {
    while (true) {
        const value = await askOptional(rl, 'Overall project progress, 0–100', fallback);
        const progress = Number(value);
        if (Number.isInteger(progress) && progress >= 0 && progress <= 100) return progress;
        console.log('Progress must be a whole number from 0 to 100.');
    }
};

const askDate = async (rl, label = 'Publish date (YYYY-MM-DD)') => {
    while (true) {
        const value = await askOptional(rl, label, new Date().toISOString().slice(0, 10));
        const parsed = new Date(`${value}T00:00:00Z`);
        if (
            /^\d{4}-\d{2}-\d{2}$/.test(value) &&
            !Number.isNaN(parsed.getTime()) &&
            parsed.toISOString().slice(0, 10) === value
        )
            return value;
        console.log('Use a real date in YYYY-MM-DD format.');
    }
};

const askMonthYear = async (rl, label, required = true) => {
    while (true) {
        const value = await askOptional(rl, `${label} (MM/YYYY)`);
        if (!value && !required) return '';
        if (/^(0[1-9]|1[0-2])\/\d{4}$/.test(value)) return value;
        console.log('Use MM/YYYY, for example 03/2024.');
    }
};

const askYear = async (rl, label) => {
    while (true) {
        const value = await askRequired(rl, `${label} (YYYY)`);
        if (/^\d{4}$/.test(value)) return value;
        console.log('Use a four-digit year, for example 2024.');
    }
};

const askUrl = async (rl, label, required = false) => {
    while (true) {
        const value = required ? await askRequired(rl, label) : await askOptional(rl, label);
        if (!value && !required) return '';
        try {
            const parsed = new URL(value);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return value;
        } catch {
            // The message below gives the user the expected format.
        }
        console.log('Use a complete http:// or https:// URL.');
    }
};

const askProjectImage = async (rl) => {
    while (true) {
        const value = await askRequired(rl, 'Image filename from public/projects');
        if (fs.existsSync(path.join(root, 'public/projects', value))) return value;
        console.log(`public/projects/${value} does not exist. Add the image, then try again.`);
    }
};

const writeValidated = (folder, slug, fields, requiredKeys, body = 'Write here.') => {
    fs.mkdirSync(folder, { recursive: true });
    const filename = `${uniqueSlug(folder, slug)}.mdx`;
    const outputPath = path.join(folder, filename);
    fs.writeFileSync(outputPath, renderDocument(fields, body));
    try {
        validateDocument(outputPath, requiredKeys);
    } catch (error) {
        fs.rmSync(outputPath, { force: true });
        throw error;
    }
    console.log(`Created ${outputPath}`);
    return outputPath;
};

const loadProjects = () => {
    if (!fs.existsSync(projectsPath)) return [];
    const source = YAML.parse(fs.readFileSync(projectsPath, 'utf8'));
    return Array.isArray(source?.projects) ? source.projects : [];
};

const saveProjects = (projects) => {
    fs.mkdirSync(path.dirname(projectsPath), { recursive: true });
    fs.writeFileSync(projectsPath, YAML.stringify({ projects }, { indent: 4 }));
};

const chooseProject = async (rl, projects) => {
    if (projects.length === 1) {
        console.log(`Project: ${projects[0].name} (${projects[0].slug})`);
        return projects[0];
    }
    projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name} — ${project.slug}`);
    });
    while (true) {
        const choice = await askRequired(rl, 'Choose a project number or slug');
        const selected = /^\d+$/.test(choice)
            ? projects[Number(choice) - 1]
            : projects.find((project) => project.slug === choice);
        if (selected) return selected;
        console.log('Choose one of the listed projects.');
    }
};

export const runBlog = async (rl) => {
    const title = await askRequired(rl, 'Title');
    const summary = await askRequired(rl, 'One-sentence summary');
    const publishedAt = await askDate(rl);
    const tags = listItems(await askOptional(rl, 'Tags, comma-separated (optional)'));
    const fields = [
        `title: ${quoteYaml(title)}`,
        `summary: ${quoteYaml(summary)}`,
        `publishedAt: ${quoteYaml(publishedAt)}`
    ];
    if (tags.length > 0) fields.push(`tags: ${yamlList(tags)}`);
    writeValidated(path.join(root, 'modules/blog/mdx'), slugify(title), fields, [
        'title',
        'summary',
        'publishedAt'
    ]);
};

export const runBuildProject = async (rl) => {
    const projects = loadProjects();
    const name = await askRequired(rl, 'Project name');
    const slug = slugify(await askOptional(rl, 'Project slug', slugify(name)));
    if (projects.some((project) => project.slug === slug)) {
        throw new Error(`A project with the slug "${slug}" already exists.`);
    }
    const description = await askRequired(rl, 'One-sentence project description');
    const goal = await askRequired(rl, 'What outcome are you trying to reach?');
    const status = await askChoice(
        rl,
        'Project status',
        ['active', 'paused', 'complete'],
        'active'
    );
    const startedAt = await askDate(rl, 'Start date (YYYY-MM-DD)');
    const progress = await askProgress(rl);
    const focus = await askList(rl, 'Current focus threads, comma-separated', true);
    const stack = await askList(rl, 'Tools or technologies, comma-separated', true);
    const repository = await askOptional(rl, 'Repository URL (optional)');
    const website = await askOptional(rl, 'Website URL (optional)');

    const project = {
        slug,
        name,
        eyebrow: await askOptional(rl, 'Small label', 'Current exploration'),
        description,
        goal,
        status,
        startedAt,
        progress,
        focus,
        stack
    };
    if (repository) project.repository = repository;
    if (website) project.website = website;
    projects.push(project);
    saveProjects(projects);
    console.log(`Created project "${name}" in ${projectsPath}`);
};

export const runBuildUpdate = async (rl) => {
    let projects = loadProjects();
    if (projects.length === 0) {
        console.log('No build projects exist yet. Let’s create the first one.');
        await runBuildProject(rl);
        projects = loadProjects();
    }
    const project = await chooseProject(rl, projects);
    const title = await askRequired(rl, 'Update title');
    const summary = await askRequired(rl, 'One-sentence summary');
    const publishedAt = await askDate(rl);
    const status = await askChoice(rl, 'Update status', BUILD_STATUSES, 'in-progress');
    const progress = await askProgress(rl, String(project.progress ?? 0));
    const timeSpent = await askRequired(rl, 'Time invested (for example: 1h 45m)');
    const shipped = await askList(rl, 'What changed, comma-separated', true);
    const next = await askOptional(rl, 'Next move (optional)');
    const tags = await askList(rl, 'Tags, comma-separated (optional)');
    const note = await askRequired(rl, 'Build note (Markdown is welcome)');

    const fields = [
        `title: ${quoteYaml(title)}`,
        `summary: ${quoteYaml(summary)}`,
        `publishedAt: ${quoteYaml(publishedAt)}`,
        `project: ${quoteYaml(project.slug)}`,
        `status: ${quoteYaml(status)}`,
        `progress: ${progress}`,
        `timeSpent: ${quoteYaml(timeSpent)}`,
        `shipped: ${yamlList(shipped)}`
    ];
    if (next) fields.push(`next: ${quoteYaml(next)}`);
    if (tags.length > 0) fields.push(`tags: ${yamlList(tags)}`);

    writeValidated(
        path.join(root, 'modules/building/mdx'),
        `${publishedAt}-${slugify(title)}`,
        fields,
        [
            'title',
            'summary',
            'publishedAt',
            'project',
            'status',
            'progress',
            'timeSpent',
            'shipped'
        ],
        note
    );

    project.progress = progress;
    saveProjects(projects);
    console.log(`Updated ${project.name} to ${progress}% progress.`);
    console.log('Run `npm run dev` to preview the entry at /building.');
};

export const runPortfolioProject = async (rl) => {
    const projectName = await askRequired(rl, 'Project name');
    const summary = await askRequired(rl, 'One-sentence project summary');
    const techStack = await askList(rl, 'Tools or technologies, comma-separated', true);
    const image = await askProjectImage(rl);
    let deployedLink = await askUrl(rl, 'Live project URL (optional)');
    let gitHubLink = await askUrl(rl, 'GitHub URL (optional)');

    while (!deployedLink && !gitHubLink) {
        console.log('Add at least one live project or GitHub URL.');
        deployedLink = await askUrl(rl, 'Live project URL (optional)');
        gitHubLink = await askUrl(rl, 'GitHub URL (optional)');
    }

    const fields = [
        `projectName: ${quoteYaml(projectName)}`,
        `techStack: ${yamlList(techStack)}`,
        `summary: ${quoteYaml(summary)}`,
        `image: ${quoteYaml(image)}`
    ];
    if (deployedLink) fields.push(`deployedLink: ${quoteYaml(deployedLink)}`);
    if (gitHubLink) fields.push(`gitHubLink: ${quoteYaml(gitHubLink)}`);

    const sequence = nextSequence(portfolioProjectsFolder);
    writeValidated(
        portfolioProjectsFolder,
        `${sequence}-${slugify(projectName)}`,
        fields,
        ['projectName', 'techStack', 'summary', 'image'],
        ''
    );
    console.log('Run `npm run dev` to preview the project at /projects.');
};

export const runWorkExperience = async (rl) => {
    const companyName = await askRequired(rl, 'Company name');
    const role = await askRequired(rl, 'Role');
    const startDate = await askMonthYear(rl, 'Start date');
    const endDate = await askMonthYear(
        rl,
        'End date; leave blank if this is your current role',
        false
    );
    const achievements = await askList(rl, 'Impact or achievements, comma-separated', true);
    const fields = [
        `companyName: ${quoteYaml(companyName)}`,
        `role: ${quoteYaml(role)}`,
        `startDate: ${quoteYaml(startDate)}`
    ];
    if (endDate) fields.push(`endDate: ${quoteYaml(endDate)}`);
    const body = achievements.map((achievement) => `-   ${achievement}`).join('\n');
    const sequence = nextSequence(workExperienceFolder);

    writeValidated(
        workExperienceFolder,
        `${sequence}-${slugify(companyName)}`,
        fields,
        ['companyName', 'role', 'startDate'],
        body
    );
    console.log('Run `npm run dev` to preview the role at /resume.');
};

export const runEducation = async (rl) => {
    const name = await askRequired(rl, 'School or institution');
    const degreeType = await askRequired(rl, 'Degree or level');
    const course = await askOptional(rl, 'Course or field (optional)');
    const location = await askRequired(rl, 'Location');
    const score = await askRequired(rl, 'Score or grade');
    const startDate = await askYear(rl, 'Start year');
    const endDate = await askYear(rl, 'End year');
    const fields = [
        `name: ${quoteYaml(name)}`,
        `degreeType: ${quoteYaml(degreeType)}`,
        `location: ${quoteYaml(location)}`,
        `score: ${quoteYaml(score)}`,
        `startDate: ${quoteYaml(startDate)}`,
        `endDate: ${quoteYaml(endDate)}`
    ];
    if (course) fields.push(`course: ${quoteYaml(course)}`);
    const sequence = nextSequence(educationFolder);

    writeValidated(
        educationFolder,
        `${sequence}-${slugify(name)}`,
        fields,
        ['name', 'degreeType', 'location', 'score', 'startDate', 'endDate'],
        ''
    );
    console.log('Run `npm run dev` to preview the education entry at /resume.');
};

export const runLanguages = async (rl) => {
    const languages = await askList(rl, 'Languages, comma-separated', true);
    fs.mkdirSync(path.dirname(languagesPath), { recursive: true });
    fs.writeFileSync(languagesPath, renderDocument([`languages: ${yamlList(languages)}`], ''));
    validateDocument(languagesPath, ['languages']);
    console.log(`Updated ${languagesPath}`);
};

export const withPrompts = async (run) => {
    const rl = readline.createInterface({ input, output });
    try {
        await run(rl);
    } finally {
        rl.close();
    }
};
