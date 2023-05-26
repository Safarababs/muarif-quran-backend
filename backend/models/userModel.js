const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lName: {
      type: String,
      required: true,
      lowercase: true,
    },
    nationality: {
      type: String,
      required: true,
      lowercase: true,
    },
    fatherName: {
      type: String,
      required: true,
      lowercase: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      lowercase: true,
    },
    whatsapp: {
      type: String,
      required: true,
      lowercase: true,
    },
    courseName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
  },
  { timestaps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
