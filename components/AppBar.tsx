import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react';
import { Wrapper } from '../modules/common/components/Wrapper';
import { HeaderNavigationButtons } from './HeaderNavigationButtons';
import { ThemeSwitcher } from './ThemeSwitcher';
import { personDetails } from '../modules/common/data/person';

export const AppBar = (): JSX.Element => {
    const [isOpen, setOpen] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isOpen);
        const closeOnEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isOpen]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="fixed top-0 z-[999] w-full bg-transparent pt-2">
            <Wrapper classes="!max-w-[1440px] !py-0">
                <nav className="relative z-[1000] flex items-center justify-between rounded-2xl border dev-divider bg-[var(--nav-bg)] p-3 shadow-[var(--shadow)] backdrop-blur-xl">
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-3"
                        onClick={(): void => setOpen(false)}>
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border dev-divider bg-surface font-robotoMono text-sm text-accent">
                            RB
                        </span>
                        <span className="flex min-w-0 flex-col">
                            <strong className="truncate text-[17px] font-[700] leading-6 text-foreground">
                                {personDetails.name}
                            </strong>
                            <span className="truncate font-robotoMono text-[10px] text-muted">
                                BACKEND · AI · SYSTEMS
                            </span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-3 desktop:flex">
                        <ThemeSwitcher />
                        <HeaderNavigationButtons />
                    </div>

                    <div className="flex items-center gap-1 desktop:hidden">
                        <ThemeSwitcher />
                        <Hamburger
                            toggled={isOpen}
                            toggle={setOpen}
                            size={22}
                            duration={0.35}
                            label={isOpen ? 'Close navigation' : 'Open navigation'}
                        />
                    </div>
                </nav>
            </Wrapper>

            <div
                className={`mobile-menu-panel desktop:hidden ${isOpen ? 'is-open' : ''}`}
                aria-hidden={!isOpen}>
                <Wrapper classes="!max-w-[1440px] !pt-24">
                    <div className="mx-auto max-w-xl">
                        <p className="eyebrow mb-6">Navigate the work</p>
                        <HeaderNavigationButtons setOpenMenu={setOpen} isMenu />
                        <p className="mt-10 border-t dev-divider pt-6 text-sm leading-6 text-muted">
                            Building dependable backend and AI systems—and sharing what I learn on
                            the way.
                        </p>
                    </div>
                </Wrapper>
            </div>
        </header>
    );
};
