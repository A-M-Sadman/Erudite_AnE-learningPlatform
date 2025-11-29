const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Add this route to get instructor by ID - fix the parameter name
router.get('/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params; // Changed from :id to :instructorId
    
    const query = `
      SELECT u.User_ID, u.First_Name, u.Last_Name, u.Email, u.Contact_no,
             i.Qualification, i.Join_Date, i.Expertise
      FROM users u
      INNER JOIN instructors i ON u.User_ID = i.I_USER_ID
      WHERE u.User_ID = ? AND u.Role_Type = 'instructor'
    `;
    
    const [results] = await db.execute(query, [instructorId]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching instructor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update instructor profile
router.put('/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params;
    const { First_Name, Last_Name, Email, Contact_no, Qualification, Expertise } = req.body;
    
    // Update users table
    const userQuery = `
      UPDATE users 
      SET First_Name = ?, Last_Name = ?, Email = ?, Contact_no = ?
      WHERE User_ID = ?
    `;
    await db.execute(userQuery, [First_Name, Last_Name, Email, Contact_no, instructorId]);
    
    // Update instructors table
    const instructorQuery = `
      UPDATE instructors 
      SET Qualification = ?, Expertise = ?
      WHERE I_USER_ID = ?
    `;
    await db.execute(instructorQuery, [Qualification, Expertise, instructorId]);
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating instructor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get instructor's courses
router.get('/:instructorId/courses', async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const query = `
      SELECT 
        c.Course_Code, 
        c.Course_Title, 
        c.Description, 
        c.Category, 
        c.Difficulty_Level,
        c.I_USER_ID,
        COUNT(DISTINCT e.S_User_ID) as students,
        COUNT(DISTINCT q.Quiz_No) as quizzes,
        c.Created_At,
        CASE 
          WHEN COUNT(DISTINCT e.S_User_ID) > 0 THEN 'Active'
          ELSE 'Inactive'
        END as Status
      FROM courses c
      LEFT JOIN enrollments e ON c.Course_Code = e.Course_Code
      LEFT JOIN quizzes q ON c.Course_Code = q.Course_Code
      WHERE c.I_USER_ID = ?
      GROUP BY c.Course_Code
      ORDER BY c.Course_Code
    `;
    
    const [results] = await db.execute(query, [instructorId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get instructor's students
router.get('/:instructorId/students', async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const query = `
      SELECT DISTINCT
        u.User_ID,
        u.First_Name,
        u.Last_Name,
        u.Email,
        u.Contact_no,
        s.Interest,
        s.Learning_Goal,
        COUNT(DISTINCT e.Course_Code) as courses,
        AVG(e.Lessons_Completed / e.Total_Lessons * 100) as progress
      FROM users u
      INNER JOIN students s ON u.User_ID = s.S_User_ID
      INNER JOIN enrollments e ON u.User_ID = e.S_User_ID
      INNER JOIN courses c ON e.Course_Code = c.Course_Code
      WHERE c.I_USER_ID = ?
      GROUP BY u.User_ID
      ORDER BY u.First_Name, u.Last_Name
    `;
    
    const [results] = await db.execute(query, [instructorId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching instructor students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get instructor's quizzes
router.get('/:instructorId/quizzes', async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const query = `
      SELECT 
        q.Quiz_No,
        q.Set_No,
        q.Quiz_Title,
        q.Course_Code,
        q.Total_Questions,
        q.Total_Marks,
        q.Duration,
        q.Status,
        c.Course_Title,
        (SELECT COUNT(*) FROM quiz_solve WHERE Quiz_No = q.Quiz_No AND Set_No = q.Set_No) as submissions,
        (SELECT COUNT(*) FROM quiz_solve WHERE Quiz_No = q.Quiz_No AND Set_No = q.Set_No AND Earned_Marks IS NULL) as pending
      FROM quizzes q
      INNER JOIN courses c ON q.Course_Code = c.Course_Code
      WHERE q.I_USER_ID = ?
      ORDER BY q.Quiz_No, q.Set_No
    `;
    
    const [results] = await db.execute(query, [instructorId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching instructor quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get instructor's discussions
router.get('/:instructorId/discussions', async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const query = `
      SELECT 
        d.DISCUSSION_ID,
        d.Post,
        d.Post_Date,
        d.Course_Code,
        d.User_ID,
        d.Status,
        d.Reply_Count,
        c.Course_Title,
        u.First_Name,
        u.Last_Name
      FROM discussions d
      INNER JOIN courses c ON d.Course_Code = c.Course_Code
      INNER JOIN users u ON d.User_ID = u.User_ID
      WHERE c.I_USER_ID = ?
      ORDER BY d.Post_Date DESC
    `;
    
    const [results] = await db.execute(query, [instructorId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching instructor discussions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get instructor analytics
router.get('/:instructorId/analytics', async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    // Student progress data (using enrollment progress)
    const progressQuery = `
      SELECT 
        DATE_FORMAT(e.enrollment_Date, '%b') as month,
        AVG(e.Lessons_Completed / e.Total_Lessons * 100) as completion,
        COUNT(DISTINCT e.S_User_ID) as engagement
      FROM enrollments e
      INNER JOIN courses c ON e.Course_Code = c.Course_Code
      WHERE c.I_USER_ID = ? 
        AND e.enrollment_Date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(e.enrollment_Date, '%Y-%m'), DATE_FORMAT(e.enrollment_Date, '%b')
      ORDER BY MIN(e.enrollment_Date)
    `;
    
    // Course enrollment data
    const enrollmentQuery = `
      SELECT 
        c.Course_Title as name,
        COUNT(DISTINCT e.S_User_ID) as students
      FROM courses c
      LEFT JOIN enrollments e ON c.Course_Code = e.Course_Code
      WHERE c.I_USER_ID = ?
      GROUP BY c.Course_Code
    `;
    
    // Quiz statistics
    const quizQuery = `
      SELECT 
        q.Quiz_Title as quiz,
        (SELECT COUNT(*) FROM quiz_solve WHERE Quiz_No = q.Quiz_No AND Set_No = q.Set_No) as submissions,
        (SELECT COUNT(*) FROM quiz_solve WHERE Quiz_No = q.Quiz_No AND Set_No = q.Set_No AND Earned_Marks IS NULL) as pending
      FROM quizzes q
      WHERE q.I_USER_ID = ?
    `;
    
    // FIXED: Student performance based on enrollment progress
    const performanceQuery = `
      SELECT 
        performance_level,
        COUNT(*) as student_count
      FROM (
        SELECT 
          e.S_User_ID,
          CASE 
            WHEN (e.Lessons_Completed / e.Total_Lessons * 100) >= 80 THEN 'Excellent'
            WHEN (e.Lessons_Completed / e.Total_Lessons * 100) >= 60 THEN 'Good'
            WHEN (e.Lessons_Completed / e.Total_Lessons * 100) >= 40 THEN 'Average'
            ELSE 'Needs Improvement'
          END as performance_level
        FROM enrollments e
        INNER JOIN courses c ON e.Course_Code = c.Course_Code
        WHERE c.I_USER_ID = ?
      ) as student_performance
      GROUP BY performance_level
    `;
    
    const [progressResults] = await db.execute(progressQuery, [instructorId]);
    const [enrollmentResults] = await db.execute(enrollmentQuery, [instructorId]);
    const [quizResults] = await db.execute(quizQuery, [instructorId]);
    const [performanceResults] = await db.execute(performanceQuery, [instructorId]);
    
    res.json({
      studentProgress: progressResults,
      courseEnrollment: enrollmentResults,
      quizStats: quizResults,
      studentPerformance: performanceResults
    });
  } catch (error) {
    console.error('Error fetching instructor analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;