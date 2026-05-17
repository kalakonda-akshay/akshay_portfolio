const express = require("express");
const { createSuggestion } = require("../controllers/suggestionController");

const router = express.Router();

router.post("/", createSuggestion);

module.exports = router;
