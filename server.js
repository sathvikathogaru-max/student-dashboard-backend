import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Student Dashboard Backend is running 🚀");
});

// Example API
app.get("/students", (req, res) => {
  res.json([
    { name: "Suri" },
    { name: "Geetha" }
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});