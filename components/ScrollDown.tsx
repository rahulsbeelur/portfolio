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
                            className: 'text-foreground rotate-180',
                            position: 'left'
                        }}
                        classes="bg-surface border dev-divider hover:text-accent p-3 rounded-lg shadow-[var(--shadow)]"
                        onClick={scrollDown}
                        ariaLabel="Back to top button"
                    />
                </div>
            )}
        </>
    );
};
