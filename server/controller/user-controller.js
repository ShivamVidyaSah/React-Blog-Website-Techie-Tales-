//This API will controll the call-back function for the signup
// of the user from the post route

//This part will be a little bit complicated as we have to validate
// the users input and pass an error when a wrong input is given
//for that we have to make a schema in the database


import Token from "../model/token.js"

import dotenv from "dotenv";
dotenv.config();

//importing the varaible storing the scheme
import User from "../model/user.js";


import jwt from "jsonwebtoken";
// we will be using this for authentication


import bcrypt from "bcrypt";
//this bcrypt package help in encrypting  our password
//and convert it into a ramdon set of string to protect it from attacks

const signupUser = async(req,res) =>{
    try{

        //Remember that anything you hit the database for anything, it will always be an async request and we
        //have to use async and await.
        const salt = await bcrypt.genSalt();
        // the salt here is a set of random string that will be appended at the beginning of 
        //Remember that our password will also be converted to a set os random string and this
        //salt will appended at  the beginning
        //and you can mention the length of the salt in the bracket like how much oof the lenght yyou want it to
        //be eg: await bcrypt.genSalt(30); will generate a salt of length 30;

        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //this hashed variable will store the hashed or encrypted password and
        //the salt will get appended


        const user = { username: req.body.username, name : req.body.name, email:req.body.email, password: hashedPassword}; 
        
        // console.log(user);
        // previously this was written as  const user = req.body;
        // this was supposed to store the entire body of the
        //request parameter like username, name and password.

        const newUser = new User(user);
        //user contains the req.body and new User(user) passes the user to 
        //user.js for validation
        // newUser variable stores the validated object

        await newUser.save(); // saves the data directly in the database
        return res.status(200).json({msg:"SignUp successful"});
        //the above line is used in an Express.js route handler to send a JSON 
        // response back to the front-end.
    }catch(error){
        res.status(500).json({msg:"Error while signing up"});
    }
};


const loginUser = async(req,res) => {
    try{
    //the .find() function helps us finding the object in the database. This is an old function
    //Two new function are .findOne( condition ) - if we are looking for any one object in the database
    //.findMany( condition ) - if we are looking for more than one Object in the database
    // the "condition" is what we want to match for searching like do we want to match the user name or password etc
    //it will return the whole object inlcuding username, password, name etc value
    let user = await User.findOne({
        $or:[
            {username:req.body.usernameormail},
            {email:req.body.usernameormail}
        ]
    });
    //This is $or will check whether your username or email is present, if either is present it will
    //return true

    if(!user){
        return res.status(400).json({msg:"Invalid username or email"});
    }

    //if username matched then we have to compare using password
    let match = await bcrypt.compare(req.body.password, user.password);
    // console.log(match + " checking comparing");
    //the bcrypt.compare method is used to compare two passoword. It takes 3 parameters
    //a plaintext, the hashed password and a callback function
    if(match){
        //if match, we will have to generate an access token and a refresh token with the help of JWT 
        // we installed jsonwebtoken library

        //The standard expiry time of access token is 15 mins
        // we use the jwt.sign() method to generate the access token. It takes two parameters
        //1. body of the const user( we have to pass it in JSON format) that is coming from the database above 
        //2. is a secret key (We ill use a library called "crypto")
        //The commands in the terminal goes like
        // require('crypto').randomBytes(64).toString('hex')
        // Now here crypto is the name of the library
        //.randomBytes(64) is a function on the library and will generated an output of 64 characters
        // and .torSting('hex') converts the output into string hexadecimal format
        // we will first write 'node' in the terminal then write the command
        //we are storing the key in the .env file for both the access and refresh token
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '55m'} );
        
        //we need the refresh token because the access token expires after sometime( you can set the expiry time)
        // but the refresh token does not, and after the access token expires, 
        // we can use the refresh token to re-generate the access token
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);


        //Since we know that we need the refresh token to re-create the access token,
        // we will have to store it somewhere for every user as a new token will be generated for every user
        // we will store it in the database

        const newToken = new Token({token: refreshToken});
        await newToken.save();


        return res.status(200).json({accessToken: accessToken , refreshToken: refreshToken, name: user.name, username: user.username});

    }

    }catch(error){
        res.status(500).json({msg:"Error while logging in the user"});
    }
}

export {signupUser, loginUser};