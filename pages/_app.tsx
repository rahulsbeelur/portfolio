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
                    content="As a software developer, I create innovative solutions by writing efficient, maintainable code. I implement software applications, ensuring they meet high standards of quality and functionality. I thrive in collaborative environments, embracing new technologies to deliver cutting-edge software that addresses diverse challenges."
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
