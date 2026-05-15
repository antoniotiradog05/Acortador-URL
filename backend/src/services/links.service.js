let nanoid;

const getNanoid = async () => {
  if (!nanoid) {
    const module = await import('nanoid');
    nanoid = module.nanoid;
  }
  return nanoid;
};

const prisma = require('../prisma/client');

const crypto = require('crypto');

const hashIp = (ip) => {
  return crypto.createHash('sha256').update(ip).digest('hex');
};

const createLink = async (url) => {
  const generateId = await getNanoid();
  const slug = generateId(7);

  return await prisma.link.create({
    data: { url, slug },
  });
};

const listLinks = async () => {
  return await prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { clicks: true }
      }
    }
  });
};

const deleteLink = async (slug) => {
  return await prisma.link.delete({
    where: { slug }
  });
};

const getAnalytics = async (slug) => {
  const link = await prisma.link.findUnique({
    where: { slug },
    include: {
      clicks: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
  return link;
};

const trackAndGetUrl = async (slug, ip, referrer, country) => {
  const link = await prisma.link.findUnique({
    where: { slug }
  });

  if (!link) return null;

  const ipHash = hashIp(ip);

  await prisma.click.create({
    data: {
      linkId: link.id,
      ipHash,
      referrer,
      country
    }
  });

  return link.url;
};

module.exports = {
  createLink,
  listLinks,
  deleteLink,
  getAnalytics,
  trackAndGetUrl,
};
