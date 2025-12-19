const service = require('../services/instructor.service');

exports.getProfile = async (req, res, next) => {
  try {
    res.json(await service.getProfile(req.params.id));
  } catch (e) { next(e); }
};

exports.getCourses = async (req, res, next) => {
  try {
    res.json(await service.getCourses(req.params.id));
  } catch (e) { next(e); }
};

exports.getStudents = async (req, res, next) => {
  try {
    res.json(await service.getStudents(req.params.id));
  } catch (e) { next(e); }
};

exports.getQuizzes = async (req, res, next) => {
  try {
    res.json(await service.getQuizzes(req.params.id));
  } catch (e) { next(e); }
};

exports.getDiscussions = async (req, res, next) => {
  try {
    res.json(await service.getDiscussions(req.params.id));
  } catch (e) { next(e); }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    res.json(await service.getAnalytics(req.params.id));
  } catch (e) { next(e); }
};
