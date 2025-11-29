const db = require('../config/database');

exports.getAllContent = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM content');
    res.json(results);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createContent = async (req, res) => {
  try {
    const { Title, Description, Content_Category, Course_Code, Status } = req.body;
    
    const query = `
      INSERT INTO content (Title, Description, Content_Category, Course_Code, Status)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      Title, 
      Description, 
      Content_Category, 
      Course_Code, 
      Status
    ]);
    
    res.status(201).json({ 
      message: 'Content created successfully', 
      contentId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Description, Content_Category, Status } = req.body;
    
    const query = `
      UPDATE content 
      SET Title = ?, Description = ?, Content_Category = ?, Status = ?
      WHERE ContentID = ?
    `;
    
    const [result] = await db.execute(query, [
      Title, 
      Description, 
      Content_Category, 
      Status, 
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM content WHERE ContentID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};