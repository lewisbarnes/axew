import { GetServerSideProps, NextPage } from 'next';

const ShortLinkRedirect: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
	if (query) {
		const slug = query['slug'];
		if (typeof slug === 'string') {
			const protocol =  process.env.NODE_ENV == "development" ? "http" : "https";
			const slugFetch = await fetch(`${protocol}://${req.headers.host}/api/url/get/${slug}`);
			if (slugFetch.status === 404) {
				res.statusCode = 404;
			}
			const data = await slugFetch.json();
			res.setHeader('Content-Type',"text/plain");
			if (data?.url) {
				res.statusCode = 302;
				const oneDayinSeconds = 60 * 60 * 24;
				res.setHeader('location',data.url);
			}
			res.end();
		}
	}
	return {props: {}};
};

export default ShortLinkRedirect;
