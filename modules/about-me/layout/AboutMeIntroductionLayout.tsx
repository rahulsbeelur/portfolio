import { MDXComponents } from 'mdx/types';

export const AboutMeIntroductionLayout: MDXComponents = {
    h1: (props): JSX.Element => (
        <h1 className="desktop:h1 h3 text-foreground" {...props} />
    ),
    h2: (props): JSX.Element => (
        <h2 className="desktop:h6 sub-headline3 normal-case  desktop:mt-6 text-foreground" {...props} />
    ),
    p: (props): JSX.Element => (
        <p className="desktop:body1 body2 text-foreground  mt-4" {...props} />
    ),
    ul: (props): JSX.Element => (
        <ul {...props} className="desktop:mt-4 flex flex-col gap-2 desktop:gap-4 mt-2" />
    ),
    li: (props): JSX.Element => (
        <li className="desktop:body1 text-foreground body2 listStyleImage" {...props} />
    )
};
