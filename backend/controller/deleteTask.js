import taskModel from "../models/taskModel.js";

export const deleteTask = async (req, res) => {
    const task = await taskModel.findById(req.params.id)

    //check if task is found
    if (!task) {
        return res.status(400).json({ message: "Task not Found" });
    }

    //check if user is authorized to delete the task
    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" })
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" })
}