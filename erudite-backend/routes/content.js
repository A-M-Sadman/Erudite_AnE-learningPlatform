const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// GET /api/content - Get all content
router.get('/', contentController.getAllContent);

// POST /api/content - Create new content
router.post('/', contentController.createContent);

// PUT /api/content/:id - Update content
router.put('/:id', contentController.updateContent);

// DELETE /api/content/:id - Delete content
router.delete('/:id', contentController.deleteContent);

module.exports = router;