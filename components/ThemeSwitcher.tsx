import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../context/useTheme';
import { Theme } from '../context/ThemeProvider';

export const ThemeSwitcher = (): JSX.Element => {
    const { changeTheme, isDarkTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleDarkMode = (checked: boolean): void => {
        if (checked) {
            changeTheme(Theme.Dark);
        } else {
            changeTheme(Theme.Light);
        }
    };

    if (!isMounted) {
        return <div className="h-6 w-6" aria-hidden="true" />;
    }

    return <DarkModeSwitch checked={isDarkTheme} onChange={toggleDarkMode} size={24} />;
};
