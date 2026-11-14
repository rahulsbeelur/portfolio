import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTheme } from '../context/useTheme';
import { ThemeColors } from '../context/ThemeProvider';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import { BackToTopButton } from '../components/BackToTopButton';
import { MobileFooter } from '../components/MobileFooter';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const { isDarkTheme } = useTheme();
    const { pathname } = useRouter();
    const isQuickReadFocusMode = pathname === '/quick-reads/focus';
    return (
        <>
            <Head>
                <meta
                    name="theme-color"
                    content={isDarkTheme ? ThemeColors.DarkMode : ThemeColors.LightMode}
                />
            </Head>
            {!isQuickReadFocusMode && <AppBar />}
            {!isQuickReadFocusMode && <BackToTopButton />}
            {children}
            <Analytics />
            <SpeedInsights />
            {!isQuickReadFocusMode && <Footer />}
            {!isQuickReadFocusMode && <MobileFooter />}
        </>
    );
};
