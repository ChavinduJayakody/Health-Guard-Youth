import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  riskScores: {
    diabetes: Number,
    cvd: Number,
    overall: Number,
  },
  riskLevels: {
    diabetes: String,
    cvd: String,
    overall: String,
  },
  data: {
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    exercise_days: Number,
    sleep: Number,
    diet: String,
    smoking: String,
    alcohol: String,
    stress: String,
    sedentary_hours: Number,
  },
});

export default mongoose.model("Assessment", AssessmentSchema);
