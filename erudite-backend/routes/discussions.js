const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

// GET /api/discussions - Get all discussions
router.get('/', discussionController.getAllDiscussions);

// POST /api/discussions - Create new discussion
router.post('/', discussionController.createDiscussion);

// PUT /api/discussions/:id - Update discussion
router.put('/:id', discussionController.updateDiscussion);

// DELETE /api/discussions/:id - Delete discussion
router.delete('/:id', discussionController.deleteDiscussion);

module.exports = router;