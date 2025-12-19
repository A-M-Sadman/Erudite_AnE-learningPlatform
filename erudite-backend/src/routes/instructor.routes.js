const express = require('express');
const router = express.Router();
const controller = require('../controllers/instructor.controller.js');

router.get('/:id', controller.getProfile);
router.get('/:id/courses', controller.getCourses);
router.get('/:id/students', controller.getStudents);
router.get('/:id/quizzes', controller.getQuizzes);
router.get('/:id/discussions', controller.getDiscussions);
router.get('/:id/analytics', controller.getAnalytics);

module.exports = router;
