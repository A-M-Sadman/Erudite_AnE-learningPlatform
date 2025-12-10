const quizService = require("../services/quiz.service");

exports.getQuizzesByCourse = async (req, res, next) => {
  try {
    const data = await quizService.getQuizzesByCourse(req.params.courseCode);
    res.json(data);
  } catch (err) { next(err); }
};

exports.getQuiz = async (req, res, next) => {
  try {
    const data = await quizService.getQuiz(req.params.quizNo, req.params.setNo);
    res.json(data);
  } catch (err) { next(err); }
};

exports.createQuiz = async (req, res, next) => {
  try {
    await quizService.createQuiz(req.body);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
};

exports.addQuestions = async (req, res, next) => {
  try {
    await quizService.addQuestions(req.body);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
};

exports.solveQuiz = async (req, res, next) => {
  try {
    await quizService.solveQuiz(req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
};

exports.addMark = async (req, res, next) => {
  try {
    await quizService.addMark(req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
};

exports.getStudentQuizMarks = async (req, res, next) => {
  try {
    const rows = await quizService.getStudentQuizMarks(req.params.id);
    res.json(rows);
  } catch (err) { next(err); }
};

// Add these methods:
exports.getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    await quizService.updateQuiz(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    await quizService.deleteQuiz(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};