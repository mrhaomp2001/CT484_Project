const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "username is required"],
        },
        avatar_Url: {
            type: String,
            default: 'http://localhost:8088/api/image/cuoi.gif'
        },     
        email: {
            type: String,
            trim: true,
            lowercas: true,
        },
        password: String,
        name: String,
        introduce: String,
        date: String,
        premium: {
            type: Boolean,
            default: false,
        },
        follow: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            },
        ],
        ban: Boolean,
    },

    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("user", schema);