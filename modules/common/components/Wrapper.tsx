import React, { ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
    classes?: string;
}

export const Wrapper = ({ children, classes }: WrapperProps): JSX.Element => {
    return (
        <div
            className={`mx-auto w-full max-w-[2560px] desktop:p-10 px-4 py-6 tablet:p-8 text-neutral-black-dark dark:text-neutral-black-lighter ${classes}`}>
            {children}
        </div>
    );
};
