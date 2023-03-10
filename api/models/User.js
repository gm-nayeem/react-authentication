const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: false,
        default: ""
    },    
    email: {
        type: String,
        require: false,
        default: ""
    },    
    profilePic: {
        type: String,
        require: false,
        default: "",
    },
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
