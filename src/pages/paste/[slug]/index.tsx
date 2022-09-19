import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import Footer from '../../../components/footer';
import Image from 'next/image';

const PasteForm = dynamic(() => import('../../../components/pasteForm'), {
  ssr: false,
});

const PasteHome: NextPage<{ slug: string }> = ({ slug }) => {
  return (
    <>
      <Head>
        <title>axew</title>
        <meta property="og:title" content="axew" />
        <meta property="og:description" content="View this paste!" />
        <meta property="og:site_name" content="lewisbarnes.dev" />
        <meta property="og:image" content="https://axew.lewisbarnes.dev/axew.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#313131] p-3 overflow-y-auto flex flex-col min-h-screen">
			<div className='w-32 mx-auto'>
				<Image
				alt="axew"
				src="/axew.png"
				width="100%"
				height="100%"
				layout='responsive'
				objectFit='contain'
					/>
				</div>
        <PasteForm slug={slug} mode="view" />
				<div className='flex-grow'></div>
				<Footer />
      </main>
      
    </>
  );
};

PasteHome.getInitialProps = async ({ query, res }) => {
  if (query) {
    const slug = query['slug'];
    if (typeof slug === 'string') {
      return { slug: slug };
    }
  }
  return { slug: '' };
};

export default PasteHome;
