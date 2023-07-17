import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../context/useTheme';
import { Theme } from '../context/ThemeProvider';

export const ThemeSwitcher = (): JSX.Element => {
    const { changeTheme, isDarkTheme } = useTheme();

    const toggleDarkMode = (checked: boolean): void => {
        if (checked) {
            changeTheme(Theme.Dark);
        } else {
            changeTheme(Theme.Light);
        }
    };

    return <DarkModeSwitch checked={isDarkTheme} onChange={toggleDarkMode} size={24} />;
};
