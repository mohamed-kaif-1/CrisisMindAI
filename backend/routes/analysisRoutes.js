const express = require("express");
const router = express.Router();

const { analyzeCrisis } = require("../controllers/geminiController");

router.post("/", analyzeCrisis);

module.exports = router;