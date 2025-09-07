import mongoose from "mongoose";
import Assessment from "../models/assessment.js";
import User from "../models/User.js";


export const createAssessment = async (req, res) => {
  try {
    const { userId, date, riskScores, riskLevels, data } = req.body;

    // validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ error: "Invalid or missing userId" });
    }

    // verify user 
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    const assessment = new Assessment({
      userId,
      date,
      riskScores,
      riskLevels,
      data,
    });

    await assessment.save();
    console.log("Assessment saved:", assessment);
    res.status(201).json(assessment);
  } catch (err) {
    console.error("Error saving assessment:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Validation error", details: err.errors });
    }
    res.status(500).json({ error: "Failed to save assessment", details: err.message });
  }
};

export const getUserAssessments = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ error: "Invalid or missing userId" });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch assessments
    const assessments = await Assessment.find({ userId }).sort({ date: -1 });
    console.log(`Fetched ${assessments.length} assessments for user ${userId}`);
    res.status(200).json(assessments);
  } catch (err) {
    console.error("Error fetching user assessments:", err);
    res.status(500).json({ error: "Failed to fetch assessments", details: err.message });
  }
};

export const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid assessment ID:", id);
      return res.status(400).json({ error: "Invalid assessment ID" });
    }
    const assessment = await Assessment.findOne({ _id: id, userId: req.user._id });
    if (!assessment) {
      console.error("Assessment not found or not authorized for ID:", id);
      return res.status(404).json({ error: "Assessment not found or not authorized" });
    }
    console.log("Assessment fetched:", assessment);
    res.json(assessment);
  } catch (err) {
    console.error("Error fetching assessment by ID:", err);
    res.status(500).json({ error: "Failed to fetch assessment", details: err.message });
  }
};
