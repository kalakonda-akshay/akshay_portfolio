const express = require("express");
const { getProjects, seedProjects } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.post("/seed", seedProjects);

module.exports = router;
