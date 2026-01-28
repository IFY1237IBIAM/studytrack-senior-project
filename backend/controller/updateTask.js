import taskModel from "../models/taskModel.js";

export const updateTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id)

        //check if the task is found
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        //check if the user is authorized to update the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" })
        }

        //update Task Status
        task.status = req.body.status

        await task.save()

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}