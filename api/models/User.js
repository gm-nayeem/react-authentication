const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    user_name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    profilePic: {
        type: String,
        require: false,
        default: ""
    }
});

module.exports = mongoose.model("User", userSchema);
