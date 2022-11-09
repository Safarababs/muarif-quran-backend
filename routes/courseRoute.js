const express = require("express");
const router = express.Router();
const Course = require("../models/coursesModel");

router.route("/courseUpload").post((req, res) => {
  const courseName = req.body.courseName;
  const hour = req.body.hour;
  const day = req.body.day;
  const link = req.body.link;
  const urdu = req.body.urdu;
  const teacher = req.body.teacher;

  const newCourse = new Course({
    courseName,
    hour,
    day,
    link,
    urdu,
    teacher,
  });

  newCourse.save();
});

router.route("/courses").get((req, res) => {
  Course.find().then((foundCourse) => res.json(foundCourse));
});

module.exports = router;
