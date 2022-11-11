require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const DB = process.env.PASSWORD;

mongoose.connect(
  "mongodb+srv://safar-admin:" +
    DB +
    "@mflix.zags8.mongodb.net/muarif-e-quran?retryWrites=true&w=majority",
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
  res.send("Hey welcome to your backend server");
});

app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/lectureRoute"));
app.use("/", require("./routes/imageRoute"));
app.use("/", require("./routes/courseRoute"));

app.listen(process.env.PORT || 5000, function () {
  console.log("express server is running on port " + process.env.PORT);
});
