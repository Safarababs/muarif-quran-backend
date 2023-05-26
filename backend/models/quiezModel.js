const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  city: String,
  answers: [String],
  obtainedMarks: Number,
  questionResults: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
