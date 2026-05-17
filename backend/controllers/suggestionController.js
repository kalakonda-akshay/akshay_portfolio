const nodemailer = require("nodemailer");
const Suggestion = require("../models/Suggestion");

const createTransporter = () => {
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
};

const createSuggestion = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("Name, email, subject and message are required.");
    }

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

    res.status(201).json({
      message: transporter ? "Suggestion saved and emailed." : "Suggestion saved. Configure SMTP env vars to enable email delivery.",
      suggestionId: suggestion._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSuggestion };
