import React, { useEffect, useState } from 'react';
import { Wrapper } from '../modules/common/components/Wrapper';
import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { HeaderNavigationButtons } from './HeaderNavigationButtons';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Theme } from '../context/ThemeProvider';
import { personDetails } from '../modules/common/data/person';

export const AppBar = (): JSX.Element => {
    const [isOpen, setOpen] = useState(false);
    const [showTabletNav, setShowTabletNav] = useState(false);

    const NameBanner = (): JSX.Element => {
        return (
            <Link href="/">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border dev-divider bg-surface font-robotoMono text-sm text-accent">
                        RB
                    </div>
                    <div className="flex flex-col">
                        <p className="desktop:h5 whitespace-nowrap text-[18px] font-[700] leading-6 text-foreground">
                            {personDetails.name}
                        </p>
                        <p className="font-robotoMono text-xs text-muted">
                            {personDetails.designation}
                        </p>
                    </div>
                </div>
            </Link>
        );
    };

    const handleHamburgerClick = (): void => {
        setOpen(!isOpen);
        if (!isOpen) {
            setShowTabletNav(false);
            setTimeout(() => {
                setShowTabletNav(true);
            }, 200);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.querySelector('body')?.classList.add('overflow-hidden');
        } else {
            document.querySelector('body')?.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <div className="fixed z-[999] w-full top-0 z-max bg-transparent pt-3 backdrop-blur-sm">
            <Wrapper>
                <div className="flex mobile:flex-row rounded-2xl border dev-divider p-3 shadow-[var(--shadow)] backdrop-blur-xl bg-[var(--nav-bg)]">
                    <div
                        className={`flex flex-row justify-between w-full ${
                            isOpen ? 'hidden' : ''
                        }`}>
                        {NameBanner()}
                        <div className="flex flex-row gap-3 mt-auto mobile:hidden">
                            <div className="m-auto">
                                <ThemeSwitcher />
                            </div>
                            <HeaderNavigationButtons />
                        </div>
                    </div>
                    <div className="sticky top-0 w-full desktop:hidden tablet:hidden">
                        <div className="flex flex-row justify-end">
                            <div
                                className={`flex flex-row  w-full ${
                                    isOpen ? 'justify-between' : 'justify-end'
                                }`}>
                                <div
                                    className={`desktop:hidden tablet:hidden ${
                                        isOpen ? '' : 'hidden'
                                    }`}>
                                    {NameBanner()}
                                </div>

                                <div className="flex flex-row justify-end">
                                    <div className="mt-auto mb-auto mr-2">
                                        <ThemeSwitcher />
                                    </div>
                                    <Hamburger
                                        toggled={isOpen}
                                        toggle={handleHamburgerClick}
                                        size={24}
                                        duration={0.6}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`relative flex w-full top-0 h-[100vh]  ${
                                isOpen ? 'slide' : 'slide-out !h-0'
                            }  ${Theme.Light} dark:${Theme.Dark} desktop:hidden`}>
                            <Wrapper>
                                <aside
                                    className={`relative w-full flex flex-col top-0 items-center gap-2 py-0 px-4 desktop:hidden ${
                                        isOpen ? '' : 'hidden'
                                    }`}>
                                    {showTabletNav && (
                                        <HeaderNavigationButtons setOpenMenu={setOpen} />
                                    )}
                                </aside>
                            </Wrapper>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};
