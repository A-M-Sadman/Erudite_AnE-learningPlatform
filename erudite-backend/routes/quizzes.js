const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Update these routes to match your controller
router.get('/', quizController.getAllQuizzes);
router.post('/', quizController.createQuiz);
router.put('/:quizNo/:setNo', quizController.updateQuiz); // Match controller params
router.delete('/:quizNo/:setNo', quizController.deleteQuiz); // Match controller params

module.exports = router;