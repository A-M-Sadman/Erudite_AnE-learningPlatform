const db = require("../db/database");

exports.getAllCourses = async () => {
  const [rows] = await db.execute(`
    SELECT 
      c.Course_Code as courseCode, 
      c.Course_Title as title, 
      c.Description as description,
      c.Category as category, 
      c.Difficulty_Level as difficulty,
      c.I_USER_ID as iUserId,  
      u.First_Name as instructorFirst, 
      u.Last_Name as instructorLast
    FROM COURSE c
    LEFT JOIN INSTRUCTOR i ON c.I_USER_ID = i.I_USER_ID
    LEFT JOIN USER u ON i.I_USER_ID = u.User_ID
  `);
  return rows;
};

exports.getCourseByCode = async (code) => {
  const [rows] = await db.execute(`
    SELECT c.*, i.I_USER_ID, u.First_Name, u.Last_Name
    FROM COURSE c
    LEFT JOIN INSTRUCTOR i ON c.I_USER_ID = i.I_USER_ID
    LEFT JOIN USER u ON i.I_USER_ID = u.User_ID
    WHERE c.Course_Code = ?
  `, [code]);
  if (!rows.length) return null;

  // fetch prerequisites
  const [prereqs] = await db.execute("SELECT Prerequisite FROM COURSE_PREREQUISITE WHERE Course_Code = ?", [code]);
  return { ...rows[0], prerequisites: prereqs.map(r => r.Prerequisite) };
};

exports.createCourse = async (courseData) => {
  try {
    const {
      courseCode,
      title,
      description,
      category,
      difficulty,
      iUserId,  // This might be undefined
      aUserId = 1
    } = courseData;
    
    // Convert iUserId to null if it's undefined or empty
    const instructorId = iUserId ? parseInt(iUserId) : null;
    
    const sql = `INSERT INTO COURSE 
                 (Course_Code, Course_Title, Description, Category, Difficulty_Level, I_USER_ID, A_USER_ID) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.execute(sql, [
      courseCode || '',
      title || '',
      description || '',
      category || '',
      difficulty || 'Beginner',
      instructorId,  // Use converted value
      aUserId
    ]);
    
    return { id: result.insertId, ...courseData };
  } catch (error) {
    console.error('Error in createCourse service:', error);
    throw error;
  }
};
exports.updateCourse = async (code, payload) => {
  const { title, description, category, difficulty, iUserId } = payload;
  await db.execute("UPDATE COURSE SET Course_Title = ?, Description = ?, Category = ?, Difficulty_Level = ?, I_USER_ID = ? WHERE Course_Code = ?", [title, description, category, difficulty, iUserId, code]);
};

exports.deleteCourse = async (code) => {
  await db.execute("DELETE FROM COURSE WHERE Course_Code = ?", [code]);
};

exports.addPrerequisite = async (code, prerequisite) => {
  await db.execute("INSERT INTO COURSE_PREREQUISITE (Course_Code, Prerequisite) VALUES (?, ?)", [code, prerequisite]);
};
