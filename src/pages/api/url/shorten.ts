import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { nanoid } from 'nanoid';

export const ShortenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.send(JSON.stringify({ message: 'only POST requests are allowed on this endpoint' }));
  }
  const { url } = req.body;
  if (typeof url !== 'string' || url.length === 0) {
    res.statusCode = 400;
    return res.send(JSON.stringify({ message: 'url not provided in request body' }));
  }
  let slug = nanoid(10);
  let hasMatch = await slugMatch(slug);
  while (hasMatch > 0) {
    slug = nanoid(10);
    hasMatch = await slugMatch(slug);
  }
  const data = await prisma.shortlink.create({
    data: {
      slug: slug,
      url: url,
    },
    select: { slug: true },
  });
  res.statusCode = 201;
  return res.json({ shortLink: `https://${req.headers.host}/${data.slug}` });
};

const slugMatch = async (slug: string) => {
  return await prisma.shortlink.count({
    where: {
      slug: {
        equals: slug,
      },
    },
  });
};

export default ShortenHandler;
