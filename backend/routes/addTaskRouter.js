import express from "express";
import { addTask } from "../controller/addTask.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks", protect, addTask);

export default router;
