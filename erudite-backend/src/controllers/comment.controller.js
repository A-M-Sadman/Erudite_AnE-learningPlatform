const db = require('../db/database'); 
const commentService = require('../services/comment.service');

exports.getAllComments = async (req, res) => {
  try {
    const { discussionId } = req.query;
    const comments = await commentService.getAllComments(discussionId);
    res.json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    // Get data from request body
    const commentData = req.body; // This defines commentData
    console.log('📥 Received comment data:', commentData);
    
    const { discussionId, userId, comment } = commentData;
    
    // Check if DISCUSSION_COMMENT has User_ID column
    const [columns] = await db.execute("SHOW COLUMNS FROM DISCUSSION_COMMENT WHERE Field = 'User_ID'");
    
    let result;
    
    if (columns.length > 0) {
      // Has User_ID column
      const sql = `INSERT INTO DISCUSSION_COMMENT (Discussion_ID, User_ID, Comment, Comment_Date) 
                   VALUES (?, ?, ?, NOW())`;
      [result] = await db.execute(sql, [discussionId, userId, comment]);
    } else {
      // No User_ID column (based on your schema)
      const sql = `INSERT INTO DISCUSSION_COMMENT (Discussion_ID, Comment, Comment_Date) 
                   VALUES (?, ?, NOW())`;
      [result] = await db.execute(sql, [discussionId, comment]);
    }
    
    res.status(201).json({
      Comment_ID: result.insertId,
      Discussion_ID: discussionId,
      Comment: comment,
      Comment_Date: new Date().toISOString().split('T')[0]
    });
    
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: error.message });
  }
};