const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    review_id: Number,
    movie_id: Number,
    user_name: String,
    rating: Number,
    description: String,
})

module.exports = mongoose.model("review",reviewSchema);