const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");

router.get("/", quizController.getAllQuizzes); // ADD THIS
router.get("/course/:courseCode", quizController.getQuizzesByCourse);
router.get("/:quizNo/:setNo", quizController.getQuiz);
// router.get("/:id", quizController.getQuizById); // ADD THIS (optional)
router.post("/", quizController.createQuiz);
router.put("/:id", quizController.updateQuiz); // ADD THIS
router.delete("/:id", quizController.deleteQuiz); // ADD THIS
router.post("/questions", quizController.addQuestions);
router.post("/solve", quizController.solveQuiz);
router.post("/marks", quizController.addMark);
router.get("/student/:id", quizController.getStudentQuizMarks);

module.exports = router;