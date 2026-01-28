import express from "express";
import { updateTask } from "../controller/updateTask.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/tasks/:id", protect, updateTask);

export default router;