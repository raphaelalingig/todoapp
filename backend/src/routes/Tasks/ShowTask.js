import express from "express";
import db from "../../config/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Please provide user_id.",
    });
  }

  try {
    const [rows] = await db.query(`SELECT * FROM tasks WHERE user_id = ?`, [
      user_id,
    ]);

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully.",
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks.",
    });
  }
});

export default router;
