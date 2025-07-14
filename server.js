const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./Routes/tokenRoutes");

const app = express();
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use(
  cors({
    origin: ["https://your-frontend.onrender.com", "http://localhost:5173"],

    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/api", authRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("API server is running");
});

// Catch all other routes
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
