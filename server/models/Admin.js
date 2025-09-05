import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter admin name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "Healthcare Administrator",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;