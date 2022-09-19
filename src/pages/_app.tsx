import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import Footer from '../components/footer';
import Head from 'next/head';
import Image from 'next/image';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="bg-[#313131] h-screen flex flex-col p-3">
      <Head>
        <title>axew</title>
        <meta property="og:title" content="axew" />
        <meta property="og:description" content="A Link Shortener" />
        <meta property="og:site_name" content="lewisbarnes.dev" />
        <meta property="og:image" content="https://axew.lewisbarnes.dev/axew.svg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-16 mx-auto">
        <Image
          alt="axew"
          src="/axew.png"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <Component {...pageProps} />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default MyApp;
