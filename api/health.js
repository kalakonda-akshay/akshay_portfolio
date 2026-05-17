module.exports = function handler(req, res) {
  res.status(200).json({ status: "healthy", service: "Akshay portfolio API", time: new Date().toISOString() });
};
