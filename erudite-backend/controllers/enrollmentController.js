const db = require('../config/database');

exports.getAllEnrollments = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM enrollments');
    res.json(results);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    const { S_User_ID, Course_Code, enrollment_Date, Lessons_Completed, Total_Lessons, Status } = req.body;
    
    const query = `
      INSERT INTO enrollments (S_User_ID, Course_Code, enrollment_Date, Lessons_Completed, Total_Lessons, Status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      S_User_ID, 
      Course_Code, 
      enrollment_Date, 
      Lessons_Completed, 
      Total_Lessons, 
      Status
    ]);
    
    res.status(201).json({ 
      message: 'Enrollment created successfully', 
      enrollmentId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const { Lessons_Completed, Total_Lessons, Status } = req.body;
    
    const query = `
      UPDATE enrollments 
      SET Lessons_Completed = ?, Total_Lessons = ?, Status = ?
      WHERE Enrollment_ID = ?
    `;
    
    const [result] = await db.execute(query, [
      Lessons_Completed, 
      Total_Lessons, 
      Status, 
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    res.json({ message: 'Enrollment updated successfully' });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM enrollments WHERE Enrollment_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    res.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};