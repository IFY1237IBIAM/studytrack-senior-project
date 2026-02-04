import express from "express";
import { getMe } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users/me", protect, getMe);

export default router;
