const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const  config = require('./index')

exports.Music =  multer({
  storage: new GridFsStorage({
    url: config.db.uri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "songs"
        };
        resolve(fileInfo);
      });
    }
  })
});

exports.Image =  multer({
  storage: new GridFsStorage({
    url: config.db.uri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        console.log(file);
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "image"
        };
        resolve(fileInfo);
      });
    }
  })
});