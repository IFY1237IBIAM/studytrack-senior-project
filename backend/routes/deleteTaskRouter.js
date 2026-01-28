import express from "express";
import { deleteTask } from "../controller/deleteTask.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/tasks/:id", protect, deleteTask);

export default router;