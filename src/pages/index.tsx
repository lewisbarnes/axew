import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
				<meta property='og:title' content='axew'/>
				<meta property="og:description" content="A Link Shortener"/>
				<meta property="og:site_name" content="lewisbarnes.dev" />
				<meta property="og:image" content="https://axew.lewisbarnes.dev/axew.png"/>
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
