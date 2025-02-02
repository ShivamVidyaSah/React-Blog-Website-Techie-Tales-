import mongoose from "mongoose";

//Schema for storing the token in the database
const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
  
})

//This will help create a MongoDB model named "token", based on the schema tokenSchema.
//Mongoose will automatically create a collection named tokens (MongoDB pluralizes model names).
const token = mongoose.model('token', tokenSchema);


export default token;
// will be importing it in user-controller.js
