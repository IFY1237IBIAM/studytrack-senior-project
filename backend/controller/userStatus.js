import User from "../models/userModel.js";

export const disableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.status = "disabled";
        await user.save();
        res.json({ message: "User disabled" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const enableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.status = "active";
        await user.save();
        res.json({ message: "User enabled" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}