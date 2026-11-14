import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import YAML from 'yaml';

const ACCENTS = ['blue', 'violet', 'amber', 'green'];
const root = process.cwd();

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

const askYes = async (rl, label) => {
    const value = (await rl.question(`${label} (y/N): `)).trim().toLowerCase();
    return value === 'y' || value === 'yes';
};

const blogFiles = () => {
    const folder = path.join(root, 'modules/blog/mdx');
    if (!fs.existsSync(folder)) return [];
    return fs
        .readdirSync(folder)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''))
        .sort();
};

const writeValidated = (folder, slug, fields, requiredKeys) => {
    fs.mkdirSync(folder, { recursive: true });
    const filename = `${uniqueSlug(folder, slug)}.mdx`;
    const outputPath = path.join(folder, filename);
    fs.writeFileSync(outputPath, renderDocument(fields));
    try {
        validateDocument(outputPath, requiredKeys);
    } catch (error) {
        fs.rmSync(outputPath, { force: true });
        throw error;
    }
    console.log(`Created ${outputPath}`);
};

export const runBlog = async (rl) => {
    const title = await askRequired(rl, 'Title');
    const summary = await askRequired(rl, 'One-sentence summary');
    const publishedAt = await askOptional(
        rl,
        'Publish date (YYYY-MM-DD)',
        new Date().toISOString().slice(0, 10)
    );
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt))
        throw new Error('Publish date must be YYYY-MM-DD.');
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

export const runQuickRead = async (rl) => {
    const title = await askRequired(rl, 'Title');
    const summary = await askRequired(rl, 'One-sentence summary');
    const publishedAt = await askOptional(
        rl,
        'Publish date (YYYY-MM-DD)',
        new Date().toISOString().slice(0, 10)
    );
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt))
        throw new Error('Publish date must be YYYY-MM-DD.');
    const area = await askOptional(rl, 'Broad area (AI, Platform, Frontend, etc.)', 'AI');
    const topics = listItems(await askOptional(rl, 'Specific topics, comma-separated (optional)'));
    const fields = [
        `title: ${quoteYaml(title)}`,
        `summary: ${quoteYaml(summary)}`,
        `publishedAt: ${quoteYaml(publishedAt)}`,
        `area: ${quoteYaml(area)}`,
        `topics: ${yamlList(topics)}`
    ];

    if (await askYes(rl, 'Add this to a series?')) {
        const series = await askRequired(rl, 'Series name');
        const seriesOrder = await askOptional(rl, 'Position in series', '1');
        if (!/^[1-9]\d*$/.test(seriesOrder))
            throw new Error('Series position must be a positive integer.');
        fields.push(`series: ${quoteYaml(series)}`, `seriesOrder: ${seriesOrder}`);
    }

    if (await askYes(rl, 'Link a related blog post?')) {
        const slugs = blogFiles();
        if (slugs.length === 0) {
            console.log('No blog posts exist yet. Skipping the related link.');
        } else {
            slugs.forEach((slug, index) => console.log(`${index + 1}. ${slug}`));
            const choice = await askRequired(rl, 'Choose a number or type a blog slug');
            const slug = /^[1-9]\d*$/.test(choice) ? slugs[Number(choice) - 1] : choice;
            if (!slug || !slugs.includes(slug)) throw new Error('Choose an existing blog slug.');
            const relatedTitle = await askOptional(rl, 'Link label (optional)');
            if (relatedTitle) fields.push(`relatedTitle: ${quoteYaml(relatedTitle)}`);
            fields.push(`relatedHref: ${quoteYaml(`/blog/${slug}`)}`);
        }
    }

    const accent = (await askOptional(rl, `Accent (${ACCENTS.join(', ')}) or blank`)).toLowerCase();
    if (accent) {
        if (!ACCENTS.includes(accent))
            throw new Error(`Accent must be one of ${ACCENTS.join(', ')}.`);
        fields.push(`accent: ${quoteYaml(accent)}`);
    }

    writeValidated(path.join(root, 'modules/quick-reads/mdx'), slugify(title), fields, [
        'title',
        'summary',
        'publishedAt',
        'area',
        'topics'
    ]);
};

export const withPrompts = async (run) => {
    const rl = readline.createInterface({ input, output });
    try {
        await run(rl);
    } finally {
        rl.close();
    }
};
