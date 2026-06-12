import React from 'react';
import { Wrapper } from '../modules/common/components/Wrapper';
import { SocialHandles } from '../modules/common/components/SocialHandles';
import { personDetails } from '../modules/common/data/person';
import Link from 'next/link';

export const Footer = (): JSX.Element => {
    return (
        <div className="mobile:hidden">
            <div className="border-t dev-divider"></div>
            <Wrapper>
                <div className="flex desktop:flex-row flex-col justify-between items-start gap-6 py-10">
                    <div className="space-y-3">
                        <p className="sub-headline3 text-foreground">
                            Let’s build with clarity and confidence.
                        </p>
                        <div className="flex gap-4">
                            <SocialHandles />
                        </div>
                    </div>
                    <div className="space-y-2 text-right">
                        <p className="small2 text-muted">&copy; 2026 {personDetails.name}</p>
                        <Link
                            href={`mailto:srahulbeelur@gmail.com?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="mail"
                            className="text-sm text-accent hover:underline">
                            {personDetails.mailId}
                        </Link>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};
