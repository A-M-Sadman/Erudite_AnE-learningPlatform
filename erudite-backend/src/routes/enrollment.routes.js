const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

router.get("/", enrollmentController.getAllEnrollments); 
router.get("/student/:id", enrollmentController.getStudentEnrollments);
router.get("/course/:code", enrollmentController.getCourseEnrollments);
router.post("/", enrollmentController.enrollStudent);
router.put("/progress", enrollmentController.updateProgress);
router.put("/:sUserId/:courseCode", enrollmentController.updateEnrollment);
router.delete("/:sUserId/:courseCode", enrollmentController.deleteEnrollment);

module.exports = router;