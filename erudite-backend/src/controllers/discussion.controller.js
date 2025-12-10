const discussionService = require("../services/discussion.service");

exports.createDiscussion = async (req, res, next) => {
  try {
    const id = await discussionService.createDiscussion(req.body);
    res.status(201).json({ discussionId: id });
  } catch (err) { next(err); }
};

exports.getDiscussion = async (req, res, next) => {
  try {
    const row = await discussionService.getDiscussion(req.params.id);
    res.json(row);
  } catch (err) { next(err); }
};

exports.addComment = async (req, res, next) => {
  try {
    await discussionService.addComment(req.params.id, req.body);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
};

exports.getComments = async (req, res, next) => {
  try {
    const rows = await discussionService.getComments(req.params.id);
    res.json(rows);
  } catch (err) { next(err); }
};

// Add these methods:
exports.getAllDiscussions = async (req, res, next) => {
  try {
    const discussions = await discussionService.getAllDiscussions();
    res.json(discussions);
  } catch (err) {
    next(err);
  }
};

exports.updateDiscussion = async (req, res, next) => {
  try {
    await discussionService.updateDiscussion(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteDiscussion = async (req, res, next) => {
  try {
    await discussionService.deleteDiscussion(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};