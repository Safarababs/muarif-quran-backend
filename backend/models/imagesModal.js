const mongoose = require("mongoose");

const imageSchema = {
    title:{
        type:String,
        lowercase:true,
    },
    content:{
        type:String,
        lowercase:true,
    },
    link:String
}

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;