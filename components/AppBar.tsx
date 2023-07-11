import React, { useEffect, useState } from 'react';
import { Wrapper } from '../modules/common/components/Wrapper';
import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { HeaderNavigationButtons } from './HeaderNavigationButtons';

export const AppBar = (): JSX.Element => {
    const [isOpen, setOpen] = useState(false);
    const NameBanner = (): JSX.Element => {
        return (
            <Link href="/">
                <div className="flex desktop:flex-row desktop:gap-3 gap-0 flex-col">
                    <div className="flex flex-row gap-3">
                        <div className="mt-auto mb-auto desktop:w-5 desktop:h-5 w-4 h-4 bg-neutral-black-default"></div>
                        <p className="desktop:h4 tablet:h5 h6 font-[700] mt-auto mb-auto whitespace-nowrap">
                            Rahul S Beelur
                        </p>
                    </div>
                    <p className="desktop:sub-headline2 sub-headline3 !font-[400] desktop:mt-auto desktop:!leading-[50px] whitespace-nowrap tablet:hidden mobile:hidden">
                        /
                    </p>
                    <p className="desktop:sub-headline2 tablet:sub-headline3 mobile:sub-headline4 !font-[400] desktop:mt-auto desktop:!leading-[50px] !uppercase !tracking-1.5px whitespace-nowrap">
                        Software Developer
                    </p>
                </div>
            </Link>
        );
    };

    useEffect(() => {
        if (isOpen) {
            document.querySelector('body')?.classList.add('overflow-hidden');
        } else {
            document.querySelector('body')?.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <Wrapper>
            <div className="flex mobile:flex-row">
                <div className={`flex flex-row justify-between w-full ${isOpen ? 'hidden' : ''}`}>
                    {NameBanner()}
                    <div className="flex flex-row gap-3 mt-auto mobile:hidden">
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
                                <Hamburger
                                    toggled={isOpen}
                                    toggle={setOpen}
                                    size={24}
                                    duration={0.6}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`relative flex w-full top-0 h-[100vh] ${
                            isOpen ? 'slide' : 'slide-out !h-0'
                        }  bg-white dark:bg-neutral-black-darker desktop:hidden`}>
                        <Wrapper classes="mobile:mt-10">
                            <aside
                                className={`relative w-full flex flex-col top-0 items-center gap-2 py-0 px-4 desktop:hidden ${
                                    isOpen ? '' : 'hidden'
                                }`}>
                                <HeaderNavigationButtons setOpenMenu={setOpen} />
                            </aside>
                        </Wrapper>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
