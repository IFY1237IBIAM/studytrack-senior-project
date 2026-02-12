import express from "express";
import { disableUser, enableUser } from "../controller/userStatus.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.put("/disableUser/:id", protect, admin, disableUser);
router.put("/enableUser/:id", protect, admin, enableUser);

export default router;