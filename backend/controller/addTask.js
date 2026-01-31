import taskModel from "../models/taskModel.js";
import Notification from "../models/Notification.js";

export const addTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await taskModel.create({
            title,
            user: req.user.id,
        });

        // 🔔 Notification when task is created
        await Notification.create({
            user: req.user.id,
            message: `New task "${task.title}" was created`,
            type: "info",
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
