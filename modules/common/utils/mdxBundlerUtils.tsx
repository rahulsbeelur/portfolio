import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { MDXLayouts } from '../layouts/MDXLayouts';

interface MDXSectionProps {
    code: string;
    layout: string;
}

const MDXSection = ({ code, layout }: MDXSectionProps): JSX.Element => {
    const Component = useMemo(() => getMDXComponent(code), [code]);
    const layouts: Record<string, typeof MDXLayouts.DefaultLayout | undefined> = MDXLayouts;
    const selectedLayout = layouts[layout] ?? MDXLayouts.DefaultLayout;

    return <Component components={{ ...MDXLayouts.DefaultLayout, ...selectedLayout }} />;
};

export const renderMDSection = (code: string, layout: string): JSX.Element => (
    <MDXSection code={code} layout={layout} />
);
