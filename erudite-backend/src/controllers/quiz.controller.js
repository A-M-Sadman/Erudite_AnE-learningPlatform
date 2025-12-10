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

// quiz.controller.js - updateQuiz
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    console.log('📥 Received update request for quiz:', id);
    console.log('📥 Request data:', data);
    console.log('📥 Request body keys:', Object.keys(req.body));
    
    if (!data) {
      return res.status(400).json({ error: 'No data provided for update' });
    }
    
    const result = await quizService.updateQuiz(id, data);
    
    if (result) {
      res.json({ message: 'Quiz updated successfully' });
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: error.message });
  }
};

// quiz.controller.js - fix deleteQuiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🗑️ Received delete request for quiz ID:', id);
    console.log('🗑️ Request params:', req.params);
    
    // Validate ID
    if (!id) {
      return res.status(400).json({ error: 'Quiz ID is required' });
    }
    
    // Convert to number if needed
    const quizNo = parseInt(id);
    if (isNaN(quizNo)) {
      return res.status(400).json({ error: 'Invalid quiz ID format' });
    }
    
    const result = await quizService.deleteQuiz(quizNo);
    
    if (result) {
      res.json({ message: 'Quiz deleted successfully' });
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error('❌ Error deleting quiz:', error);
    res.status(500).json({ error: error.message });
  }
};