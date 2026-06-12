import { Html, Head, Main, NextScript } from 'next/document';

const themeScript = `
    (function () {
        try {
            var theme = window.localStorage.getItem('theme');
            if (theme !== 'dark' && theme !== 'light') {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                window.localStorage.setItem('theme', theme);
            }

            var isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);
            document.documentElement.style.colorScheme = theme;
        } catch (error) {}
    })();
`;

export const Document = (): JSX.Element => {
    return (
        <Html className="scroll-smooth">
            <Head>
                <meta
                    name="google-site-verification"
                    content="v-29Y0BgPVzesTZmVjb8oXuAU5h7fC3bKzfGoDsX6wk"
                />
                <meta name="color-scheme" content="dark light"></meta>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                <meta name="msapplication-TileColor" content="#da532c" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/android-chrome-192x192.png"
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
