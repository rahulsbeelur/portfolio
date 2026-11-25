import type { ReactNode } from 'react';

interface PageHeaderProps {
    fileName: string;
    title: string;
    description: string;
    action?: ReactNode;
}

export const PageHeader = ({
    fileName,
    title,
    description,
    action
}: PageHeaderProps): JSX.Element => (
    <header className="page-header">
        <div>
            <p className="page-file">{fileName}</p>
            <h1>{title}</h1>
        </div>
        <div className="page-header__aside">
            <p>{description}</p>
            {action}
        </div>
    </header>
);
