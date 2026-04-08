import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* Test route */
app.get("/", (req, res) => {
  res.send("Student Dashboard Backend is running 🚀");
});

/* Example API route */
app.get("/students", (req, res) => {
  const students = [
    { name: "Suri", math: 85, physics: 78, biology: 90 },
    { name: "Geetha", math: 92, physics: 88, biology: 84 },
    { name: "Sunitha", math: 70, physics: 75, biology: 80 }
  ];

  res.json(students);
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});