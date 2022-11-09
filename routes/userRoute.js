const express = require("express");
const secure = require("md5");
const mongoose = require("mongoose");

const router = express.Router();

const Student = require("../models/userModel");

router.route("/register").post((req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const nationality = req.body.nationality;
  const fatherName = req.body.fatherName;
  const dateOfBirth = req.body.dateOfBirth;
  const whatsapp = req.body.whatsapp;
  const courseName = req.body.courseName;
  const email = req.body.email;
  const password = secure(req.body.password);
  const gender = req.body.gender;

  Student.findOne({ email: email }, (err, student) => {
    if (student) {
      res.send({ message: "Already registered! Try login!" });
    } else {
      const user = new Student({
        fName,
        lName,
        nationality,
        fatherName,
        dateOfBirth,
        whatsapp,
        courseName,
        email,
        password,
        gender,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully registered! Please login now!" });
        }
      });
    }
  });
});

router.route("/login").post((req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email: email }, (err, student) => {
    if (student) {
      if (secure(password) === student.password) {
        res.send({ message: "Login successfully", student: student });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

router.route("/students").get((req, res) => {
  Student.find().then((foundStudent) => res.json(foundStudent));
});

module.exports = router;
