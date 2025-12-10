const db = require("../db/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async ({ firstName, lastName, email, password, roleType }) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await conn.execute(
      `INSERT INTO USER (First_Name, Last_Name, Email, Password, Role_Type)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashed, roleType || "Student"]
    );
    await conn.commit();
    return { userId: result.insertId, email };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.login = async ({ email, password }) => {
  const [rows] = await db.execute("SELECT * FROM USER WHERE Email = ?", [email]);
  const user = rows[0];
  if (!user) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, user.Password);
  if (!match) throw new Error("Invalid credentials");
  const token = jwt.sign({ userId: user.User_ID, role: user.Role_Type }, process.env.JWT_SECRET || "secret", { expiresIn: "8h" });
  return token;
};
