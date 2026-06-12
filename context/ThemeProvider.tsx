import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { setValueToLocalStorage } from './utils';

const themeKey = 'theme';
export enum Theme {
    Dark = 'dark',
    Light = 'light'
}

export enum ThemeColors {
    DarkMode = '#1C1C28',
    LightMode = '#FFFFFF'
}

export interface ThemeContextData {
    changeTheme: (theme: Theme) => void;
    isDarkTheme: boolean;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextData>({
    changeTheme: {} as (theme: Theme) => void,
    isDarkTheme: false
});

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') {
        return Theme.Light;
    }

    const storedTheme = window.localStorage.getItem(themeKey);
    if (storedTheme === Theme.Dark || storedTheme === Theme.Light) {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
};

const applyThemeClass = (theme: Theme): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = theme === Theme.Dark;
    document.documentElement.classList.toggle(Theme.Dark, isDark);
    document.body.classList.toggle(Theme.Dark, isDark);
    document.documentElement.style.colorScheme = isDark ? Theme.Dark : Theme.Light;
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const isDarkTheme = theme === Theme.Dark;

    const changeTheme = (nextTheme: Theme): void => {
        applyThemeClass(nextTheme);
        setValueToLocalStorage(themeKey, nextTheme);
        setTheme(nextTheme);
    };

    useEffect(() => {
        applyThemeClass(theme);
        setValueToLocalStorage(themeKey, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                changeTheme,
                isDarkTheme
            }}>
            {children}
        </ThemeContext.Provider>
    );
};
