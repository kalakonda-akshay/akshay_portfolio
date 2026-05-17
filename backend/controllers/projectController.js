const Project = require("../models/Project");

const seedProjects = async (req, res, next) => {
  try {
    const projects = [
      {
        title: "Real-Time Chat Application",
        description: "Built a real-time chat application using MERN Stack and Socket.IO featuring authentication, instant messaging, typing indicators and responsive UI.",
        emoji: "💬",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
        features: ["Authentication", "Instant messaging", "Typing indicators", "Responsive UI"],
        liveLink: "https://chat-app-chi-pink.vercel.app",
        githubLink: "https://github.com/kalakonda-akshay/chat-app",
        featured: true,
      },
      {
        title: "Social Media Platform",
        description: "Built a MERN social platform with responsive feed UI, user-centric flows, API-driven data and deployment-ready frontend.",
        emoji: "👥",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        features: ["Responsive feed", "Profile flows", "REST API structure"],
        liveLink: "https://you-are-an-expert-full-stack-2-bx86debtd.vercel.app/",
        githubLink: "https://github.com/kalakonda-akshay/social-media-platform",
        featured: true,
      },
      {
        title: "Internship Projects",
        description: "Curated recent deployed work including Secure Auth, Employee, ShopFlow, AuraMart, BlogFlow and TaskFlow with GitHub source references.",
        emoji: "🚀",
        techStack: ["React", "TypeScript", "JavaScript", "Vercel"],
        features: ["Secure Auth", "Employee dashboard", "ShopFlow app"],
        liveLink: "https://frontend-ruddy-chi-23.vercel.app/",
        githubLink: "https://github.com/kalakonda-akshay",
      },
      {
        title: "GrameenTrack",
        description: "AI platform for tracking rural housing construction using ML.",
        emoji: "🛣",
        techStack: ["Python", "ML", "AI"],
        features: ["Progress roadmap", "Stakeholder visibility", "Live deployment"],
        liveLink: "https://grameen-build-track.base44.app",
        githubLink: "https://github.com/kalakonda-akshay",
      },
    ];

    await Project.deleteMany({});
    await Project.insertMany(projects);
    res.status(201).json({ message: "Projects seeded", count: projects.length });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, seedProjects };
