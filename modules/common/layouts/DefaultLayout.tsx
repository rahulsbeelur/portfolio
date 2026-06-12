import { MDXComponents } from 'mdx/types';

export const DefaultLayout: MDXComponents = {
    h1: (props): JSX.Element => (
        <h1 className="desktop:h3 h5 text-foreground" {...props} />
    ),
    h2: (props): JSX.Element => (
        <h2 className="desktop:sub-headline2 desktop:mt-6 sub-headline3 text-foreground mt-4" {...props} />
    ),
    p: (props): JSX.Element => (
        <p className="desktop:body1 text-foreground flex body2 whitespace-pre-line desktop:mt-4 mt-2" {...props} />
    ),
    ul: (props): JSX.Element => (
        <ul {...props} className="desktop:mt-4 flex flex-col gap-2 desktop:gap-4 mt-2" />
    ),
    li: (props): JSX.Element => (
        <li className="desktop:body1 text-foreground body2 listStyleImage" {...props} />
    ),
    strong: (props): JSX.Element => (
        <strong className="desktop:small1 text-foreground small2" {...props} />
    )
};
