const enrollmentService = require("../services/enrollment.service");

exports.enrollStudent = async (req, res, next) => {
  try {
    await enrollmentService.enrollStudent(req.body);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const rows = await enrollmentService.getStudentEnrollments(req.params.id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getCourseEnrollments = async (req, res, next) => {
  try {
    const rows = await enrollmentService.getCourseEnrollments(req.params.code);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    await enrollmentService.updateProgress(req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

// Add these methods:
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments();
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// enrollment.controller.js
exports.updateEnrollment = async (req, res, next) => {
  try {
    const { sUserId, courseCode } = req.params; 
    await enrollmentService.updateEnrollment(sUserId, courseCode, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteEnrollment = async (req, res, next) => {
  const { sUserId, courseCode } = req.params;
  await enrollmentService.deleteEnrollment(sUserId, courseCode);
  res.json({ ok: true });
};
