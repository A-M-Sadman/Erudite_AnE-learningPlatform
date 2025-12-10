const db = require("../db/database");

exports.getContentCount = async () => {
  const [rows] = await db.execute("SELECT COUNT(*) AS count FROM CONTENT");
  return rows[0].count;
}

exports.getCourseContents = async (courseCode) => {
  const [rows] = await db.execute("SELECT * FROM CONTENT WHERE Course_Code = ?", [courseCode]);
  return rows;
};

exports.getContentById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM CONTENT WHERE ContentID = ?", [id]);
  return rows[0];
};

exports.createContent = async ({ courseCode, title, description, uploadDate, video, documentation, presentation, assignment }) => {
  const [result] = await db.execute(
    `INSERT INTO CONTENT (Course_Code, Title, Description, UploadDate, Video, Documentation, Presentation, Assignment)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [courseCode, title, description, uploadDate || null, video ? 1 : 0, documentation ? 1 : 0, presentation ? 1 : 0, assignment ? 1 : 0]
  );
  return { contentId: result.insertId };
};

exports.updateContent = async (id, payload) => {
  const { title, description } = payload;
  await db.execute("UPDATE CONTENT SET Title = ?, Description = ? WHERE ContentID = ?", [title, description, id]);
};

exports.deleteContent = async (id) => {
  await db.execute("DELETE FROM CONTENT WHERE ContentID = ?", [id]);
};

exports.getAllContents = async () => {
  const [rows] = await db.execute(`
    SELECT c.*, cr.Course_Title 
    FROM CONTENT c
    LEFT JOIN COURSE cr ON c.Course_Code = cr.Course_Code
  `);
  return rows;
};