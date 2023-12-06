import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useTheme } from '../context/useTheme';
import { ThemeColors } from '../context/ThemeProvider';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import { BackToTopButton } from '../components/BackToTopButton';
import { MobileFooter } from '../components/MobileFooter';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const { isDarkTheme } = useTheme();
    return (
        <>
            <Head>
                <meta
                    name="theme-color"
                    content={isDarkTheme ? ThemeColors.DarkMode : ThemeColors.LightMode}
                />
            </Head>
            <AppBar />
            <BackToTopButton />
            {/* <ScrollDown /> */}
            {children}
            <Footer />
            <MobileFooter />
        </>
    );
};
