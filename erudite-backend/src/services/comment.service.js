// backend/services/comment.service.js
const db = require('../db/database'); // Make sure this line exists

exports.getAllComments = async (discussionId = null) => {
  try {
    let sql = `SELECT 
                dc.Comment_ID,
                dc.Discussion_ID,
                dc.Comment,
                dc.Comment_Date,
                d.User_ID,
                u.First_Name,
                u.Last_Name
               FROM DISCUSSION_COMMENT dc
               JOIN DISCUSSION d ON dc.Discussion_ID = d.Discussion_ID
               JOIN USER u ON d.User_ID = u.User_ID`;
    
    if (discussionId) {
      sql += ` WHERE dc.Discussion_ID = ? ORDER BY dc.Comment_Date ASC`;
      const [rows] = await db.execute(sql, [discussionId]);
      return rows;
    }
    
    sql += ` ORDER BY dc.Comment_Date DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

exports.createComment = async (commentData) => {
  try {
    const { discussionId, userId, comment } = commentData;
    
    // Since DISCUSSION_COMMENT doesn't have User_ID column (based on your schema)
    const sql = `INSERT INTO DISCUSSION_COMMENT (Discussion_ID, Comment, Comment_Date) 
                 VALUES (?, ?, NOW())`;
    
    const [result] = await db.execute(sql, [discussionId, comment]);
    
    return { 
      Comment_ID: result.insertId, 
      Discussion_ID: discussionId,
      Comment: comment,
      Comment_Date: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

exports.deleteComment = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM DISCUSSION_COMMENT WHERE Comment_ID = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};