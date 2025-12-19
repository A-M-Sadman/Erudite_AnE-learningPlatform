const courseService = require('./course.service');
const db = require('../db/database');

exports.getCourses = (id) => courseService.getByInstructor(id);

exports.getProfile = async (id) => {
  const [rows] = await db.execute(
    `SELECT User_ID, First_Name, Last_Name, Email
     FROM USER
     WHERE User_ID = ? AND Role_Type = 'Instructor'`,
    [id]
  );
  return rows[0];
};

exports.getCourses = async (id) => {
  const [rows] = await db.execute(
    `SELECT *
     FROM COURSE
     WHERE I_User_ID = ?`,
    [id]
  );
  return rows;
};

exports.getStudents = async (id) => {
  const [rows] = await db.execute(
    `SELECT DISTINCT u.*
     FROM ENROLLMENT e
     JOIN USER u ON e.S_User_ID = u.User_ID
     JOIN COURSE c ON e.Course_Code = c.Course_Code
     WHERE c.I_User_ID = ?`,
    [id]
  );
  return rows;
};

exports.getQuizzes = async (id) => {
  const [rows] = await db.execute(
    `SELECT q.*
     FROM QUIZ q
     JOIN COURSE c ON q.Course_Code = c.Course_Code
     WHERE c.I_User_ID = ?`,
    [id]
  );
  return rows;
};

exports.getDiscussions = async (id) => {
  const [rows] = await db.execute(
    `SELECT d.*
     FROM DISCUSSION d
     JOIN COURSE c ON d.Course_Code = c.Course_Code
     WHERE c.I_User_ID = ?`,
    [id]
  );
  return rows;
};

exports.getAnalytics = async (id) => {
  const [[stats]] = await db.execute(
    `SELECT
       COUNT(DISTINCT c.Course_Code) AS totalCourses,
       COUNT(DISTINCT e.S_User_ID) AS totalStudents
     FROM COURSE c
     LEFT JOIN ENROLLMENT e ON c.Course_Code = e.Course_Code
     WHERE c.I_User_ID = ?`,
    [id]
  );
  return stats;
};
