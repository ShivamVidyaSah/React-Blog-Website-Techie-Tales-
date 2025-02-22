//we will be making the schema for the user in this file
//using mongoose to make the schema

import mongoose from "mongoose";

//we ate making a user schema using a built-in mongoose method
//called .Schema()
//The following example will show how we make a schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//Now we have to provide the database 
// in which we want this schema to be created

//this mongoose.model() method is used to create a
//collection of a particular database of MongoDB
//we have passed two parameters here. One is the username and
// the other is the schema we have created above and we are storing it inside
// a variable
const user = mongoose.model('user', userSchema);


export default user;