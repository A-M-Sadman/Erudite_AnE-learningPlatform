const db = require('../config/database');

exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { First_Name, Last_Name, Email, Password, Role_Type, Contact_no } = req.body;
    
    const query = `
      INSERT INTO users (First_Name, Last_Name, Email, Password, Role_Type, Contact_no)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      First_Name, 
      Last_Name, 
      Email, 
      Password, 
      Role_Type, 
      Contact_no
    ]);
    
    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { First_Name, Last_Name, Email, Role_Type, Contact_no } = req.body;
    
    const query = `
      UPDATE users 
      SET First_Name = ?, Last_Name = ?, Email = ?, Role_Type = ?, Contact_no = ?
      WHERE User_ID = ?
    `;
    
    const [result] = await db.execute(query, [
      First_Name, 
      Last_Name, 
      Email, 
      Role_Type, 
      Contact_no, 
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM users WHERE User_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};