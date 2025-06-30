const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("user",userSchema);