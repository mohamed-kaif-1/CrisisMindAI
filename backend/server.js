const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables (must happen before requiring modules that depend on them)
dotenv.config();

const connectDB = require("./config/db");

const crisisRoutes = require("./routes/crisisRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const alertRoutes = require("./routes/alertRoutes");

// Connect to MongoDB
//connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running");
});


// Routes
app.use("/api/crisis", crisisRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/alerts", alertRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "CrisisMind AI Backend is running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});