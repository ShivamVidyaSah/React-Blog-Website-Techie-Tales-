//This API will controll the call-back function for the signup
// of the user from the post route

//This part will be a little bit complicated as we have to validate
// the users input and pass an error when a wrong input is given
//for that we have to make a schema in the database


//importing the varaible storing the scheme
import User from "../model/user.js";


import bcrypt from "bcrypt";
//this bcrypt package help in encrypting  our password
//and convert it into a ramdon set of string to protect it from attacks

const signupUser = async (req,res) =>{
    try{

        const salt = await bcrypt.genSalt();
        // the salt here is a set of random string that will be appended at the beginning of 
        //Remember that our password will also be converted to a set os random string and this
        //salt will appended at  the beginning
        //and you can mention the length of the salt in the bracket like how much oof the lenght yyou want it to
        //be eg: await bcrypt.genSalt(30); will generate a salt of length 30;

        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        //this hashed variable will store the hashed or encrypted password and
        //the salt will get appended


        const user = { username: req.body.username, name : req.body.name, password: hashedPassword}; 
        
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

export default signupUser;