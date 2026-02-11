import userModel from "../models/userModel.js";

export const deleteUser = async (req, res) => {
    const user = await userModel.findById(req.params.id)

    //check if user is found
    if (!user) {
        return res.status(400).json({ message: "User not Found" });
    }

    //check if user is authorized to delete the user
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "User not authorized" })
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" })
} 