const { getMockSignals } = require('../services/signalService');
const logger = require('../utils/logger');

const getSignals = async (req, res) => {
  try {
    const signals = getMockSignals();
    logger.info(`Retrieved ${signals.length} mock signals`);
    res.json({ signals });
  } catch (error) {
    logger.error(`Get signals error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch signals' });
  }
};

module.exports = {
  getSignals,
};