const express = require("express");
const router = express.Router();
const students = require("../data/students");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

router.post("/", (req, res) => {
  const { name, age, course, email } = req.body;

  if (!name || !age || !course || !email) {
    return res.status(400).json({
      success: false,
      message: "Name, age, course and email are required"
    });
  }

  const newStudent = {
    id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name,
    age,
    course,
    email
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, age, course, email } = req.body;

  if (!name || !age || !course || !email) {
    return res.status(400).json({
      success: false,
      message: "Name, age, course and email are required"
    });
  }

  student.name = name;
  student.age = age;
  student.course = course;
  student.email = email;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

module.exports = router;