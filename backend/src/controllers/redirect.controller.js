const linksService = require('../services/links.service');

const handleRedirect = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Get IP for hash
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const referrer = req.headers.referer || req.headers.referrer || null;
    
    // Simplistic country extraction (in a real app, use geoip-lite)
    const country = 'Unknown'; 

    const url = await linksService.trackAndGetUrl(slug, ip, referrer, country);
    
    if (!url) {
      return res.status(404).send('No encontrado');
    }

    res.redirect(301, url);
  } catch (error) {
    console.error('Error in redirect:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  handleRedirect,
};
