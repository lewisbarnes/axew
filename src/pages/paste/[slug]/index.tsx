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
      <main className="bg-[#313131] p-3 overflow-y-auto flex flex-col">
        <PasteForm slug={slug} mode="view" />
      </main>
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
