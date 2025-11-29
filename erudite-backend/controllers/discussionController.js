const db = require('../config/database');

exports.getAllDiscussions = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM discussions');
    res.json(results);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createDiscussion = async (req, res) => {
  try {
    const { Post, User_ID, Course_Code, Status, Reply_Count } = req.body;
    
    const query = `
      INSERT INTO discussions (Post, User_ID, Course_Code, Status, Reply_Count)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      Post, 
      User_ID, 
      Course_Code, 
      Status, 
      Reply_Count
    ]);
    
    res.status(201).json({ 
      message: 'Discussion created successfully', 
      discussionId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { Post, Status, Reply_Count } = req.body;
    
    const query = `
      UPDATE discussions 
      SET Post = ?, Status = ?, Reply_Count = ?
      WHERE DISCUSSION_ID = ?
    `;
    
    const [result] = await db.execute(query, [
      Post, 
      Status, 
      Reply_Count, 
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    res.json({ message: 'Discussion updated successfully' });
  } catch (error) {
    console.error('Error updating discussion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM discussions WHERE DISCUSSION_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};