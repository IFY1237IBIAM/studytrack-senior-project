import express from "express";
import { getUsers } from "../controller/getUsers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, admin, getUsers);

export default router;