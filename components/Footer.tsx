import React from 'react';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SocialHandles } from '../modules/common/components/SocialHandles';
import { personDetails } from '../modules/common/data/person';
import Link from 'next/link';

export const Footer = (): JSX.Element => {
    return (
        <Wrapper>
            <div className="flex mobile:flex-col-reverse flex-row justify-between gap-10">
                <div className="mt-auto h7 !leading-[44px] mobile:mx-auto mobile:body4">
                    &copy; 2023 {personDetails.name}. All rights reserved.
                </div>
                <div className="flex mobile:flex-col gap-10 desktop:gap-[100px] flex-row">
                    <div className="flex flex-col gap-1">
                        <p className="sub-headline3 tablet:sub-headline2 desktop:sub-headline1 mx-auto mobile:mx-0">
                            Write
                        </p>
                        <p className="mobile:body1 h7 mt-auto desktop:!leading-[44px] tablet:!leading-[44px]">
                            <Link
                                href={`mailto:srahulbeelur@gmail.com?`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="mail">
                                {personDetails.mailId}
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="sub-headline3 tablet:sub-headline2 desktop:sub-headline1 mx-auto mobile:mx-0">
                            Get In Touch
                        </p>
                        <div className="flex gap-6">
                            <SocialHandles />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
