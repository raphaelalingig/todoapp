import express from "express";
import db from "../../config/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, status, user_id } = req.body;

  if (!title || !description || !status || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, description, status and user_id.",
    });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
      [title, description, status, user_id]
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task.",
    });
  }
});
export default router;
