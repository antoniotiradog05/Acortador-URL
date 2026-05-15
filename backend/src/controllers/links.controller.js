const linksService = require('../services/links.service');

const createShortLink = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ error: 'La URL es obligatoria' });

    try { new URL(url); } catch (err) { return res.status(400).json({ error: 'Formato de URL no válido' }); }

    const newLink = await linksService.createLink(url);
    res.status(201).json(newLink);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const listLinks = async (req, res) => {
  try {
    const links = await linksService.listLinks();
    res.status(200).json(links);
  } catch (error) {
    console.error('Error listing links:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { slug } = req.params;
    await linksService.deleteLink(slug);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;
    const analytics = await linksService.getAnalytics(slug);
    if (!analytics) return res.status(404).json({ error: 'Enlace no encontrado' });
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createShortLink,
  listLinks,
  deleteLink,
  getAnalytics,
};
