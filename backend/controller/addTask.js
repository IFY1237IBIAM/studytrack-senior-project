import taskModel from "../models/taskModel.js";

export const addTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await taskModel.create({
            title,
            user: req.user.id,
        })

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}