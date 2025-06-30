const reviewModel = require('../models/review');


const addReview = async (req, res) => {
     const body = {
        review_id: req.body.review_id,
        movie_id: req.body.movie_id,
        user_name: req.body.user_name,
        rating: req.body.rating,
        description: req.body.description,
    };

    try {
        await reviewModel.create(body); 
        res.status(201).send({ message: "Success" });
    } catch (err) {
        console.log("Error", err);
        res.status(400).send({ message: "Insertion failed!" });
    }
};

const getReviewList = async (req, res) => {
    try {
        const result = await reviewModel.find();
        res.status(200).send(result);
    } catch (err) {
        console.log("Error", err);
        res.status(400).send({ message: "Get failed!" });
    }
};

const deleteReview = async (req, res) => {
    const id = req.params.id;

    try {
        await reviewModel.findOneAndDelete({
            review_id: id,
        });
        res.status(200).send("Deletion Success");
    } catch (err) {
        console.log("Error", err);
        res.status(400).send({ message: "Deletion failed!" });
    }
};

const editReview = async (req, res) => {
    const id = req.params.id;
    const { rating, description } = req.body;

    try {
        await reviewModel.findOneAndUpdate(
            { review_id: id },
            { rating: rating, description: description }
        );
        res.status(200).send("Edit Success");
    } catch (err) {
        console.log("Error", err);
        res.status(400).send({ message: "Edit failed!" });
    }
};

module.exports = { addReview, getReviewList, deleteReview, editReview };