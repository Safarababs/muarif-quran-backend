const express =   require("express");
const router = express.Router();
const Image = require("../models/imagesModal");


router.route("/galleryUpload").post((req, res) =>{
    const title = req.body.title;
    const link = req.body.link

    const newImage = new Image({
        title,
        link
    });

    newImage.save();
});

router.route("/gallery").get((req, res) =>{
    Image.find()
        .then(foundImage => res.json(foundImage))
});



module.exports = router;