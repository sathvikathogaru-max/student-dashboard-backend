const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/students", (req, res) => {
  res.json([
    { name: "John", marks: 85 },
    { name: "Sara", marks: 90 },
    { name: "Mike", marks: 78 }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});