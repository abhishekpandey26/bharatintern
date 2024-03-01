const mongoose = require("mongoose");
// importing the Mongoose library in a Node.js application

mongoose.connect("mongodb://localhost:27017/project1")
    .then(() => {
        console.log('database connected');
        // if the connection is successful display this message 
    })
    .catch((error) => {
        console.error('Failed to connect to database');
        // else failed 
    });
    // using Mongoose to connect to a MongoDB database named "project1" running on the local machine. 

const logInSchema   = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
//logInSchema defines a Mongoose schema for a login-related entity with two fields: "name" and "password," both of type String and both required

const collection = mongoose.model('collection2', logInSchema);
// creating a Mongoose model based on the previously defined logInSchema

module.exports = collection;
