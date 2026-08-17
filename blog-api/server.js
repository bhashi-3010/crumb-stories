const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://crumb-stories-1.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

// Middleware
app.use(express.json());

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", require("./routes/aiRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("My Blog API");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});