import express from "express";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "Pending",
      user: req.user._id,
    });

    // 🔔 Notification when task is created
    await Notification.create({
      user: req.user._id,
      message: `New task "${task.title}" was created`,
      type: "info",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/tasks
 * @desc    Get tasks with search, filter, pagination
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status } = req.query;
    page = Number(page);
    limit = Number(limit);

    const query = { user: req.user._id }; // only return tasks for the logged-in user

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    if (status) {
      query.status = status;
    }

    const totalCount = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ tasks, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task status
 * @access  Private
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    // 🎉 Notification when task is completed
    if (status === "Completed") {
      await Notification.create({
        user: req.user._id,
        message: `Great job! You completed "${task.title}" 🎉`,
        type: "success",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
