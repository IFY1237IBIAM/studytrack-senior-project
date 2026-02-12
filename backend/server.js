import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load env vars immediately
dotenv.config();

import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Task from "./models/taskModel.js";
import { protect } from "./middleware/authMiddleware.js";
import registrationRouter from "./routes/registrationRouter.js";
import loginRouter from "./routes/loginRouter.js";
import getTaskRouter from "./routes/getTasksRouter.js";
import addTaskRouter from "./routes/addTaskRouter.js";
import updateTaskRouter from "./routes/updateTaskRouter.js";
import deleteTaskRouter from "./routes/deleteTaskRouter.js";
import generateToken from "./utils/generateToken.js";
import notificationsRouter from "./routes/notifications.js";
import userRoutes from "./routes/userRoutes.js";
import getUsersRouter from "./routes/getUsers.js";
import deleteUserRouter from "./routes/deleteUser.js";
import userStatusRouter from "./routes/userStatusRouter.js";


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || process.env.BACKEND_PORT || 3000;

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// --- AUTH ROUTES ---
app.get("/", (req, res) => {
    res.send("API is running... Visit /api/test to check endpoints.");
});

// Use registration router
app.use("/api", registrationRouter);



app.use("/api/notifications", notificationsRouter);


app.use("/api", userRoutes);

// Login
app.use("/api", loginRouter);

// --- TASK ROUTES ---

// Get Tasks
app.use("/api", getTaskRouter);

// Add Task
app.use("/api", addTaskRouter);

// Update Task Status
app.use("/api", updateTaskRouter);

// Delete Task
app.use("/api", deleteTaskRouter);

// Get Users
app.use("/api", getUsersRouter);

// Delete User
app.use("/api", deleteUserRouter);

// Disable User
app.use("/api", userStatusRouter);



// --- CONTACT FORM ROUTE ---
app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Contact Form Submission:", { name, email, subject, message });
    res.json({ message: "Message sent successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
