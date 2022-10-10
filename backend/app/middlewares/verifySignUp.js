const db = require('../models')
const User = db.user;
const Roles = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username đã được sử dụng!" });
      return;
    }

    // Email
    // User.findOne({
    //   email: req.body.email,
    // }).exec((err, user) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }

    //   if (user) {
    //     res.status(400).send({ message: "Failed! Email đã được sử dụng!" });
    //     return;
    //   }

    //   next();
    // });
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.Roles) {
    for (let i = 0; i < req.body.Roles.length; i++) {
      if (!Roles.includes(req.body.Roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.Roles[i]} không tồn tại!`,
        });
        return;
      }
    }
  }

  next();
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};
module.exports = verifySignUp;

