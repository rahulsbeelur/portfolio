import React, { ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
    classes?: string;
}

export const Wrapper = ({ children, classes }: WrapperProps): JSX.Element => {
    return (
        <div
            className={`mx-auto w-full max-w-[1440px] desktop:p-20 px-4 py-6 tablet:px-20 tablet:py-16 ${classes}`}>
            {children}
        </div>
    );
};
