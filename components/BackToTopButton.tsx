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
                <div className="fixed right-4 bottom-20 opacity-50">
                    <Button
                        icon={{
                            src: 'up-arrow',
                            width: 12,
                            height: 12,
                            className: 'text-neutral-black-default dark:text-neutral-black-darker',
                            position: 'left'
                        }}
                        classes="bg-primary-background-color hover:bg-primary-background-color-darker dark:bg-neutral-black-light hover:dark:bg-neutral-black-default p-3 rounded-lg shadow-[0_4px_8px_rgba(28,28,40)]"
                        onClick={scrollToTop}
                        ariaLabel="Back to top button"
                    />
                </div>
            )}
        </>
    );
};
