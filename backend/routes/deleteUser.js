import express from "express";
import { deleteUser } from "../controller/deleteUser.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/deleteUser/:id", protect, admin, deleteUser);

export default router;