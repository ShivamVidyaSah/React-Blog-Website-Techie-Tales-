//This API will controll the call-back function for the signup
// of the user from the post route

//This part will be a little bit complicated as we have to validate
// the users input and pass an error when a wrong input is given
//for that we have to make a schema in the database


//importing the varaible storing the scheme
import User from "../model/user.js";


const signupUser = async (req,res) =>{
    try{
        const user = req.body; // this will store the entire body of the
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