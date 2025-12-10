const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

router.get("/", enrollmentController.getAllEnrollments); // ADD THIS
router.get("/student/:id", enrollmentController.getStudentEnrollments);
router.get("/course/:code", enrollmentController.getCourseEnrollments);
router.post("/", enrollmentController.enrollStudent);
router.put("/progress", enrollmentController.updateProgress);
router.delete("/:id", enrollmentController.deleteEnrollment); // ADD THIS

module.exports = router;