const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Result = require("../models/userModel");

router.route("/result").post((req, res) => {
  const { name, phoneNumber, city, obtainedMarks } = req.body;
  
  const resultDetails = obtainedMarks.resultDetails.map((result) => ({
    question: result.question.question,
    answer: result.answer,
    isCorrect: result.isCorrect,
  }));

  const result = new Result({
    name,
    phoneNumber,
    city,
    obtainedMarks: obtainedMarks.obtainedMarks,
    questionResults: resultDetails,
  });

  result.save()
    .then(() => {
      res.json({ message: "Successfully sent" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error occurred while saving the result" });
    });
    
});
  
module.exports = router;
