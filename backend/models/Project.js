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

module.exports = mongoose.model("Project", projectSchema);
