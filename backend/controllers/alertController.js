const Alert = require('../models/Alert');
const logger = require('../utils/logger');

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    logger.error(`Get alerts error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    logger.error(`Get alert by ID error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch alert' });
  }
};

const createAlert = async (req, res) => {
  try {
    const { crisisType, severity, location, recommendations, confidence } = req.body;

    const alert = new Alert({
      crisisType,
      severity,
      location,
      recommendations,
      confidence,
    });

    const savedAlert = await alert.save();
    logger.info(`Alert created: ${savedAlert._id}`);

    res.status(201).json(savedAlert);
  } catch (error) {
    logger.error(`Create alert error: ${error.message}`);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

module.exports = {
  getAlerts,
  getAlertById,
  createAlert,
};