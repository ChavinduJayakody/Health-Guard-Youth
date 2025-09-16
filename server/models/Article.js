import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true },
    status: { type: String, enum: ["Draft", "Published", "Archived"], default: "Draft" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
)
export default mongoose.model("Article", ArticleSchema)
