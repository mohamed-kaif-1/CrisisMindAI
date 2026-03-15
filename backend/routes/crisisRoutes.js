const express = require('express');
const { getSignals } = require('../controllers/crisisController');

const router = express.Router();

// GET /api/signals
router.get('/signals', getSignals);

module.exports = router;