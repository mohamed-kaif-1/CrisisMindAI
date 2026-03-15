const { analyzeSignals } = require("../services/geminiService");

const analyzeCrisis = async (req, res) => {
  try {
    const { signals } = req.body;

    if (!signals || !Array.isArray(signals)) {
      return res.status(400).json({
        error: "Invalid request. Signals must be an array."
      });
    }

    const result = await analyzeSignals(signals);

    let parsedResult = result;
    if (typeof result === "string") {
      try {
        parsedResult = JSON.parse(result);
      } catch (parseError) {
        return res.status(500).json({
          error: "Gemini did not return valid JSON",
          rawResponse: result,
        });
      }
    }

    res.status(200).json(parsedResult);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { analyzeCrisis };