import express from "express";
import { getTask } from "../controller/getTask.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/tasks", protect, getTask);

export default router;