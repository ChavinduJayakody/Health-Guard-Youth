import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user; 

    const { name, email, age, gender, height, weight } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, gender, height, weight },
      { new: true, runValidators: true }
    ).select("-password"); 

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};


// Change Password
export const changePassword = async (req, res) => {
    const {id} = req.user;

  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(id)

    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" })

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: "Password updated successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}