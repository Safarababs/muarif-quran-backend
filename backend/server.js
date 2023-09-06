require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const fs = require('fs');
const { log } = require("console");

const corsOptions = {
  origin: "http://localhost:3000", 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const DB = process.env.PASSWORD;
mongoose.set('strictQuery', false);
mongoose.connect(
  "mongodb+srv://safar-admin:sn5125a1@mflix.zags8.mongodb.net/muarif-e-quran?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("database Connected Successfully");
    } else {
      console.log("Error in Db connection", err);
    }
  }
);



// ------------end of middleware---------

// routes

app.get("/", (req, res) => {
  res.send("Hey welcome to your backend server of muarif quiz");
});

const resultSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  city: String,
  obtainedMarks: Number,
  answers: [String], // Updated field
  questionResults: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);


app.post("/result", (req, res) => {
  const { name, phoneNumber, city, obtainedMarks, answers, shuffledQuestions } = req.body;

  const parsedAnswers = JSON.parse(answers); // Convert back to array
  const parsedQuestions = JSON.parse(shuffledQuestions);
  
  const questionResults = parsedAnswers.map((answer, index) => ({
    question: parsedQuestions[index].question,
    selectedAnswer: answer,
    correctAnswer: parsedQuestions[index].correctAnswer,
  }));
  
  const result = new Result({
    name,
    phoneNumber,
    city,
    obtainedMarks,
    answers: parsedAnswers, // Use parsedAnswers here
    questionResults,
  });

  result.save()
    .then(() => {
      res.json({ message: "Successfully sent" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error occurred while saving the result" });
      console.log(error)
    });
});



// this result for agha sb only

app.get("/results", (req, res) => {
  Result.find().then((foundResult) => res.json(foundResult));
});




app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/lectureRoute"));
app.use("/", require("./routes/imageRoute"));
app.use("/", require("./routes/courseRoute"));


app.listen( 5000, function () {
  console.log("express server is running on port 5000");
});
