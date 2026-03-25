const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const errorHandler = require("./middleware/errorHandling.js");
const path = require("path");
const { adminAuth } = require("./middleware/adminAuth.js");
const { validateToken } = require("./middleware/validateToken");

const authRoutes = require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js");
const requestRoutes = require("./routes/request.route.js");
const donationRoutes = require("./routes/donation.route.js");
const userRoutes = require("./routes/user.route.js");
const volunteerRoutes = require("./routes/volunteer.route.js");
const historyRoutes = require("./routes/donationHistoryRoutes.js");
const metrics = require("./routes/metrics.route.js");
const contactRoutes = require("./routes/contact.route.js");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => console.log("Connected to Database successfully..."))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Serve static images
app.use("/images", express.static(path.join(__dirname, "controllers", "images")));

// Public Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/metrics", metrics);

// Protected Routes
app.use("/api/user", validateToken(["donor", "receiver", "volunteer"]), userRoutes);
app.use("/api/requests", validateToken(["receiver"]), requestRoutes);
app.use("/api/donation", validateToken(["donor", "admin"]), donationRoutes);
app.use("/api/volunteer", validateToken(["volunteer"]), volunteerRoutes);
app.use("/api/history", validateToken(["donor", "receiver", "volunteer"]), historyRoutes);

// Admin Routes (protected with token + admin role check)
app.use("/api/admin", validateToken(["admin"]), adminAuth, adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`AnnSeva server running at http://localhost:${PORT}`);
});

