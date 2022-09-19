import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Footer from '../components/footer';
import Image from 'next/image';

const CreateLinkForm = dynamic(() => import('../components/createLinkForm'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
      <main className="bg-[#313131] flex flex-col">
        <CreateLinkForm />
      </main>
  );
};

export default Home;
