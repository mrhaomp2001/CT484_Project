const mongoose = require("mongoose");
const user = require("../models/user.models");


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.test = (req, res) => {
    res.status(200).send("testpost");
}

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};


exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await user.find({ _id: { $ne: req.params.id } }).select([
        "name",
        "email",
        "username",
        "roles",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
exports.findOne = async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await user.findOne(condition).select([
            'name',
            'date',
            'introduce',
            'avatar_Url',
        ]);
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy user"}));
        }
        return res.send(document);
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể tìm thấy user với id = ${req.params.id} `})
        )
    }
}
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next (
            res.status(400).json({ Message: "thông tin không thế thay đổi"})
        )
    }
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await user.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy user"}));
        }
        return res.send({ message: "đã update thành công", body: req.body});
    }
    catch(error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update user với id = ${req.params.id} `})
        )
    }
}


exports.delete = async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await user.findOneAndDelete(condition);
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy user"}));
        }
        return res.send({ message: "đã xóa user thành công"});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa user với id = ${req.params.id} `})
        )
    }
}
exports.deleteAll = async (req, res, next) => {
    try{
        const data = await user.deleteMany({});
        return res.send({ message: `${data.deletedCount}  user đã xóa thành công`});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả user`})
        )
    }
}



