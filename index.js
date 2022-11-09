require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log("successfully connected with database"))
  .catch((err) => console.log("Monogdb connection error", err));

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
