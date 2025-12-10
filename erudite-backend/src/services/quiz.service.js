const db = require("../db/database");

exports.getQuizzesByCourse = async (courseCode) => {
  const [rows] = await db.execute("SELECT * FROM QUIZ WHERE Course_Code = ?", [courseCode]);
  return rows;
};

exports.getQuiz = async (quizNo, setNo) => {
  const [rows] = await db.execute("SELECT * FROM QUIZ WHERE Quiz_No = ? AND Set_No = ?", [quizNo, setNo]);
  const [questions] = await db.execute("SELECT * FROM QUIZ_QUESTION WHERE Quiz_No = ? AND Set_No = ?", [quizNo, setNo]);
  return { meta: rows[0], questions };
};

exports.createQuiz = async ({ quizNo, setNo, quizTitle, sUserId, iUserId, courseCode }) => {
  await db.execute("INSERT INTO QUIZ (Quiz_No, Set_No, Quiz_Title, S_User_ID, I_USER_ID, Course_Code) VALUES (?, ?, ?, ?, ?, ?)", [quizNo, setNo, quizTitle, sUserId || null, iUserId || null, courseCode]);
};

exports.addQuestions = async (questionsArray) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (const q of questionsArray) {
      const { quizNo, setNo, questionNo, topic, question, marks } = q;
      await conn.execute("INSERT INTO QUIZ_QUESTION (Quiz_No, Set_No, Question_No, Topic, Question, Marks) VALUES (?, ?, ?, ?, ?, ?)", [quizNo, setNo, questionNo, topic, question, marks]);
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.solveQuiz = async ({ quizNo, setNo, questionNo, solution, earnedMarks }) => {
  await db.execute("INSERT INTO QUIZ_SOLVE (Quiz_No, Set_No, Question_No, Solution, Earned_Marks) VALUES (?, ?, ?, ?, ?)", [quizNo, setNo, questionNo, solution, earnedMarks]);
};

exports.addMark = async ({ sUserId, quizNo, setNo, quizMark }) => {
  await db.execute("INSERT INTO QUIZ_STUDENT (S_User_ID, Quiz_No, Set_No, Quiz_Mark) VALUES (?, ?, ?, ?)", [sUserId, quizNo, setNo, quizMark]);
};

exports.getStudentQuizMarks = async (sUserId) => {
  const [rows] = await db.execute("SELECT * FROM QUIZ_STUDENT WHERE S_User_ID = ?", [sUserId]);
  return rows;
};

exports.getAllQuizzes = async () => {
  const [rows] = await db.execute(`
    SELECT q.*, c.Course_Title 
    FROM QUIZ q
    LEFT JOIN COURSE c ON q.Course_Code = c.Course_Code
  `);
  return rows;
};

// quiz.service.js - fix deleteQuiz function
exports.deleteQuiz = async (quizNo) => {
  try {
    console.log('🗑️ Deleting quiz, quizNo:', quizNo);
    
    // Check if quizNo is valid
    if (quizNo === undefined || quizNo === null) {
      throw new Error('Quiz number is required for deletion');
    }
    
    const sql = 'DELETE FROM QUIZ WHERE Quiz_No = ?';
    console.log('📝 Delete SQL:', sql);
    console.log('📝 Delete parameter:', quizNo);
    
    const [result] = await db.execute(sql, [quizNo]);
    
    console.log('✅ Delete result:', result.affectedRows, 'rows affected');
    return result.affectedRows > 0;
  } catch (error) {
    console.error('❌ Error deleting quiz:', error);
    throw error;
  }
};

// quiz.service.js - fix updateQuiz function
exports.updateQuiz = async (quizNo, data) => {
  try {
    console.log('📝 Updating quiz:', quizNo, data); // Add logging
    
    // Check if data exists
    if (!data) {
      throw new Error('No data provided for update');
    }
    
    // Extract with default values to prevent undefined errors
    const { 
      quizTitle = '', 
      courseCode = ''
    } = data;
    
    const sql = `UPDATE QUIZ 
                 SET Quiz_Title = ?, Course_Code = ?
                 WHERE Quiz_No = ?`;
    
    const [result] = await db.execute(sql, [
      quizTitle,
      courseCode,
      quizNo
    ]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error in updateQuiz:', error);
    throw error;
  }
};