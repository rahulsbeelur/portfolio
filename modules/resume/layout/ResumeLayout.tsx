import { MDXComponents } from 'mdx/types';

export const ResumeLayout: MDXComponents = {
    h1: (props): JSX.Element => (
        <h1 className="h6 mobile:text-right text-foreground" {...props} />
    ),
    h2: (props): JSX.Element => (
        <h2 className="desktop:h6 sub-headline3 normal-case desktop:mt-6 text-foreground" {...props} />
    ),
    p: (props): JSX.Element => (
        <p className="desktop:body1 body2 text-foreground flex mobile:mt-4" {...props} />
    ),
    ul: (props): JSX.Element => <ul {...props} className="flex flex-col gap-2 desktop:gap-4" />,
    li: (props): JSX.Element => (
        <li className="desktop:body1 text-foreground body2 list-disc ml-4" {...props} />
    )
};
