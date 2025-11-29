const db = require('../config/database');

exports.getAllQuizzes = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM quizzes');
    res.json(results);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { Quiz_No, Set_No, Quiz_Title, Course_Code, I_USER_ID, Total_Questions, Total_Marks, Duration, Status } = req.body;
    
    const query = `
      INSERT INTO quizzes (Quiz_No, Set_No, Quiz_Title, Course_Code, I_USER_ID, Total_Questions, Total_Marks, Duration, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      Quiz_No, 
      Set_No, 
      Quiz_Title, 
      Course_Code, 
      I_USER_ID, 
      Total_Questions, 
      Total_Marks, 
      Duration, 
      Status
    ]);
    
    res.status(201).json({ 
      message: 'Quiz created successfully'
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { quizNo, setNo } = req.params;
    const { Quiz_Title, Total_Questions, Total_Marks, Duration, Status } = req.body;
    
    const query = `
      UPDATE quizzes 
      SET Quiz_Title = ?, Total_Questions = ?, Total_Marks = ?, Duration = ?, Status = ?
      WHERE Quiz_No = ? AND Set_No = ?
    `;
    
    const [result] = await db.execute(query, [
      Quiz_Title, 
      Total_Questions, 
      Total_Marks, 
      Duration, 
      Status, 
      quizNo, 
      setNo
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json({ message: 'Quiz updated successfully' });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { quizNo, setNo } = req.params;
    
    const [result] = await db.execute('DELETE FROM quizzes WHERE Quiz_No = ? AND Set_No = ?', [quizNo, setNo]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};