const db = require("../db/database");

exports.createTicket = async ({ tUserId, sUserId, problemTitle, status, category, createTime }) => {
  const [result] = await db.execute(
    `INSERT INTO TECH_SUPPORT (T_User_ID, S_User_ID, Problem_Title, Status, Category, Create_Time)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [tUserId || null, sUserId || null, problemTitle, status || "open", category || null, createTime || null]
  );
  return result.insertId;
};

exports.getStudentTickets = async (sUserId) => {
  const [rows] = await db.execute("SELECT * FROM TECH_SUPPORT WHERE S_User_ID = ?", [sUserId]);
  return rows;
};

exports.getTicket = async (problemId) => {
  const [rows] = await db.execute("SELECT * FROM TECH_SUPPORT WHERE Problem_ID = ?", [problemId]);
  return rows[0];
};

exports.addSolution = async (problemId, { itSolution, timeStamp, stProblem }) => {
  await db.execute("INSERT INTO TECH_SUPPORT_STUDENT (Problem_ID, It_Solution, St_Problem, TimeStamp) VALUES (?, ?, ?, ?)", [problemId, itSolution, stProblem || null, timeStamp || null]);
};

exports.getAllTickets = async () => {
  const [rows] = await db.execute(`
    SELECT t.*, u.First_Name, u.Last_Name 
    FROM TECH_SUPPORT t
    LEFT JOIN USER u ON t.S_User_ID = u.User_ID
  `);
  return rows;
};