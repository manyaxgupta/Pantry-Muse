import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
// Load environment variables
dotenv.config();
//console.log("Server Key:", process.env.GEMINI_API_KEY);
console.log("OPENROUTER_API_KEY =", process.env.OPENROUTER_API_KEY);
// Fix DNS issues (optional, useful for some MongoDB Atlas connections)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ai", aiRoutes);
// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});