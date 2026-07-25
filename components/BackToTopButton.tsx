import { useEffect, useState } from 'react';
import { Button } from '../modules/common/components/Button';

export const BackToTopButton = (): JSX.Element => {
    const [showBackToTopButton, setShowBackToTopButton] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', showButtonOnScroll);
        return () => {
            window.removeEventListener('scroll', showButtonOnScroll);
        };
    }, []);

    const showButtonOnScroll = (): void => {
        if (window.scrollY > 10) {
            setShowBackToTopButton(true);
        } else {
            setShowBackToTopButton(false);
        }
    };

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showBackToTopButton && (
                <div className="fixed right-5 bottom-6 z-[10000]">
                    <Button
                        icon={{
                            src: 'up-arrow',
                            width: 14,
                            height: 14,
                            className: 'text-foreground',
                            position: 'left'
                        }}
                        classes="quiet-card rounded-full p-4 shadow-[var(--shadow)] transition hover:border-[var(--accent)]"
                        onClick={scrollToTop}
                        ariaLabel="Back to top button"
                    />
                </div>
            )}
        </>
    );
};
