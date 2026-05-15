const rateLimit = require('express-rate-limit');

const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Demasiadas solicitudes, por favor inténtalo de nuevo más tarde.' },
});

module.exports = {
  shortenLimiter,
};
