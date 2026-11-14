import Link from 'next/link';
import { useEffect } from 'react';
import { SEO } from '../../common/components/SEO';
import { Wrapper } from '../../common/components/Wrapper';
import {
    quickReadAreas,
    quickReadSeries,
    quickReadTopics,
    quickReadsPath,
    QuickReadPost,
    visibleQuickReads
} from '../content';
import { QuickReadFeed } from './QuickReadFeed';

export interface QuickReadsViewProps {
    posts: QuickReadPost[];
    selectedFilter: string;
    selectedSeries?: string;
    isFocusMode?: boolean;
}

const streamLabel = (selectedFilter: string, selectedSeries?: string): string => {
    if (selectedSeries) return selectedSeries;
    return selectedFilter === 'All' ? 'All quick reads' : selectedFilter;
};

export const QuickReadsView = ({
    posts,
    selectedFilter,
    selectedSeries,
    isFocusMode = false
}: QuickReadsViewProps): JSX.Element => {
    const areas = quickReadAreas(posts);
    const topics = quickReadTopics(posts);
    const series = quickReadSeries(posts);
    const visiblePosts = visibleQuickReads(posts, selectedFilter, selectedSeries);
    const exitHref = quickReadsPath({
        hash: 'quick-explorer'
    });
    const focusHref = quickReadsPath({
        filter: selectedSeries ? undefined : selectedFilter,
        series: selectedSeries,
        focus: true,
        hash: 'quick-reads-feed'
    });
    const knownFilter =
        selectedFilter === 'All' ||
        areas.includes(selectedFilter) ||
        topics.includes(selectedFilter);
    const knownSeries = !selectedSeries || series.some((group) => group.name === selectedSeries);
    const emptyLabel = !knownSeries
        ? `No series named “${selectedSeries}”.`
        : !knownFilter
        ? `No quick reads match “${selectedFilter}”.`
        : 'Nothing is published in this stream yet.';

    useEffect(() => {
        if (!isFocusMode) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isFocusMode]);

    return (
        <Wrapper classes={`normal-case ${isFocusMode ? '!p-0' : ''}`}>
            <SEO
                title="Quick reads | Rahul S Beelur"
                description="Short ideas on building useful, reliable AI products and systems."
                path="/quick-reads"
            />
            <main
                className={`mx-auto max-w-[1180px] ${
                    isFocusMode ? 'quick-focus-main' : 'pt-32 pb-20 mobile:pt-20'
                }`}>
                {isFocusMode && (
                    <div className="quick-focus-bar">
                        <p>{streamLabel(selectedFilter, selectedSeries)}</p>
                    </div>
                )}
                {!isFocusMode && (
                    <header className="max-w-3xl">
                        <nav aria-label="Breadcrumb" className="breadcrumb">
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <span>Quick reads</span>
                        </nav>
                        <p className="eyebrow">Under 60 seconds</p>
                        <h1 className="display-title mt-4">
                            Small ideas for building in the age of AI.
                        </h1>
                        <p className="lead-copy mt-5">
                            A fast-moving feed of observations, patterns, and lessons. Each one is
                            designed to be useful before your next coffee cools.
                        </p>
                    </header>
                )}
                {!isFocusMode && (
                    <>
                        {series.length > 0 && (
                            <section className="mt-10" aria-label="Quick read series">
                                <p className="eyebrow">Series</p>
                                <div className="series-grid mt-4">
                                    {series.map((group) => {
                                        const cardCount = Math.min(group.posts.length, 4);
                                        return (
                                            <Link
                                                key={group.name}
                                                href={quickReadsPath({
                                                    series: group.name,
                                                    focus: true,
                                                    hash: 'quick-reads-feed'
                                                })}
                                                className={`series-card series-card--${cardCount}`}>
                                                <span>{group.posts.length} parts · focused stream</span>
                                                <h2>{group.name}</h2>
                                                <p>
                                                    {group.posts
                                                        .map((post) => post.frontmatter.title)
                                                        .join(' · ')}
                                                </p>
                                                <b>Read the series →</b>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                        <details className="quick-explorer mt-10" id="quick-explorer">
                            <summary>
                                <span>Explore</span>
                                <b>{streamLabel(selectedFilter, selectedSeries)}</b>
                            </summary>
                            <div className="quick-filters">
                                <div>
                                    <p>Areas</p>
                                    {['All', ...areas].map((filter) => (
                                        <Link
                                            key={filter}
                                            href={quickReadsPath({
                                                filter,
                                                hash: 'quick-explorer'
                                            })}
                                            className={
                                                selectedFilter === filter && !selectedSeries
                                                    ? 'active'
                                                    : ''
                                            }>
                                            {filter}
                                        </Link>
                                    ))}
                                </div>
                                <div>
                                    <p>Topics</p>
                                    {topics.map((filter) => (
                                        <Link
                                            key={filter}
                                            href={quickReadsPath({
                                                filter,
                                                hash: 'quick-explorer'
                                            })}
                                            className={
                                                selectedFilter === filter && !selectedSeries
                                                    ? 'active'
                                                    : ''
                                            }>
                                            {filter}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </details>
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                            <p className="font-robotoMono text-xs uppercase tracking-[0.12em] text-muted">
                                Scroll, swipe, or use ↓ ↑ to move through the feed
                            </p>
                            <Link href={focusHref} className="focus-button">
                                Enter focus
                            </Link>
                        </div>
                    </>
                )}
                <QuickReadFeed
                    posts={visiblePosts}
                    isFocusMode={isFocusMode}
                    exitHref={exitHref}
                    emptyLabel={emptyLabel}
                    activeFilter={selectedFilter}
                    activeSeries={selectedSeries}
                />
            </main>
        </Wrapper>
    );
};
