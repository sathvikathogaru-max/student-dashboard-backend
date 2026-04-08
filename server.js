const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* MongoDB Connection */
mongoose.connect(
"mongodb+srv://teacher:teacher123@cluster0.uakpbjz.mongodb.net/studentdb?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* Root Route */
app.get("/", (req, res) => {
  res.send("Student Portal Backend Running 🚀");
});

/* Teacher Login GET route */
app.get("/teacher-login", (req, res) => {
  res.send("Teacher login API working");
});

/* Student Login GET route */
app.get("/student-login", (req, res) => {
  res.send("Student login API working");
});

/* Student Schema */
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  marks: Number,
  sports: String,
  remarks: String
});

const Student = mongoose.model("Student", StudentSchema);

/* Teacher Login POST */
app.post("/teacher-login", (req, res) => {
  const { email, password } = req.body;

  if (email === "teacher@example.com" && password === "teacher123") {
    res.json({ message: "Teacher login successful" });
  } else {
    res.status(401).json({ message: "Invalid teacher credentials" });
  }
});

/* Add Student */
app.post("/add-student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding student" });
  }
});

/* Student Login POST */
app.post("/student-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email, password });

    if (student) {
      res.json(student);
    } else {
      res.status(401).json({ message: "Invalid student login" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
});

/* Student Dashboard */
app.get("/student/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching student" });
  }
});

/* Start Server */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});