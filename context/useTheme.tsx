import { useContext } from 'react';
import { ThemeContext, ThemeContextData } from './ThemeProvider';

export const useTheme = (): ThemeContextData => {
    const theme = useContext(ThemeContext);
    return theme;
};
