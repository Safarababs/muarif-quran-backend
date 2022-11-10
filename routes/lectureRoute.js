const express = require("express");
const router = express.Router();
const Lecture = require("../models/lectureModel");

router.route("/create").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const link = req.body.link;
  const courseName = req.body.courseName;

  const newLecture = new Lecture({
    title,
    content,
    link,
    courseName,
  });

  newLecture.save();
});

router.route("/lectures").get((req, res) => {
  Lecture.find().then((foundLecture) => res.json(foundLecture));
  res.send(foundLecture);
});

module.exports = router;
