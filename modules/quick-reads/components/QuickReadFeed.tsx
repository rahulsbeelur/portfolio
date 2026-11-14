import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { renderMDSection } from '../../common/utils/mdxBundlerUtils';
import { QuickReadPost, quickReadsPath } from '../content';

interface QuickReadFeedProps {
    posts: QuickReadPost[];
    isFocusMode: boolean;
    exitHref: string;
    emptyLabel: string;
}

const returnHref = (
    post: QuickReadPost,
    isFocusMode: boolean,
    activeFilter: string,
    activeSeries?: string
): string => {
    const origin = quickReadsPath({
        filter: activeSeries ? undefined : activeFilter,
        series: activeSeries,
        focus: isFocusMode,
        hash: 'quick-reads-feed'
    });
    return `${post.frontmatter.relatedHref}?from=quick-reads&return=${encodeURIComponent(origin)}`;
};

const cardFocusHref = (post: QuickReadPost, activeFilter: string, activeSeries?: string): string =>
    quickReadsPath({
        filter: activeSeries ? undefined : activeFilter,
        series: activeSeries,
        focus: true,
        hash: 'quick-reads-feed'
    });

export const QuickReadFeed = ({
    posts,
    isFocusMode,
    exitHref,
    emptyLabel,
    activeFilter,
    activeSeries
}: QuickReadFeedProps & { activeFilter: string; activeSeries?: string }): JSX.Element => {
    const feedRef = useRef<HTMLElement>(null);
    const router = useRouter();
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent): void => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent): void => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (): void => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diff) < minSwipeDistance) return;

        const feed = feedRef.current;
        if (!feed) return;
        const cards = Array.from(feed.querySelectorAll<HTMLElement>('article'));
        if (cards.length === 0) return;

        const direction = diff > 0 ? 1 : -1;
        const feedLeft = feed.getBoundingClientRect().left;
        const current = cards.findIndex(
            (card) => card.getBoundingClientRect().left >= feedLeft - 8
        );
        const index = current < 0 ? 0 : current;
        const next = Math.min(cards.length - 1, Math.max(0, index + direction));
        const card = cards[next];
        const left = card.getBoundingClientRect().left - feedLeft + feed.scrollLeft;
        feed.scrollTo({
            left,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth'
        });
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent): void => {
            const target = event.target;
            if (
                target instanceof HTMLElement &&
                (target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.isContentEditable)
            ) {
                return;
            }
            if (event.key === 'Escape' && isFocusMode) {
                event.preventDefault();
                void router.push(exitHref);
                return;
            }
            const direction =
                event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === 'j'
                    ? 1
                    : event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'k'
                    ? -1
                    : 0;
            if (direction === 0) return;

            const feed = feedRef.current;
            if (!feed) return;
            const cards = Array.from(feed.querySelectorAll<HTMLElement>('article'));
            if (cards.length === 0) return;

            event.preventDefault();
            const feedTop = feed.getBoundingClientRect().top;
            const current = cards.findIndex(
                (card) => card.getBoundingClientRect().top >= feedTop - 8
            );
            const index = current < 0 ? cards.length - 1 : current;
            const next = Math.min(cards.length - 1, Math.max(0, index + direction));
            const card = cards[next];
            const top = card.getBoundingClientRect().top - feedTop + feed.scrollTop;
            feed.scrollTo({
                top,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            });
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [exitHref, isFocusMode, router]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const hash = window.location.hash;
        if (hash === '#quick-explorer' || hash === '#quick-reads-feed') {
            const targetId = hash === '#quick-explorer' ? 'quick-explorer' : 'quick-reads-feed';
            const target = document.getElementById(targetId);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const feed = feedRef.current;
        if (!feed) return;

        const handleScroll = (): void => {
            const cards = Array.from(feed.querySelectorAll<HTMLElement>('article'));
            if (cards.length === 0) return;
            const feedLeft = feed.getBoundingClientRect().left;
            const current = cards.findIndex(
                (card) => card.getBoundingClientRect().left >= feedLeft - 8
            );
            setCurrentIndex(current < 0 ? 0 : current);
        };

        feed.addEventListener('scroll', handleScroll);
        return () => feed.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToIndex = (index: number): void => {
        const feed = feedRef.current;
        if (!feed) return;
        const cards = Array.from(feed.querySelectorAll<HTMLElement>('article'));
        if (cards.length === 0) return;
        const card = cards[Math.min(index, cards.length - 1)];
        const feedLeft = feed.getBoundingClientRect().left;
        const left = card.getBoundingClientRect().left - feedLeft + feed.scrollLeft;
        feed.scrollTo({
            left,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth'
        });
    };

    return (
        <section
            ref={feedRef}
            id="quick-reads-feed"
            className={`quick-feed ${isFocusMode ? 'quick-feed--focus' : 'mt-6'}`}
            aria-label="Quick reads"
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {posts.length === 0 ? (
                <div className="quick-empty">
                    <p>{emptyLabel}</p>
                    <Link
                        href={
                            isFocusMode
                                ? '/quick-reads/focus#quick-reads-feed'
                                : '/quick-reads#quick-reads-feed'
                        }>
                        Show all quick reads
                    </Link>
                </div>
            ) : (
                <>
                    <div className="quick-swipe-hint mobile-only">
                        <span>←</span>
                        <span>Swipe to navigate</span>
                        <span>→</span>
                    </div>
                    {posts.map((post, index) => (
                        <article
                            key={post.slug}
                            className={`quick-card quick-card--${post.frontmatter.accent ?? 'blue'}`}>
                            <div className="flex items-center justify-between gap-4 font-robotoMono text-xs uppercase tracking-[0.13em] text-foreground/60">
                                <span>
                                    {String(index + 1).padStart(2, '0')} /{' '}
                                    {String(posts.length).padStart(2, '0')}
                                </span>
                                {isFocusMode ? (
                                    <Link href={exitHref} className="quick-exit">
                                        Exit focus
                                    </Link>
                                ) : (
                                    <span>{post.frontmatter.area}</span>
                                )}
                            </div>
                            <div className="my-auto py-10">
                                <div className="mb-5 flex flex-wrap gap-2">
                                    {post.frontmatter.topics.map((topic) => (
                                        <span key={topic} className="quick-topic">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                <h2>{post.frontmatter.title}</h2>
                                <p className="mt-5 text-[18px] leading-8 text-foreground/75">
                                    {post.frontmatter.summary}
                                </p>
                                <div className="quick-copy">
                                    {renderMDSection(post.code, 'DefaultLayout')}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-current/15 pt-5 font-robotoMono text-xs text-foreground/60">
                                <span>{post.readingTime}</span>
                                <div className="flex flex-wrap items-center gap-4">
                                    {!isFocusMode && (
                                        <Link href={cardFocusHref(post, activeFilter, activeSeries)} className="hover:text-foreground">
                                            Enter focus ↗
                                        </Link>
                                    )}
                                    {post.frontmatter.relatedHref && (
                                        <Link
                                            href={returnHref(
                                                post,
                                                isFocusMode,
                                                activeFilter,
                                                activeSeries
                                            )}
                                            className="hover:text-foreground">
                                            Deep dive ↗
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                    <div className="quick-dots">
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                className={`quick-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => scrollToIndex(index)}
                                aria-label={`Go to quick read ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};
