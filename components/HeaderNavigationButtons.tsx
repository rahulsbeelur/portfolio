import Link from 'next/link';
import { useRouter } from 'next/router';

export const navigationWithBlog = [
    { name: 'Home', href: '/' },
    { name: 'Build log', href: '/building' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' }
];

export const navigationWithoutBlog = [
    { name: 'Home', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' }
];

const isNavigationButtonActive = (pathname: string, href: string): boolean => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
};

export const HeaderNavigationButtons = ({
    setOpenMenu,
    isMenu = false
}: {
    setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
    isMenu?: boolean;
}): JSX.Element => {
    const { pathname } = useRouter();
    const navigationHeader = [...navigationWithBlog];
    return (
        <div
            className={`flex text-center ${
                isMenu ? 'flex-col gap-3' : 'gap-3 mobile:mt-10 mobile:flex-col mobile:gap-5'
            }`}>
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
                            isMenu ? 'w-full !justify-between !rounded-xl !px-5 !py-4' : ''
                        } ${isNavigationButtonActive(pathname, item.href) ? 'active' : ''}
                       `}
                        aria-label={item.name}
                        href={item.href}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};
