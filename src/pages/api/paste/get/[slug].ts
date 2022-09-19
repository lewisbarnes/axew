import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

const oneDayinSeconds = 60 * 60 * 24;

const PasteGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query['slug'];
	if(!slug || typeof slug !== 'string') {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'no slug provided in request' }));
		return;
	}

	const data = await prisma.textPaste.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if(!data) {
		res.statusCode = 404;
		return res.send(JSON.stringify({ message: 'slug not found' }));
	}

	res.setHeader('Content-Type','application/json');
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Cache-Control',`s-maxage=${oneDayinSeconds}, stale-while-revalidate`);

	return res.json(data);
};

export default PasteGetHandler;
