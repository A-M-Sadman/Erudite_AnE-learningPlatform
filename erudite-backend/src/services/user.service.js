const db = require("../db/database");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async () => {
  const [rows] = await db.execute(`
    SELECT 
      u.User_ID AS userId, 
      u.First_Name as firstName, 
      u.Last_Name as lastName, 
      u.Email as email, 
      u.Role_Type as role,
      uc.Contact_No as contact
    FROM USER u
    LEFT JOIN User_Contact_no uc ON u.User_ID = uc.User_ID
  `);
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute("SELECT User_ID as userId, First_Name as firstName, Last_Name as lastName, Email as email, Role_Type as role FROM USER WHERE User_ID = ?", [id]);
  return rows[0];
};

exports.updateUser = async (id, payload) => {
  const { firstName, lastName, email } = payload;
  await db.execute("UPDATE USER SET First_Name = ?, Last_Name = ?, Email = ? WHERE User_ID = ?", [firstName, lastName, email, id]);
};

exports.changePassword = async (id, { oldPassword, newPassword }) => {
  const [rows] = await db.execute("SELECT Password FROM USER WHERE User_ID = ?", [id]);
  const user = rows[0];
  if (!user) throw new Error("User not found");
  const ok = await bcrypt.compare(oldPassword, user.Password);
  if (!ok) throw new Error("Old password incorrect");
  const hashed = await bcrypt.hash(newPassword, 10);
  await db.execute("UPDATE USER SET Password = ? WHERE User_ID = ?", [hashed, id]);
};

// Add these methods to user.service.js
exports.createUser = async ({ firstName, lastName, email, password, roleType, contact }) => {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    `INSERT INTO USER (First_Name, Last_Name, Email, Password, Role_Type, Contact_no)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, email, hashed, roleType || "Student", contact || null]
  );
  return { userId: result.insertId, email, role: roleType };
};

exports.deleteUser = async (id) => {
  await db.execute('DELETE FROM USER WHERE User_ID = ?', [id]);
};