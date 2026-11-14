export const quickReadAccents = ['blue', 'violet', 'amber', 'green'] as const;

export type QuickReadAccent = (typeof quickReadAccents)[number];

export interface QuickRead {
    title: string;
    summary: string;
    publishedAt: string;
    area: string;
    topics: string[];
    accent?: QuickReadAccent;
    series?: string;
    seriesOrder?: number;
    relatedTitle?: string;
    relatedHref?: string;
}

export interface QuickReadPost {
    frontmatter: QuickRead;
    code: string;
    slug: string;
    readingTime: string;
}

export interface QuickReadSeries {
    name: string;
    posts: QuickReadPost[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const text = (value: unknown): string | undefined => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
};

const publishedDate = (value: unknown): string | undefined => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().slice(0, 10);
    }
    const raw = text(value);
    if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw) || Number.isNaN(Date.parse(raw))) {
        return undefined;
    }
    return raw;
};

const topicList = (value: unknown): string[] | undefined => {
    if (value === undefined) {
        return [];
    }
    if (typeof value === 'string') {
        return value
            .split(',')
            .map((topic) => topic.trim())
            .filter(Boolean);
    }
    if (
        !Array.isArray(value) ||
        value.some((topic) => typeof topic !== 'string' || !topic.trim())
    ) {
        return undefined;
    }
    return value.map((topic) => topic.trim());
};

const seriesPosition = (value: unknown): number | undefined => {
    const numeric =
        typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
    if (!Number.isInteger(numeric) || numeric < 1) {
        return undefined;
    }
    return numeric;
};

const relatedPath = (value: unknown): string | undefined => {
    const href = text(value);
    if (!href || !/^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(href)) {
        return undefined;
    }
    return href;
};

export const normalizeQuickRead = (
    fileName: string,
    frontmatter: unknown,
    blogSlugs: ReadonlySet<string>
): QuickRead => {
    const errors: string[] = [];
    const source = isRecord(frontmatter) ? frontmatter : {};
    if (!isRecord(frontmatter)) {
        errors.push('frontmatter must be a mapping');
    }

    const title = text(source.title);
    const summary = text(source.summary);
    const publishedAt = publishedDate(source.publishedAt);
    const area = text(source.area);
    const topics = topicList(source.topics);
    const series = text(source.series);
    const accent = text(source.accent);
    const relatedTitle = text(source.relatedTitle);
    const relatedHref =
        source.relatedHref === undefined ? undefined : relatedPath(source.relatedHref);

    if (!title) errors.push('title is required');
    if (!summary) errors.push('summary is required');
    if (!publishedAt) errors.push('publishedAt must be YYYY-MM-DD');
    if (!area) errors.push('area is required');
    if (!topics) errors.push('topics must be a list of strings');
    if (source.seriesOrder !== undefined && seriesPosition(source.seriesOrder) === undefined) {
        errors.push('seriesOrder must be a positive integer');
    }
    if (series && source.seriesOrder === undefined) {
        errors.push('seriesOrder is required when series is set');
    }
    if (!series && source.seriesOrder !== undefined) {
        errors.push('series is required when seriesOrder is set');
    }
    if (accent && !(quickReadAccents as readonly string[]).includes(accent)) {
        errors.push(`accent must be one of ${quickReadAccents.join(', ')}`);
    }
    if (source.relatedHref !== undefined && !relatedHref) {
        errors.push('relatedHref must look like /blog/your-post-slug');
    }
    if (relatedHref && !blogSlugs.has(relatedHref.replace('/blog/', ''))) {
        errors.push(`related blog ${relatedHref} does not exist`);
    }
    if (relatedTitle && !relatedHref) {
        errors.push('relatedHref is required when relatedTitle is set');
    }

    if (errors.length > 0 || !title || !summary || !publishedAt || !area || !topics) {
        throw new Error(
            `${fileName} has invalid quick-read frontmatter:\n- ${errors.join('\n- ')}`
        );
    }

    return {
        title,
        summary,
        publishedAt,
        area,
        topics,
        ...(accent ? { accent: accent as QuickReadAccent } : {}),
        ...(series ? { series, seriesOrder: seriesPosition(source.seriesOrder) } : {}),
        ...(relatedHref ? { relatedHref, ...(relatedTitle ? { relatedTitle } : {}) } : {})
    };
};

export const sortQuickReads = (posts: QuickReadPost[]): QuickReadPost[] =>
    [...posts].sort((left, right) => {
        const byDate =
            Date.parse(right.frontmatter.publishedAt) - Date.parse(left.frontmatter.publishedAt);
        if (byDate !== 0) return byDate;
        return left.slug.localeCompare(right.slug);
    });

export const quickReadAreas = (posts: QuickReadPost[]): string[] =>
    Array.from(new Set(posts.map((post) => post.frontmatter.area))).sort((left, right) =>
        left.localeCompare(right)
    );

export const quickReadTopics = (posts: QuickReadPost[]): string[] =>
    Array.from(new Set(posts.flatMap((post) => post.frontmatter.topics))).sort((left, right) =>
        left.localeCompare(right)
    );

export const quickReadSeries = (posts: QuickReadPost[]): QuickReadSeries[] => {
    const names = Array.from(
        new Set(
            posts
                .map((post) => post.frontmatter.series)
                .filter((name): name is string => Boolean(name))
        )
    ).sort((left, right) => left.localeCompare(right));

    return names.map((name) => ({
        name,
        posts: posts
            .filter((post) => post.frontmatter.series === name)
            .sort((left, right) => {
                const byOrder =
                    (left.frontmatter.seriesOrder ?? 0) - (right.frontmatter.seriesOrder ?? 0);
                if (byOrder !== 0) return byOrder;
                const byTitle = left.frontmatter.title.localeCompare(right.frontmatter.title);
                return byTitle !== 0 ? byTitle : left.slug.localeCompare(right.slug);
            })
    }));
};

export const visibleQuickReads = (
    posts: QuickReadPost[],
    selectedFilter: string,
    selectedSeries?: string
): QuickReadPost[] => {
    if (selectedSeries) {
        const series = quickReadSeries(posts).find((group) => group.name === selectedSeries);
        return series?.posts ?? [];
    }
    if (selectedFilter === 'All') return sortQuickReads(posts);
    return sortQuickReads(
        posts.filter(
            (post) =>
                post.frontmatter.area === selectedFilter ||
                post.frontmatter.topics.includes(selectedFilter)
        )
    );
};

export const quickReadsPath = (params: {
    filter?: string;
    series?: string;
    focus?: boolean;
    hash?: string;
}): string => {
    const search = new URLSearchParams();
    if (params.filter && params.filter !== 'All') search.set('filter', params.filter);
    if (params.series) search.set('series', params.series);
    const query = search.toString();
    const base = params.focus ? '/quick-reads/focus' : '/quick-reads';
    const hash = params.hash ? `#${params.hash}` : '';
    return query ? `${base}?${query}${hash}` : `${base}${hash}`;
};

export const queryValue = (value: string | string[] | undefined): string | undefined =>
    typeof value === 'string' && value.trim() ? value : undefined;
