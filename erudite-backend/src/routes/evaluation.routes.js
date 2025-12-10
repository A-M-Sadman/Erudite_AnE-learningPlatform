const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluation.controller.js");

// Certificates
router.get("/certificates", evaluationController.getAllCertificates);
router.post("/certificates", evaluationController.createCertificate);
router.delete("/certificates/:id", evaluationController.deleteCertificate);

// Course Evaluations
router.get("/evaluations", evaluationController.getAllEvaluations);
router.post("/evaluations", evaluationController.createEvaluation);
router.get("/evaluations/:sUserId/:courseCode", evaluationController.getEvaluation);
router.delete("/evaluations/:sUserId/:courseCode", evaluationController.deleteEvaluation);

module.exports = router;