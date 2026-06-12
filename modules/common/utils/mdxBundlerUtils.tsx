import { getMDXComponent } from 'mdx-bundler/client';
import { FunctionComponent, useMemo, ComponentProps } from 'react';
import { MDXLayouts } from '../layouts/MDXLayouts';

type MDXContentProps = ComponentProps<ReturnType<typeof getMDXComponent>>;

export const renderMDSection = (code: string, layout: string, memoize = true): JSX.Element => {
    let Component: FunctionComponent<MDXContentProps>;
    if (memoize) {
        Component = useMemo(() => getMDXComponent(code), [code]);
    } else {
        Component = getMDXComponent(code);
    }
    return <Component components={{ ...MDXLayouts.DefaultLayout, ...MDXLayouts[layout] }} />;
};
