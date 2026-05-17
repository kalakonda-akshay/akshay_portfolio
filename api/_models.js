const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    emoji: { type: String, default: "🚀" },
    techStack: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    liveLink: { type: String, default: "#" },
    githubLink: { type: String, default: "https://github.com/kalakonda-akshay" },
    image: { type: String, default: "" },
    solution: { type: String, default: "" },
    results: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const suggestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    subject: { type: String, required: true, trim: true, maxlength: 140 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Suggestion = mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);

module.exports = { Project, Suggestion };
