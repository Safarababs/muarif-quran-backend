require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
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

app.post("/result", (req, res) => {
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
