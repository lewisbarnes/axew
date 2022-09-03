import { GetServerSideProps,NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

type Props = { host: string | null };
const Home: NextPage<Props> = ({ host }) => {

	const [slug, setSlug] = useState('');
	const [url, setUrl] = useState('');
	const [shortLink, setShortLink] = useState('');

  return (
    <>
      <Head>
        <title>axew</title>
        <meta name="description" content="link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
				{/* <form className="input-form">
					<label htmlFor="slug">{host}/s/</label>
					<input type="text" name="slug"/>
					<label htmlFor="url">url</label>
					<input type="text" name="url"/>
					<button className="submit-button">create</button>
					{shortLink.length > 0 ? <button className="submit-button">copy shortLink</button> :''}
				</form> */}
				<div className="axew-img">
					<img  alt="axew" src="axew.png" width="200px"></img>
				</div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const {req, query, res} = context;
	if(req) {
		return ({ props: {host: req.headers.host || null}});
	}
	return ({ props: {host: null}});
}

export default Home;
