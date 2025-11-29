const db = require('../config/database');

exports.getAllCourses = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM courses');
    res.json(results);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { Course_Code, Course_Title, Description, Category, Difficulty_Level, I_USER_ID } = req.body;
    
    // Check if course already exists
    const [existing] = await db.execute('SELECT * FROM courses WHERE Course_Code = ?', [Course_Code]);
    
    if (existing.length > 0) {
      return res.status(400).json({ 
        error: 'Course already exists',
        message: `A course with code ${Course_Code} already exists. Please use a different course code.`
      });
    }
    
    // Insert new course
    const query = `
      INSERT INTO courses (Course_Code, Course_Title, Description, Category, Difficulty_Level, I_USER_ID)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      Course_Code, 
      Course_Title, 
      Description, 
      Category, 
      Difficulty_Level, 
      I_USER_ID
    ]);
    
    res.status(201).json({ 
      message: 'Course created successfully', 
      courseId: Course_Code,
      insertId: result.insertId 
    });
    
  } catch (error) {
    console.error('Error creating course:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        error: 'Duplicate course code',
        message: 'A course with this code already exists. Please use a different course code.'
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { Course_Title, Description, Category, Difficulty_Level } = req.body;
    
    const query = `
      UPDATE courses 
      SET Course_Title = ?, Description = ?, Category = ?, Difficulty_Level = ?
      WHERE Course_Code = ?
    `;
    
    const [result] = await db.execute(query, [
      Course_Title, 
      Description, 
      Category, 
      Difficulty_Level, 
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First delete related records
    await db.execute('DELETE FROM content WHERE Course_Code = ?', [id]);
    await db.execute('DELETE FROM enrollments WHERE Course_Code = ?', [id]);
    await db.execute('DELETE FROM quizzes WHERE Course_Code = ?', [id]);
    await db.execute('DELETE FROM discussions WHERE Course_Code = ?', [id]);
    
    // Then delete the course
    const [result] = await db.execute('DELETE FROM courses WHERE Course_Code = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};