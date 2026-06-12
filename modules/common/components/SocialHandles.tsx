import Link from 'next/link';
import { IconType, SVGIcons } from '../../../icons/SVGIcons';
import { personDetails } from '../data/person';
import React from 'react';

export const socialHandlesList = [
    { name: 'linked-in', link: personDetails.linkedInLink },
    { name: 'twitter', link: personDetails.twitterLink },
    { name: 'git-hub', link: personDetails.githubLink },
    {
        name: 'mail',
        link: `mailto:srahulbeelur@gmail.com?subject=Let's Get In Touch &body= Hi Rahul,`
    }
];

export const SocialHandles = (): JSX.Element => {
    return (
        <>
            {socialHandlesList.map((socialHandle, index) => (
                <React.Fragment key={index}>
                    {
                        <Link
                            href={socialHandle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={socialHandle.name}>
                            <SVGIcons
                                type={socialHandle.name as IconType}
                                width={26}
                                height={26}
                                className="text-neutral-black-default hover:text-neutral-black-darker dark:text-primary-lighter dark:hover:text-primary-light"
                            />
                        </Link>
                    }
                </React.Fragment>
            ))}
        </>
    );
};
