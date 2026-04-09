const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect(
  "mongodb+srv://teacher:teacher123@cluster0.uakpbjz.mongodb.net/studentportal?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error:", err));


/* ---------------- STUDENT MODEL ---------------- */

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  marks: Number,
  sports: String
});

const Student = mongoose.model("Student", StudentSchema);


/* ---------------- TEACHER LOGIN ---------------- */

app.post("/teacher-login", (req, res) => {

  const { email, password } = req.body;

  if (email === "teacher@example.com" && password === "teacher123") {
    return res.json({ success: true, role: "teacher" });
  }

  res.json({ success: false, message: "Invalid teacher credentials" });

});


/* ---------------- STUDENT LOGIN ---------------- */

app.post("/student-login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });

    if (student) {
      return res.json({ success: true, student });
    }

    res.json({ success: false, message: "Invalid student login" });

  } catch (error) {

    res.status(500).json({ error: "Server error" });

  }

});


/* ---------------- ADD STUDENT ---------------- */

app.post("/add-student", async (req, res) => {

  try {

    const { name, email, password, marks, sports } = req.body;

    const newStudent = new Student({
      name,
      email,
      password,
      marks,
      sports
    });

    await newStudent.save();

    res.json({ message: "Student added successfully ✅" });

  } catch (error) {

    res.status(500).json({ error: "Error adding student" });

  }

});


/* ---------------- GET ALL STUDENTS ---------------- */

app.get("/students", async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {

    res.status(500).json({ error: "Error fetching students" });

  }

});


/* ---------------- ROOT ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Student Portal Backend Running 🚀");
});


/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});