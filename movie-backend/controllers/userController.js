const model = require("../models/user");

const addUser = async (req,res) => {

    const body= {
        user_id: req.body.user_id,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_name: req.body.user_name
    };

    try {
        await model.insertOne(body);
        res.status(201).send({message: "Success"});
    } catch  (err){
        console.log("Error",err);
        res.status(400).send({message: "Inseration failed!"});
    }

};

const login = async (req,res) => {
 const { user_email, user_password } = req.body;

    try {
        const user = await model.findOne({ user_email: user_email });

        if (!user) {
            return res.status(400).send({ message: "Invalid Email or Password" });
        }

        if (user.user_password !== user_password) {
            return res.status(400).send({ message: "Invalid Email or Password" });
        }

        res.status(200).send({ message: "Login successful", user: user });
    } catch (err) {
        console.log("Error", err);
        res.status(500).send({ message: "Login failed!" });
    }
};

module.exports = {addUser, login};