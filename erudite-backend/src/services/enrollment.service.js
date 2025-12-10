const db = require("../db/database");

exports.enrollStudent = async ({ sUserId, courseCode, enrollmentDate }) => {
  await db.execute("INSERT INTO ENROLLMENT (S_User_ID, Course_Code, Enrollment_Date, Lessons_Completed) VALUES (?, ?, ?, 0)", [sUserId, courseCode, enrollmentDate || null]);
};

exports.getStudentEnrollments = async (sUserId) => {
  const [rows] = await db.execute("SELECT * FROM ENROLLMENT WHERE S_User_ID = ?", [sUserId]);
  return rows;
};

exports.getCourseEnrollments = async (courseCode) => {
  const [rows] = await db.execute(`
    SELECT e.*, u.First_Name, u.Last_Name FROM ENROLLMENT e
    JOIN USER u ON e.S_User_ID = u.User_ID
    WHERE e.Course_Code = ?
  `, [courseCode]);
  return rows;
};

exports.updateProgress = async ({ sUserId, courseCode, lessonsCompleted }) => {
  await db.execute("UPDATE ENROLLMENT SET Lessons_Completed = ? WHERE S_User_ID = ? AND Course_Code = ?", [lessonsCompleted, sUserId, courseCode]);
};

exports.getAllEnrollments = async () => {
  const [rows] = await db.execute(`
    SELECT e.*, u.First_Name, u.Last_Name, c.Course_Title 
    FROM ENROLLMENT e
    JOIN USER u ON e.S_User_ID = u.User_ID
    JOIN COURSE c ON e.Course_Code = c.Course_Code
  `);
  return rows;
};