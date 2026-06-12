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
                <div className="fixed right-4 z-max bottom-20 opacity-50">
                    <Button
                        icon={{
                            src: 'up-arrow',
                            width: 12,
                            height: 12,
                            className: 'text-foreground',
                            position: 'left'
                        }}
                        classes="bg-surface border dev-divider hover:text-accent p-3 rounded-lg shadow-[var(--shadow)]"
                        onClick={scrollToTop}
                        ariaLabel="Back to top button"
                    />
                </div>
            )}
        </>
    );
};
