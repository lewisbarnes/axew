import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

export const CreateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.send(JSON.stringify({ message: 'only POST requests are allowed on this endpoint' }));
  }
  const { slug, url } = JSON.parse(req.body);
  console.log(slug);
  const slugMatch = await prisma.shortlink.count({
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (slugMatch > 0) {
    res.statusCode = 400;
    res.send(JSON.stringify({ message: 'slug already in use' }));
    return;
  }
  const data = await prisma.shortlink.create({
    data: {
      slug: slug,
      url: url,
    },
    select: { slug: true },
  });
  res.statusCode = 201;
  return res.json(data);
};

export default CreateHandler;
