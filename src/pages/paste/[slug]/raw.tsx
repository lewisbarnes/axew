import { GetServerSideProps, NextPage } from 'next';

const PasteRaw: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
	if (query) {
		const slug = query['slug'];
		if (typeof slug === 'string') {
			const protocol =  process.env.NODE_ENV == "development" ? "http" : "https";
			const paste = await fetch(`${protocol}://${req.headers.host}/api/paste/get/${slug}`);
			const data = await paste.json();
			res.setHeader('Content-Type',"text/plain");
			if(data.message) {
				res.write(data.message);
			} else if(data.content) {
				res.write(data.content);
			}
			res.end();
		}
	}
	return {props: {}};
};

export default PasteRaw;
