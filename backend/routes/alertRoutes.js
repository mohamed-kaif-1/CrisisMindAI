const express = require('express');
const { getAlerts, getAlertById, createAlert } = require('../controllers/alertController');

const router = express.Router();

// GET /api/alerts
router.get('/alerts', getAlerts);

// GET /api/alerts/:id
router.get('/alerts/:id', getAlertById);

// POST /api/alerts
router.post('/alerts', createAlert);

module.exports = router;