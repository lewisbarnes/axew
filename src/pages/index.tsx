import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { nanoid } from 'nanoid';

type Form = {
	slug: string;
	url: string;
};

const CreateLinkForm = dynamic(() => import("../components/createLinkForm"), {
  ssr: false,
});

const Home: NextPage = () => {


	return (
		<main>
			<Head>
				<title>axew</title>
				<meta name="description" content="link shortener" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="axew-img">
				<img alt="axew" src="axew.png" draggable="false"></img>
			</div>
			<CreateLinkForm/>
		</main>
	);
};

export default Home;
