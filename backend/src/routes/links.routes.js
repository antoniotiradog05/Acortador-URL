const express = require('express');
const router = express.Router();
const linksController = require('../controllers/links.controller');
const { shortenLimiter } = require('../middlewares/rateLimit');

// POST /api/links - Create a short link
router.post('/', shortenLimiter, linksController.createShortLink);

// GET /api/links - List all links
router.get('/', linksController.listLinks);

// DELETE /api/links/:slug - Delete a link
router.delete('/:slug', linksController.deleteLink);

// GET /api/analytics/:slug - Get analytics for a link
router.get('/analytics/:slug', linksController.getAnalytics);

module.exports = router;
