const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  crisisType: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High', 'Critical'],
  },
  location: {
    type: String,
    required: true,
  },
  recommendations: [{
    type: String,
  }],
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Alert', AlertSchema);