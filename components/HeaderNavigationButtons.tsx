import Link from 'next/link';
import { useRouter } from 'next/router';

export const navigationWithBlog = [
    { name: 'Profile', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Work', href: '/projects' },
    { name: 'Blog', href: '/blog' }
];

export const navigationWithoutBlog = [
    { name: 'Profile', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Work', href: '/projects' }
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
        <div className="mobile:mt-10 text-center flex mobile:flex-col gap-3 mobile:gap-5">
            {navigationHeader.map((item) => (
                <div
                    key={item.name}
                    onClick={(): void => {
                        if (setOpenMenu) {
                            setOpenMenu(false);
                        }
                    }}>
                    <Link
                        className={`btn-nav ${
                            isNavigationButtonActive(pathname, item.href)
                                ? 'active'
                                : 'opacity-80 hover:opacity-100'
                        }`}
                        aria-label={item.name}
                        href={item.href}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};
