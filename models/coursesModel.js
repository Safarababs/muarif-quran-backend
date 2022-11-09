const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    lowercase: true,
  },
  day: String,
  hour: Number,
  link: String,
  urdu: String,
  teacher: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
