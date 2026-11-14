import fs from 'fs';
import { MdxPaths } from '../../constant/paths';
import { getMDData } from '../common/utils/mdxUtils';
import { getReadingTime } from '../common/utils/readTime';
import { normalizeQuickRead, QuickReadPost, sortQuickReads } from './content';

const blogSlugs = (): Set<string> => {
    if (!fs.existsSync(MdxPaths.Blog)) return new Set();
    return new Set(
        fs
            .readdirSync(MdxPaths.Blog)
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => file.replace(/\.mdx$/, ''))
    );
};

export const loadQuickReads = async (): Promise<QuickReadPost[]> => {
    if (!fs.existsSync(MdxPaths.QuickReads)) return [];

    const slugs = blogSlugs();
    const files = fs
        .readdirSync(MdxPaths.QuickReads)
        .filter((file) => file.endsWith('.mdx'))
        .sort((left, right) => left.localeCompare(right));
    const posts: QuickReadPost[] = [];

    for (const file of files) {
        const filePath = `${MdxPaths.QuickReads}/${file}`;
        const { code, frontmatter } = await getMDData<Record<string, unknown>>(filePath);
        posts.push({
            frontmatter: normalizeQuickRead(file, frontmatter, slugs),
            code,
            slug: file.replace(/\.mdx$/, ''),
            readingTime: getReadingTime(filePath, true).label
        });
    }

    return sortQuickReads(posts);
};
