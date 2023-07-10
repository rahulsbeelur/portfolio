import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getValueFromLocalStorage, setValueToLocalStorage } from './utils';

const themeKey = 'theme';
export enum Theme {
    Dark = 'dark',
    Light = 'light'
}

export enum ThemeColors {
    DarkMode = '#1C1C28',
    LightMode = '#FFFFFF'
}

const defaultTheme =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.Dark
        : Theme.Light;

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

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const preferedTheme = getValueFromLocalStorage(themeKey, defaultTheme);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = (theme: Theme): void => {
        const bodyClassList = document.querySelector('body')?.classList;
        document.body.style.background =
            theme === Theme.Dark ? ThemeColors.DarkMode : ThemeColors.LightMode;
        if (theme === Theme.Dark) {
            bodyClassList?.add('dark');
            setValueToLocalStorage(themeKey, Theme.Dark);
            setIsDarkTheme(true);
        } else if (theme === Theme.Light) {
            bodyClassList?.remove('dark');
            setValueToLocalStorage(themeKey, Theme.Light);
            setIsDarkTheme(false);
        }
    };

    useEffect(() => {
        if (preferedTheme !== Theme.Light) {
            document.querySelector('body')?.classList.add(Theme.Dark);
            setIsDarkTheme(true);
        }
        document.body.style.background =
            preferedTheme === Theme.Dark ? ThemeColors.DarkMode : ThemeColors.LightMode;
    }, []);

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
