const db = require("../db/database");

exports.createDiscussion = async ({ postDate, post }) => {
  const [result] = await db.execute("INSERT INTO DISCUSSION (Post_Date, Post) VALUES (?, ?)", [postDate || null, post]);
  return result.insertId;
};

exports.updateDiscussion = async (id, { post }) => {
  await db.execute("UPDATE DISCUSSION SET Post = ? WHERE Discussion_ID = ?", [post, id]);
};

exports.deleteDiscussion = async (id) => {
  await db.execute("DELETE FROM DISCUSSION WHERE Discussion_ID = ?", [id]);
};

exports.getDiscussion = async (id) => {
  const [rows] = await db.execute("SELECT * FROM DISCUSSION WHERE Discussion_ID = ?", [id]);
  return rows[0];
};

exports.addComment = async (discussionId, { comment, commentDate }) => {
  await db.execute("INSERT INTO DISCUSSION_COMMENT (Discussion_ID, Comment, Comment_Date) VALUES (?, ?, ?)", [discussionId, comment, commentDate || null]);
};

exports.getComments = async (discussionId) => {
  const [rows] = await db.execute("SELECT * FROM DISCUSSION_COMMENT WHERE Discussion_ID = ?", [discussionId]);
  return rows;
};

exports.getAllDiscussions = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        d.*,
        u.First_Name,
        u.Last_Name,
        c.Course_Title,
        COUNT(dc.Comment_ID) as Reply_Count
      FROM DISCUSSION d
      LEFT JOIN USER u ON d.User_ID = u.User_ID
      LEFT JOIN COURSE c ON d.Course_Code = c.Course_Code
      LEFT JOIN DISCUSSION_COMMENT dc ON d.Discussion_ID = dc.Discussion_ID
      GROUP BY d.Discussion_ID
      ORDER BY d.Post_Date DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error in getAllDiscussions:', error);
    throw error;
  }

};