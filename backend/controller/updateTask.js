import taskModel from "../models/taskModel.js";
import Notification from "../models/Notification.js";

export const updateTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);

        // check if the task is found
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // check if the user is authorized to update the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // update task status
        task.status = req.body.status;
        await task.save();

        // 🎉 Notification when task is completed
        if (req.body.status === "Completed") {
            await Notification.create({
                user: req.user.id,
                message: `Great job! You completed "${task.title}" 🎉`,
                type: "success",
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
