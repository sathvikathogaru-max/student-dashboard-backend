const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect(
"mongodb+srv://teacher:teacher123@cluster0.uakpbjz.mongodb.net/studentportal?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));


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
    res.json({ success: true, role: "teacher" });
  } else {
    res.json({ success: false, message: "Invalid teacher credentials" });
  }

});


/* ---------------- STUDENT LOGIN ---------------- */

app.post("/student-login", async (req, res) => {

  const { email, password } = req.body;

  const student = await Student.findOne({ email, password });

  if (student) {
    res.json({ success: true, student });
  } else {
    res.json({ success: false, message: "Invalid student login" });
  }

});


/* ---------------- ADD STUDENT ---------------- */

app.post("/add-student", async (req, res) => {

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

});


/* ---------------- GET ALL STUDENTS ---------------- */

app.get("/students", async (req, res) => {

  const students = await Student.find();

  res.json(students);

});


/* ---------------- SERVER ---------------- */

app.get("/", (req, res) => {
  res.send("Student Portal Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});