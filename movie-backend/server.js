const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const { addUser, login } = require("./controllers/userController");
const { addReview, getReviewList, deleteReview, editReview } = require('./controllers/reviewController');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8010;
const MONGO_URL = "mongodb+srv://23ad064:w0qanl8lUURDVF4k@cluster0.m6sthuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB has connected Successfully"))
    .catch((error)=> () => console.log("Error connecting MongoDB",error));

app.post("/user/add", addUser);
app.post("/user/login", login);

app.post('/review/add', addReview);           
app.get('/review/list', getReviewList);       
app.put('/review/edit/:id', editReview);      
app.delete('/review/delete/:id', deleteReview);

app.listen(PORT,() => {
    console.log("Server Started: ", PORT);
});