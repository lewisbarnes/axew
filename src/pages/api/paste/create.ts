import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { nanoid } from 'nanoid';

const PasteCreateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.send(JSON.stringify({ message: 'only POST requests are allowed on this endpoint' }));
  }

  const { content } = JSON.parse(req.body);
  if (typeof content !== 'string' || content.length === 0) {
    res.statusCode = 400;
    return res.send(JSON.stringify({ message: 'content not provided in request body' }));
  }
  let slug = nanoid(10);
  let hasMatch = await slugMatch(slug);
  while (hasMatch > 0) {
    slug = nanoid(10);
    hasMatch = await slugMatch(slug);
  }
  const data = await prisma.textPaste.create({
    data: {
      slug: slug,
      content: content,
    },
    select: { slug: true },
  });
  res.statusCode = 201;
  const protocol = process.env.NODE_ENV == 'development' ? 'http' : 'https';
  return res.json({ pasteURL: `${protocol}://${req.headers.host}/paste/${data.slug}` });
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

export default PasteCreateHandler;
