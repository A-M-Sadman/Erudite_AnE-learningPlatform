const evaluationService = require("../services/evaluation.service.js");

// Certificates
exports.getAllCertificates = async (req, res, next) => {
  try {
    const certificates = await evaluationService.getAllCertificates();
    res.json(certificates);
  } catch (err) {
    next(err);
  }
};

exports.createCertificate = async (req, res, next) => {
  try {
    const created = await evaluationService.createCertificate(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.deleteCertificate = async (req, res, next) => {
  try {
    await evaluationService.deleteCertificate(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

// Course Evaluations
exports.getAllEvaluations = async (req, res, next) => {
  try {
    const evaluations = await evaluationService.getAllEvaluations();
    res.json(evaluations);
  } catch (err) {
    next(err);
  }
};

exports.createEvaluation = async (req, res, next) => {
  try {
    const created = await evaluationService.createEvaluation(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvaluation = async (req, res, next) => {
  try {
    const { sUserId, iUserId, courseCode } = req.params;
    await evaluationService.deleteEvaluation({ sUserId, iUserId, courseCode });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getEvaluation = async (req, res, next) => {
  try {
    const { sUserId, courseCode } = req.params;
    const evaluation = await evaluationService.getEvaluationById(sUserId, courseCode);
    
    if (!evaluation) {
      return res.status(404).json({ error: "Evaluation not found" });
    }
    
    res.json(evaluation);
  } catch (err) {
    next(err);
  }
};