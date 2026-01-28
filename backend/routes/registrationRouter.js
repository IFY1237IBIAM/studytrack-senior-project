import express from "express";
import { create } from "../controller/register.js";

const router = express.Router();

router.post("/register", create);

export default router;
