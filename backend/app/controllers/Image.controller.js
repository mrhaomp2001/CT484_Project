const mongoose = require("mongoose");
const uri = require("../config").db.uri;
const multer = require("../config/multer");

let bucketImage;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucketImage = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "image",
  });
});

exports.uploadImage = (req, res) => {
  res.status(200).send("File uploaded successfully");
};

exports.getImage = async (req, res) => {
  const file = bucketImage
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      bucketImage.openDownloadStreamByName(req.params.filename).pipe(res);
    });
};
