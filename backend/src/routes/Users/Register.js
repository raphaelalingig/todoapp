import express from "express";
import db from "../../config/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide first name, last name, email and password.",
    });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password]
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user.",
    });
  }
});

export default router;
