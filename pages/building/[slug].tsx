import fs from 'fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Wrapper } from '../../modules/common/components/Wrapper';
import { SEO } from '../../modules/common/components/SEO';
import { renderMDSection } from '../../modules/common/utils/mdxBundlerUtils';
import { getMDData } from '../../modules/common/utils/mdxUtils';
import { MdxPaths } from '../../constant/paths';
import { loadBuildProjects } from '../../modules/building/loadBuilding';
import { getProject } from '../../modules/building/utils';
import { BuildProject, BuildUpdate, BuildUpdateDocument } from '../../modules/building/types';
import { formatBuildDate, statusLabel } from '../../modules/building/components/BuildUpdateCard';

interface BuildEntryPageProps {
    update: BuildUpdateDocument;
    project: BuildProject | null;
}

const BuildEntryPage = ({ update, project }: BuildEntryPageProps): JSX.Element => {
    const { frontmatter } = update;
    return (
        <Wrapper classes="normal-case !max-w-[980px]">
            <SEO
                title={`${frontmatter.title} | Build log`}
                description={frontmatter.summary}
                path={`/building/${update.slug}`}
            />
            <main className="pb-20 pt-32 mobile:pt-24">
                <nav aria-label="Breadcrumb" className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/building">Build log</Link>
                    <span>/</span>
                    <span>Entry</span>
                </nav>

                <article className="build-detail">
                    <header>
                        <p className="page-file">build-log.md</p>
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <p className="font-robotoMono text-xs text-muted">
                                {project?.name ?? frontmatter.project} ·{' '}
                                {formatBuildDate(frontmatter.publishedAt)}
                            </p>
                            <span className={`status-pill status-pill--${frontmatter.status}`}>
                                {statusLabel(frontmatter.status)}
                            </span>
                        </div>
                        <h1>{frontmatter.title}</h1>
                        <p className="build-detail__summary">{frontmatter.summary}</p>
                        <div className="build-detail__metrics">
                            <div>
                                <span>TIME INVESTED</span>
                                <strong>{frontmatter.timeSpent}</strong>
                            </div>
                            <div>
                                <span>PROJECT PROGRESS</span>
                                <strong>{frontmatter.progress}%</strong>
                            </div>
                            <div>
                                <span>STATUS</span>
                                <strong>{statusLabel(frontmatter.status)}</strong>
                            </div>
                        </div>
                    </header>

                    <div className="build-detail__layout">
                        <div className="prose-content build-detail__prose">
                            {renderMDSection(update.code, 'DefaultLayout')}
                        </div>
                        <aside>
                            <div className="shipped-card">
                                <p>COMPLETED IN THIS UPDATE</p>
                                <ul>
                                    {frontmatter.shipped.map((item) => (
                                        <li key={item}>
                                            <span aria-hidden="true">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {frontmatter.next && (
                                <div className="next-card">
                                    <p>NEXT STEP</p>
                                    <strong>{frontmatter.next}</strong>
                                </div>
                            )}
                            {frontmatter.tags && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {frontmatter.tags.map((tag) => (
                                        <span key={tag} className="warm-chip">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </aside>
                    </div>
                </article>

                <div className="mt-12 border-t dev-divider pt-8">
                    <Link href="/building" className="text-link">
                        ← Back to every build entry
                    </Link>
                </div>
            </main>
        </Wrapper>
    );
};

export default BuildEntryPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const files = fs.existsSync(MdxPaths.Building)
        ? fs.readdirSync(MdxPaths.Building).filter((file) => file.endsWith('.mdx'))
        : [];
    return {
        paths: files.map((file) => ({ params: { slug: file.replace(/\.mdx$/, '') } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<BuildEntryPageProps> = async ({ params }) => {
    const slug = String(params?.slug);
    const { code, frontmatter } = await getMDData<BuildUpdate>(`${MdxPaths.Building}/${slug}.mdx`);
    const projects = loadBuildProjects();
    return {
        props: {
            update: { code, frontmatter, slug },
            project: getProject(projects, frontmatter.project) ?? null
        }
    };
};
