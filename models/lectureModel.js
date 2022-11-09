const mongoose = require("mongoose");

const videoSchema = {
    title:{
        type:String,
        required:true,
        lowecase:true
    },
    content:String,
    link:String,
    courseName:String
}

const Lecture = mongoose.model("Lecture", videoSchema);

module.exports = Lecture;