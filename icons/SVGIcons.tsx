import React from 'react';
import { LinkedIn } from './LinkedIn';
import { Twitter } from './Twitter';
import { CopyRights } from './CopyRights';
import { Download } from './Download';
import { Github } from './Github';

export type IconType = 'linked-in' | 'twitter' | 'git-hub' | 'copy-rights' | 'download';

export interface IconProps {
    type: IconType;
    height?: number;
    width?: number;
    className?: string;
}

export const SVGIcons = ({
    type,
    height,
    width,
    className = ''
}: IconProps): React.ReactElement<React.SVGProps<SVGSVGElement>> => {
    const iconHeight = height ?? 24;
    const iconWidth = width ?? 24;

    switch (type) {
        case 'twitter':
            return <Twitter height={iconHeight} width={iconWidth} className={className} />;
        case 'linked-in':
            return <LinkedIn height={iconHeight} width={iconWidth} className={className} />;
        case 'git-hub':
            return <Github height={iconHeight} width={iconWidth} className={className} />;
        case 'copy-rights':
            return <CopyRights height={iconHeight} width={iconWidth} className={className} />;
        case 'download':
            return <Download height={iconHeight} width={iconWidth} className={className} />;
    }
    return <div></div>;
};
