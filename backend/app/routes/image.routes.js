const express = require("express");
const multer = require('../config/multer')
const image = require('../controllers/Image.controller')
module.exports = (app) => {
    const router = express.Router();
    router.route("/uploadImage")
        .post(multer.Image.single("image"),image.uploadImage)

    router.route('/:filename')
        .get(image.getImage)

    app.use("/api/image", router); 
};