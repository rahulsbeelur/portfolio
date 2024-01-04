import { MDXComponents } from 'mdx/types';

export const AboutMeIntroductionLayout: MDXComponents = {
    h1: (props): JSX.Element => (
        <h1
            className="desktop:h1 h3 text-neutral-black-dark dark:text-neutral-white-light mobile:text-neutral-black-dark "
            {...props}
        />
    ),
    h2: (props): JSX.Element => (
        <h2
            className="desktop:h6 sub-headline3 normal-case  desktop:mt-6 text-neutral-black-dark dark:text-neutral-white-light mobile:text-neutral-black-dark "
            {...props}
        />
    ),
    p: (props): JSX.Element => (
        <p
            className="desktop:body1 body2 text-neutral-black-default flex dark:text-neutral-white-darker mobile:text-neutral-black-dark  mt-4"
            {...props}
        />
    ),
    ul: (props): JSX.Element => (
        <ul {...props} className="desktop:mt-4 flex flex-col gap-2 desktop:gap-4 mt-2" />
    ),
    li: (props): JSX.Element => (
        <li
            className="desktop:body1 text-neutral-black-default dark:text-neutral-white-darker body2 listStyleImage"
            {...props}
        />
    )
};
