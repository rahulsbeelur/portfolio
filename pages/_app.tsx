import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeProvider';
import { Layout } from '../layouts/Layout';

// eslint-disable-next-line @typescript-eslint/naming-convention
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>I'm Rahul S Beelur</title>
            </Head>
            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
