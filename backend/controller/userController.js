import User from "../models/userModel.js";

export const getMe = async (req, res) => {
  try {
    // req.user is already set by protect middleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
