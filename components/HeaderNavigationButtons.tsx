import Link from 'next/link';
import { useRouter } from 'next/router';

export const navigationWithBlog = [
    { name: 'About Me', href: '/' },
    { name: 'Resume', href: '/resume' },
    // { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
];

export const navigationWithoutBlog = [
    { name: 'About Me', href: '/' },
    { name: 'Resume', href: '/resume' },
    // { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
];

const isNavigationButtonActive = (pathname: string, href: string): boolean => {
    return pathname === href;
};

export const HeaderNavigationButtons = ({
    setOpenMenu
}: {
    setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    const { pathname } = useRouter();
    const navigationHeader =
        process.env.NEXT_PUBLIC_BLOG_PAGE_PRESENT === 'on'
            ? [...navigationWithBlog]
            : [...navigationWithoutBlog];
    return (
        <>
            {navigationHeader.map((item) => (
                <div
                    key={item.name}
                    onClick={(): void => {
                        if (setOpenMenu) {
                            setOpenMenu(false);
                        }
                    }}>
                    <Link
                        className={`sub-headline2 tablet:sub-headline3 mobile:h5 mobile:!text-[20px] !uppercase mt-auto desktop:!leading-[52px] ${
                            isNavigationButtonActive(pathname, item.href)
                                ? 'dark:text-neutral-white-light'
                                : 'text-neutral-black-lighter dark:text-neutral-black-default'
                        }
                       `}
                        aria-label={item.name}
                        href={item.href}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </>
    );
};
