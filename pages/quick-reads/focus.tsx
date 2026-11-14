import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { QuickReadsView } from '../../modules/quick-reads/components/QuickReadsView';
import { queryValue, QuickReadPost } from '../../modules/quick-reads/content';
import { loadQuickReads } from '../../modules/quick-reads/loadQuickReads';

interface FocusPageProps {
    posts: QuickReadPost[];
}

const FocusPage = ({ posts }: FocusPageProps): JSX.Element => {
    const { query, isReady } = useRouter();
    const selectedSeries = isReady ? queryValue(query.series) : undefined;
    const selectedFilter = isReady ? queryValue(query.filter) ?? 'All' : 'All';

    return (
        <QuickReadsView
            posts={posts}
            selectedFilter={selectedFilter}
            selectedSeries={selectedSeries}
            isFocusMode
        />
    );
};

export default FocusPage;

export const getStaticProps: GetStaticProps<FocusPageProps> = async () => ({
    props: { posts: await loadQuickReads() }
});
