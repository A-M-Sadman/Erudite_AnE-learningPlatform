const db = require("../db/database");

// Certificates
exports.getAllCertificates = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        c.Certificate_ID,
        c.S_User_ID,
        c.Course_Code,
        c.Issue_Date,
        u.First_Name as Student_First,
        u.Last_Name as Student_Last,
        cr.Course_Title
      FROM CERTIFICATE c
      LEFT JOIN USER u ON c.S_User_ID = u.User_ID
      LEFT JOIN COURSE cr ON c.Course_Code = cr.Course_Code
      ORDER BY c.Issue_Date DESC
    `);
    
    return rows.map(cert => ({
      Certificate_ID: cert.Certificate_ID,
      S_User_ID: cert.S_User_ID,
      Course_Code: cert.Course_Code,
      Issue_Date: cert.Issue_Date,
      Student_Name: `${cert.Student_First || ''} ${cert.Student_Last || ''}`.trim(),
      Course_Title: cert.Course_Title || cert.Course_Code
    }));
  } catch (error) {
    console.error('Error in getAllCertificates:', error);
    return [];
  }
};

exports.createCertificate = async ({ sUserId, courseCode, issueDate }) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO CERTIFICATE (S_User_ID, Course_Code, Issue_Date) VALUES (?, ?, ?)`,
      [sUserId, courseCode, issueDate || new Date().toISOString().split('T')[0]]
    );
    return { certificateId: result.insertId };
  } catch (error) {
    console.error('Error in createCertificate:', error);
    throw error;
  }
};

exports.deleteCertificate = async (id) => {
  try {
    await db.execute("DELETE FROM CERTIFICATE WHERE Certificate_ID = ?", [id]);
  } catch (error) {
    console.error('Error in deleteCertificate:', error);
    throw error;
  }
};

// Course Evaluations
exports.getAllEvaluations = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        e.S_User_ID,
        e.I_USER_ID,
        e.Course_Code,
        e.Course_Rating,
        e.Instructor_Review,
        e.Student_Grade,
        s.First_Name as Student_First,
        s.Last_Name as Student_Last,
        i.First_Name as Instructor_First,
        i.Last_Name as Instructor_Last,
        c.Course_Title
      FROM EVALUATE e
      LEFT JOIN USER s ON e.S_User_ID = s.User_ID
      LEFT JOIN USER i ON e.I_USER_ID = i.User_ID
      LEFT JOIN COURSE c ON e.Course_Code = c.Course_Code
      ORDER BY e.Student_Grade DESC
    `);
    
    return rows.map(evaluation => ({
      S_User_ID: evaluation.S_User_ID,
      I_USER_ID: evaluation.I_USER_ID,
      Course_Code: evaluation.Course_Code,
      Course_Rating: evaluation.Course_Rating || 0,
      Instructor_Review: evaluation.Instructor_Review || '',
      Student_Grade: evaluation.Student_Grade || '',
      Student_Name: `${evaluation.Student_First || ''} ${evaluation.Student_Last || ''}`.trim(),
      Instructor_Name: `${evaluation.Instructor_First || ''} ${evaluation.Instructor_Last || ''}`.trim(),
      Course_Title: evaluation.Course_Title || evaluation.Course_Code
    }));
  } catch (error) {
    console.error('Error in getAllEvaluations:', error);
    return [];
  }
};

exports.createEvaluation = async ({ sUserId, iUserId, courseCode, courseRating, instructorReview, studentGrade }) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO EVALUATE (S_User_ID, I_USER_ID, Course_Code, Course_Rating, Instructor_Review, Student_Grade) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sUserId, iUserId, courseCode, courseRating, instructorReview || '', studentGrade || '']
    );
    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Error in createEvaluation:', error);
    throw error;
  }
};

exports.deleteEvaluation = async ({ sUserId, courseCode }) => {
  try {
    await db.execute(
      "DELETE FROM EVALUATE WHERE S_User_ID = ? AND Course_Code = ?",
      [sUserId, courseCode]
    );
  } catch (error) {
    console.error('Error in deleteEvaluation:', error);
    throw error;
  }
};

exports.getEvaluationById = async (sUserId, courseCode) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM EVALUATE WHERE S_User_ID = ? AND Course_Code = ?",
      [sUserId, courseCode]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error in getEvaluationById:', error);
    return null;
  }
};