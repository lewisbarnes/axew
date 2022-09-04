import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import Footer from "../../components/footer";

const PasteForm = dynamic(() => import('../../components/pasteForm'), {
	ssr: false,
});

const PasteHome: NextPage = () => {

	const [pasteValue, setPasteValue] = useState('');
	const [pasteTitle, setPasteTitle] = useState('');
	return (
		<>
			<main>
				<Head>
					<title>axew</title>
					<meta property="og:title" content="axew" />
					<meta property="og:description" content="A Link Shortener" />
					<meta property="og:site_name" content="lewisbarnes.dev" />
					<meta property="og:image" content="https://axew.lewisbarnes.dev/axew.png" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="axew-img">
					<img alt="axew" src="axew.png" draggable="false" />
				</div>
				<PasteForm mode="create" />
			</main>
			<Footer />
		</>
	);
};

export default PasteHome;