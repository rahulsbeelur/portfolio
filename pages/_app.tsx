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
                <title>I`m Rahul S Beelur</title>
                <meta property="og:title" content="I`m Rahul S Beelur" />
                <meta
                    property="og:description"
                    content="As a software developer, I craft efficient, high-quality code to deliver innovative solutions. I thrive in collaborative environments, embracing new technologies to address diverse challenges and create cutting-edge software."
                />
                <meta property="og:image" content="/open-graph.gif" />
                <meta property="og:image:type" content="image/gif" />
                <meta property="og:image:width" content="1200px" />
                <meta property="og:image:height" content="630px" />
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
