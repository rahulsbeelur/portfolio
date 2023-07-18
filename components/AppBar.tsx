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
                <div className="flex desktop:flex-row desktop:gap-3 gap-0 flex-col">
                    <div className="flex flex-row gap-3">
                        <div className="mt-auto mb-auto desktop:w-5 desktop:h-5 w-4 h-4 bg-primary-background-color dark:bg-neutral-black-light"></div>
                        <p className="desktop:h4 tablet:h5 h6 font-[700] mt-auto mb-auto whitespace-nowrap text-neutral-black-dark dark:text-neutral-white-light">
                            {personDetails.name}
                        </p>
                    </div>
                    <p className="desktop:sub-headline2 sub-headline3 !font-[400] desktop:mt-auto desktop:!leading-[50px] whitespace-nowrap tablet:hidden mobile:hidden">
                        /
                    </p>
                    <p className="desktop:sub-headline2 tablet:sub-headline3 mobile:sub-headline4 !font-[400] desktop:mt-auto desktop:!leading-[50px] !uppercase !tracking-1.5px whitespace-nowrap text-neutral-black-dark dark:text-neutral-white-light">
                        {personDetails.designation}
                    </p>
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
        <div className="sticky top-0 z-max bg-white dark:bg-neutral-black-darker">
            <Wrapper>
                <div className="flex mobile:flex-row">
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

                                <div className="flex flex-row justify-end dark:text-neutral-white-lighter">
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
                            <Wrapper classes="mobile:mt-10">
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
