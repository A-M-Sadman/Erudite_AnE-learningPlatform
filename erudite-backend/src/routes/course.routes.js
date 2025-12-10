const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.get("/", courseController.getAllCourses);
router.get("/:code", courseController.getCourseByCode);
router.post("/", courseController.createCourse);
router.put("/:code", courseController.updateCourse);
router.delete("/:code", courseController.deleteCourse);

module.exports = router;
