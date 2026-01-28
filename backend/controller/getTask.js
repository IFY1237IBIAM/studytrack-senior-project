import taskModel from "../models/taskModel.js";

export const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}