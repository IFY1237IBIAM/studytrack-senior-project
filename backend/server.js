// Server Entry Point
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { users, tasks } = require("./data/store");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// --- AUTH ROUTES ---
app.get("/", (req, res) => {
    res.send("API is running... Visit /api/test to check endpoints.");
});

app.get("/api/test", (req, res) => {
    console.log("Test route success");
    res.json({ message: "Test route" });
})

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
        };

        users.push(newUser);

        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "30d" });

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find((u) => u.email === email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// --- TASK ROUTES ---

// Get Tasks
app.get("/api/tasks", protect, (req, res) => {
    const userTasks = tasks.filter((task) => task.userId === req.user.id);
    res.json(userTasks);
});

// Add Task
app.post("/api/tasks", protect, (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Please add a task title" });
    }

    const newTask = {
        id: tasks.length + 1,
        userId: req.user.id,
        title,
        status: "To-Do", // Default status
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update Task Status
app.put("/api/tasks/:id", protect, (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
    }

    task.status = req.body.status || task.status;
    res.json(task);
});

// Delete Task
app.delete("/api/tasks/:id", protect, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const task = tasks[taskIndex];
    if (task.userId !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ id: taskId });
});

// --- CONTACT FORM ROUTE ---
app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Contact Form Submission:", { name, email, subject, message });
    res.json({ message: "Message sent successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
