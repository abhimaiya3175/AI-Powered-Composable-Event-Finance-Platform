const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
// CORS configuration for cross-origin requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use("/events", require("./routes/eventRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));

const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));




// Test route
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const REQUESTED_PORT = Number(process.env.PORT) || 5000;
const FALLBACK_ATTEMPTS = process.env.NODE_ENV === "production" ? 1 : 6;

function startServer(port, remainingAttempts) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on("error", (error) => {
    const canRetry = error.code === "EADDRINUSE" && remainingAttempts > 1;

    if (canRetry) {
      console.warn(`Port ${port} is busy. Retrying on ${port + 1}...`);
      startServer(port + 1, remainingAttempts - 1);
      return;
    }

    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
}

startServer(REQUESTED_PORT, FALLBACK_ATTEMPTS);
