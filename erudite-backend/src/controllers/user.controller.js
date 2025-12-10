const userService = require("../services/user.service");
const db = require("../db/database");
const bcrypt = require("bcryptjs");


exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { roleType } = req.body;

  try {
    // Update USER roleType
    await db.execute(
      `UPDATE USER SET Role_Type = ? WHERE User_ID = ?`,
      [roleType, userId]
    );

    // Remove from Student table
    await db.execute(
      `DELETE FROM STUDENT WHERE S_User_ID = ?`,
      [userId]
    );

    // Remove from Instructor table
    await db.execute(
      `DELETE FROM INSTRUCTOR WHERE I_User_ID = ?`,
      [userId]
    );

    // Insert new profile
    if (roleType === "Student") {
      await db.execute(`INSERT INTO STUDENT (S_User_ID) VALUES (?)`, [userId]);
    }

    if (roleType === "Instructor") {
      await db.execute(`INSERT INTO INSTRUCTOR (I_User_ID) VALUES (?)`, [userId]);
    }

    res.json({ message: "Role updated successfully" });

  } catch (error) {
    console.error("updateUserRole error:", error);
    res.status(500).json({ error: "Failed to update role" });
  }
};


exports.changePassword = async (req, res, next) => {
  try {
    await userService.changePassword(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

// Add this method to user.controller.js if not exists
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, roleType, contact } = req.body;
  
  try {
    const conn = await db.getConnection();
    await conn.beginTransaction();
    
    try {
      // 1. Create user in USER table
      const hashed = await bcrypt.hash(password, 10);
      const [userResult] = await conn.execute(
        `INSERT INTO USER (First_Name, Last_Name, Email, Password, Role_Type)
         VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, hashed, roleType || "Student"]
      );
      
      const userId = userResult.insertId;
      
      // 2. Insert contact if provided
      if (contact) {
        await conn.execute(
          `INSERT INTO USER_CONTACT_NO (User_ID, Contact_No) VALUES (?, ?)`,
          [userId, contact]
        );
      }
      
      // 3. Auto-insert into Student/Instructor tables
      if (roleType === "Student") {
        await conn.execute(`INSERT INTO STUDENT (S_User_ID) VALUES (?)`, [userId]);
      }
      
      if (roleType === "Instructor") {
        await conn.execute(`INSERT INTO INSTRUCTOR (I_User_ID) VALUES (?)`, [userId]);
      }
      
      await conn.commit();
      
      res.status(201).json({ 
        userId, 
        firstName, 
        lastName, 
        email, 
        role: roleType || "Student",
        contact: contact || null
      });
      
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
    
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // 1. FIRST delete from child tables
    await db.execute('DELETE FROM user_contact_no WHERE User_ID = ?', [userId]);
    await db.execute('DELETE FROM enrollment WHERE S_User_ID = ?', [userId]);
    await db.execute('DELETE FROM course WHERE I_USER_ID = ?', [userId]);
    await db.execute(`DELETE FROM STUDENT WHERE S_User_ID = ?`, [userId]);  // ✅
    await db.execute(`DELETE FROM INSTRUCTOR WHERE I_User_ID = ?`, [userId]); // ✅
    // await db.execute(`DELETE FROM USER WHERE User_ID = ?`, [id]);

    await db.execute('DELETE FROM USER WHERE User_ID = ?', [userId]);

    res.json({ message: "User removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
