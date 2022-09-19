import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Footer from '../components/footer';

type Form = {
  slug: string;
  url: string;
};

const CreateLinkForm = dynamic(() => import('../components/createLinkForm'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className='h-full'>
      <Head>
        <title>axew</title>
        <meta property="og:title" content="axew" />
        <meta property="og:description" content="A Link Shortener" />
        <meta property="og:site_name" content="lewisbarnes.dev" />
        <meta property="og:image" content="https://axew.lewisbarnes.dev/axew.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#313131] p-3 overflow-y-auto flex flex-col h-screen">
        <img alt="axew" className="h-24 mx-auto" src="axew.png" draggable="false" />
        <CreateLinkForm />
				<div className="flex-grow">
				</div>
				<Footer />
      </main>

    </div>
  );
};

export default Home;
