import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Rahul S Beelur</title>
            </Head>
            Hello World!
        </>
    );
}

export default MyApp;
