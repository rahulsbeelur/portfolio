import { useEffect, useState } from 'react';
import { Button } from '../modules/common/components/Button';

export const ScrollDown = (): JSX.Element => {
    const [showScrollDown, setScrollDown] = useState(true);
    useEffect(() => {
        window.addEventListener('scroll', showButtonOnScroll);
        return () => {
            window.removeEventListener('scroll', showButtonOnScroll);
        };
    }, []);

    const showButtonOnScroll = (): void => {
        console.log(window.innerHeight, window.scrollY);
        console.log(document.body.scrollHeight);
        if (window.innerHeight + window.scrollY - 100 < document.body.scrollHeight) {
            setScrollDown(true);
        } else {
            setScrollDown(false);
        }
    };

    const scrollDown = (): void => {
        window.scrollBy(0, 500);
    };

    return (
        <>
            {showScrollDown && (
                <div className="fixed right-4 z-max bottom-5 opacity-50">
                    <Button
                        icon={{
                            src: 'up-arrow',
                            width: 12,
                            height: 12,
                            className:
                                'text-neutral-black-default dark:text-neutral-black-darker rotate-180',
                            position: 'left'
                        }}
                        classes="bg-primary-background-color hover:bg-primary-background-color-darker dark:bg-neutral-black-light hover:dark:bg-neutral-black-default p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)]"
                        onClick={scrollDown}
                        ariaLabel="Back to top button"
                    />
                </div>
            )}
        </>
    );
};
