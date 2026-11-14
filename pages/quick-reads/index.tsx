import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { QuickReadsView } from '../../modules/quick-reads/components/QuickReadsView';
import { queryValue, QuickReadPost } from '../../modules/quick-reads/content';
import { loadQuickReads } from '../../modules/quick-reads/loadQuickReads';

export type { QuickRead } from '../../modules/quick-reads/content';

interface QuickReadsPageProps {
    posts: QuickReadPost[];
}

const QuickReadsIndexPage = ({ posts }: QuickReadsPageProps): JSX.Element => {
    const { query, isReady } = useRouter();
    const selectedSeries = isReady ? queryValue(query.series) : undefined;
    const selectedFilter = isReady ? queryValue(query.filter) ?? 'All' : 'All';

    return (
        <QuickReadsView
            posts={posts}
            selectedFilter={selectedFilter}
            selectedSeries={selectedSeries}
        />
    );
};

export default QuickReadsIndexPage;

export const getStaticProps: GetStaticProps<QuickReadsPageProps> = async () => ({
    props: { posts: await loadQuickReads() }
});
