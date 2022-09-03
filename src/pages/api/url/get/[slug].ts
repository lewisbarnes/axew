// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query['slug'];
	if(!slug || typeof slug !== 'string') {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'no slug provided in request' }));
		return;
	}

	const data = await prisma.shortlink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if(!data) {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'slug not found' }));
		return;
	}

	res.setHeader('Content-Type','application/json');
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Cache-Control','s-maxage=1000000000, stale-while-revalidate');

	return res.json(data);
};
