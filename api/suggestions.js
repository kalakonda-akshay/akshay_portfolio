const nodemailer = require("nodemailer");
const connectDB = require("./_db");
const { Suggestion } = require("./_models");

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Name, email, subject and message are required." });
    }

    await connectDB();
    const suggestion = await Suggestion.create({ name, email, subject, message });
    const transporter = createTransporter();

    if (transporter) {
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: process.env.MAIL_TO || "akshaykalakonda9@gmail.com",
        replyTo: email,
        subject: `Portfolio suggestion: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    }

    return res.status(201).json({
      message: transporter ? "Suggestion saved and emailed." : "Suggestion saved. Configure SMTP to enable email delivery.",
      suggestionId: suggestion._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
