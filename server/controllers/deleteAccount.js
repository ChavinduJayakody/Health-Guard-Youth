import User from "../models/User.js";
import bcrypt from "bcryptjs";
   
// Delete the user

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user; 

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account", error: err.message });
  }
};