const analyzeSignals = async (signals) => {
  return JSON.stringify({
    crisisType: "stress/anxiety",
    severity: "Medium",
    recommendations: [
      "Take rest",
      "Talk to a trusted person",
      "Do breathing exercises"
    ],
    confidence: 0.85
  });
};

module.exports = { analyzeSignals };