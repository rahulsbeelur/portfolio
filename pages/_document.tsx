import { Html, Head, Main, NextScript } from 'next/document';
export const Document = (): JSX.Element => {
    return (
        <Html className="scroll-smooth">
            <Head>
                <meta name="color-scheme" content="dark light"></meta>
                <meta name="msapplication-TileColor" content="#da532c" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
