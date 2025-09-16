import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Assessment from "../models/assessment.js";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      name,
      email,
      phone,
      password,
      role,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(admin._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Admin signed in",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
};


export const getAdminProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const admin = await Admin.findById(id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching admin", error: err.message });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out" });
};

// Dashboard
const getAgeGroup = (age) => {
  if (age >= 15 && age <= 18) return "15-18";
  if (age >= 19 && age <= 22) return "19-22";
  if (age >= 23 && age <= 26) return "23-26";
  if (age >= 27 && age <= 30) return "27-30";
  return "Other";
};

export const getDashboardData = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments();
    const assessmentsToday = await Assessment.countDocuments({
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    const highRiskCases = await Assessment.countDocuments({
      "riskLevels.overall": "High",
    });
    const reportsGenerated = await Assessment.countDocuments();

    const usageStats = [
      { name: "Total Patients", value: totalPatients, change: "+12%", color: "#10b981", icon: "Users" },
      { name: "Assessments Today", value: assessmentsToday, change: "+5%", color: "#3b82f6", icon: "Activity" },
      { name: "High Risk Cases", value: highRiskCases, change: "+8%", color: "#ef4444", icon: "AlertTriangle" },
      { name: "Reports Generated", value: reportsGenerated, change: "+15%", color: "#8b5cf6", icon: "FileText" },
    ];

    // Recent assessments 
    const recentAssessments = await Assessment.find()
      .sort({ date: -1 })
      .limit(10)
      .populate("userId", "name age gender");

    // Gender distribution
    const genderAgg = await User.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);
    const genderDistribution = genderAgg.map((g) => ({
      name: g._id,
      value: Math.round((g.count * 100) / totalPatients),
      color: g._id === "Male" ? "#3b82f6" : "#ec4899",
    }));

    // Age group 
    const users = await User.find({}, "age gender");
    const assessments = await Assessment.find({}, "riskScores riskLevels date").populate("userId", "age gender");

    const ageGroupsMap = {};
    users.forEach((u) => {
      const group = getAgeGroup(u.age);
      if (!ageGroupsMap[group]) {
        ageGroupsMap[group] = { age: group, diabetes: 0, cardiovascular: 0, total: 0, male: 0, female: 0 };
      }
      ageGroupsMap[group].total++;
      if (u.gender === "Male") ageGroupsMap[group].male++;
      if (u.gender === "Female") ageGroupsMap[group].female++;
    });

    assessments.forEach((a) => {
      if (!a.userId) return;
      const group = getAgeGroup(a.userId.age);
      if (!ageGroupsMap[group]) return;
      ageGroupsMap[group].diabetes += a.riskScores?.diabetes || 0;
      ageGroupsMap[group].cardiovascular += a.riskScores?.cvd || 0;
    });

    const ageGroupData = Object.values(ageGroupsMap);

    // trend data 
    const trendAgg = await Assessment.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          low: { $sum: { $cond: [{ $eq: ["$riskLevels.overall", "Low"] }, 1, 0] } },
          medium: { $sum: { $cond: [{ $eq: ["$riskLevels.overall", "Medium"] }, 1, 0] } },
          high: { $sum: { $cond: [{ $eq: ["$riskLevels.overall", "High"] }, 1, 0] } },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const riskTrendData = trendAgg.map((t) => ({
      month: months[t._id - 1],
      low: t.low,
      medium: t.medium,
      high: t.high,
    }));

    res.json({
      usageStats,
      recentAssessments,
      genderDistribution,
      ageGroupData,
      riskTrendData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};