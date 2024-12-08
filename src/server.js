const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes")

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err.message));

// Routes
app.use("/files", fileRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
