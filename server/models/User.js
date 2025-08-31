import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  age:        { type: Number },
  gender:     { type: String },
  height:     { type: Number },
  weight:     { type: Number },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);