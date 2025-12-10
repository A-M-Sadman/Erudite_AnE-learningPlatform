const contentService = require("../services/content.service");

exports.getContentCount = async (req, res, next) => {
  try {
    const count = await contentService.getContentCount(); 
  } catch (err) {
    next(err);
  }
};

exports.getCourseContents = async (req, res, next) => {
  try {
    const items = await contentService.getCourseContents(req.params.courseCode);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getContentById = async (req, res, next) => {
  try {
    const item = await contentService.getContentById(req.params.id);
    if (!item) return res.status(404).json({ error: "Content not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.createContent = async (req, res, next) => {
  try {
    const created = await contentService.createContent(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.updateContent = async (req, res, next) => {
  try {
    await contentService.updateContent(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteContent = async (req, res, next) => {
  try {
    await contentService.deleteContent(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

// Add this method:
exports.getAllContents = async (req, res, next) => {
  try {
    const contents = await contentService.getAllContents();
    res.json(contents);
  } catch (err) {
    next(err);
  }
};