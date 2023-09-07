import React from 'react';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SocialHandles } from '../modules/common/components/SocialHandles';
import { personDetails } from '../modules/common/data/person';
import Link from 'next/link';

export const Footer = (): JSX.Element => {
    return (
        <div className="mobile:hidden">
            <div className="border-t-[1px] border-neutral-black-dark dark:border-neutral-black-light max-w-[2560px] mx-auto"></div>
            <Wrapper>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 w-fit">
                        <p className="sub-headline3 tablet:sub-headline2 desktop:sub-headline1 mobile:mx-0 flex justify-center">
                            Get In Touch
                        </p>
                        <div className="flex gap-6">
                            <SocialHandles />
                        </div>
                    </div>
                    <div className="mt-auto h7 tablet:small4 !leading-[44px] mobile:mx-auto mobile:body3 mb-[-30px]">
                        &copy; 2023 {personDetails.name}. All rights reserved.
                    </div>
                    <Link
                        href={`mailto:srahulbeelur@gmail.com?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="mail">
                        <p className="sub-headline3 tablet:sub-headline2 desktop:sub-headline1 mobile:mx-0 flex desktop:justify-center tablet:justify-center">
                            Write
                        </p>
                        <p className="mobile:body1 h7 mt-auto desktop:!leading-[44px] tablet:!leading-[44px]">
                            {personDetails.mailId}
                        </p>
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};
