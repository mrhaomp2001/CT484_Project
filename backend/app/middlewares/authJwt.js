const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require('../models')
const User = db.user;
const Role = db.user;


exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(411).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  User.findById(req.userId).populate("roles", "-__v").exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    for (let i = 0; i < user.roles.length; i++) {
      if (user.roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

exports.isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

// const authJwt = {
//   verifyToken,
//   isAdmin,
//   isModerator,
// };
// module.exports = authJwt;