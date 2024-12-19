import express from "express";
import db from "../../config/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password.",
    });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: rows,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
  } catch (error) {}
});

export default router;
