const connectDB = require("./_db");
const { Project } = require("./_models");

const fallbackProjects = [
  {
    title: "Real-Time Chat Application",
    description: "Built a real-time chat application using MERN Stack and Socket.IO featuring authentication, instant messaging, typing indicators and responsive UI.",
    emoji: "Chat",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    features: ["Authentication", "Instant messaging", "Typing indicators", "Responsive UI"],
    liveLink: "https://chat-app-chi-pink.vercel.app",
    githubLink: "https://github.com/kalakonda-akshay/chat-app",
    featured: true,
  },
  {
    title: "Social Media Platform",
    description: "Built a MERN social platform with responsive feed UI, user-centric flows, API-driven data and deployment-ready frontend.",
    emoji: "Social",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    features: ["Responsive feed", "Profile-ready UI", "Full-stack API flow"],
    liveLink: "https://you-are-an-expert-full-stack-2-bx86debtd.vercel.app/",
    githubLink: "https://github.com/kalakonda-akshay/social-media-platform",
    featured: true,
  },
  {
    title: "Secure Auth",
    description: "Authentication-focused full-stack project with a deployed frontend, structured auth screens and production-minded routing.",
    emoji: "Auth",
    techStack: ["JavaScript", "React", "Node.js", "Authentication", "Vercel"],
    features: ["Login flow", "Secure UI patterns", "Vercel deployment"],
    liveLink: "https://frontend-ruddy-chi-23.vercel.app/",
    githubLink: "https://github.com/kalakonda-akshay/secure-auth",
    featured: true,
  },
  {
    title: "Employee Management",
    description: "TypeScript project for managing employee data with a clean dashboard-style interface and deployed frontend.",
    emoji: "Team",
    techStack: ["TypeScript", "React", "Dashboard", "Vercel"],
    features: ["Employee records", "Typed frontend", "Responsive dashboard"],
    liveLink: "https://employee-tawny-eight.vercel.app",
    githubLink: "https://github.com/kalakonda-akshay/employee",
  },
  {
    title: "ShopFlow",
    description: "Commerce-style web app focused on product browsing, clean UI states and deployment-ready frontend architecture.",
    emoji: "Shop",
    techStack: ["JavaScript", "React", "E-commerce", "Vercel"],
    features: ["Product UI", "Responsive layout", "Live deployment"],
    liveLink: "https://shopflow-ten.vercel.app",
    githubLink: "https://github.com/kalakonda-akshay/shopflow",
  },
  {
    title: "AuraMart",
    description: "Modern marketplace project that strengthens reusable frontend patterns, catalog layouts and polished user flows.",
    emoji: "Mart",
    techStack: ["JavaScript", "React", "UI/UX", "Frontend"],
    features: ["Catalog experience", "Reusable components", "Modern layout"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/auramart",
  },
  {
    title: "BlogFlow",
    description: "Content publishing interface built to practice clean information architecture, article layouts and frontend state handling.",
    emoji: "Blog",
    techStack: ["JavaScript", "React", "Content", "Frontend"],
    features: ["Article layouts", "Clean typography", "Content-focused UI"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/blogflow",
  },
  {
    title: "TaskFlow",
    description: "Productivity project for task organization with a focused UI, action-driven layout and simple project management flows.",
    emoji: "Tasks",
    techStack: ["JavaScript", "React", "Productivity", "UI"],
    features: ["Task organization", "Action-first UI", "Responsive screens"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/taskflow",
  },
  {
    title: "AKS Cyber",
    description: "Automated SQL injection detection framework for penetration testing workflows, banner grabbing and schema discovery.",
    emoji: "Cyber",
    techStack: ["Python", "Cybersecurity", "SQLi", "Automation"],
    features: ["SQLi detection", "Banner grabbing", "Schema extraction"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/aks_cyber",
  },
  {
    title: "Traffic Accident Analyser",
    description: "Data science project that explores accident patterns and predicts high-risk traffic hotspots using Python analysis.",
    emoji: "Data",
    techStack: ["Python", "Data Science", "Pandas", "ML"],
    features: ["EDA", "Hotspot analysis", "Prediction workflow"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/traffic_accident_analyser",
  },
  {
    title: "AI Notes Summarizer",
    description: "AI notes project that turns long academic content into concise study summaries using NLP-focused workflows.",
    emoji: "AI",
    techStack: ["Python", "NLP", "AI", "Summarization"],
    features: ["Text summarization", "Student-focused output", "AI workflow"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/ai-notes-summarizer",
  },
  {
    title: "SmartCity",
    description: "Civic technology project for city-service style workflows, issue reporting concepts and community-first UI thinking.",
    emoji: "City",
    techStack: ["HTML", "CSS", "Civic Tech", "Frontend"],
    features: ["Civic workflows", "Community UI", "Accessible pages"],
    liveLink: "#",
    githubLink: "https://github.com/kalakonda-akshay/SmartCity",
  },
];

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    await connectDB();

    if (req.method === "POST") {
      await Project.deleteMany({});
      const created = await Project.insertMany(fallbackProjects);
      return res.status(201).json({ message: "Projects seeded", count: created.length });
    }

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
