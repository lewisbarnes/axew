import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export const CreateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method === 'POST') {
		const { slug, url } = JSON.parse(req.body);
		console.log(slug);
		const slugMatch = await prisma.shortlink.findFirst({
			where: {
				slug: {
					equals: slug,
				},
			},
		})
		if(slugMatch) {
			res.statusCode = 400;
			res.send(JSON.stringify({message: 'slug already in use'}));
			return;
		}
		const data = await prisma.shortlink.create({
			data: {
				slug: slug,
				url: url,
				createdAt: new Date(Date.now()),
				expiresAt: new Date(Date.now()),
				hits: 0,
			},
			select: {slug: true},
		});
		return res.json(data);
	} else {
		res.statusCode = 405;
		res.send(JSON.stringify({message: 'only POST requests are allowed on this endpoint'}));
	}

};

export default CreateHandler;