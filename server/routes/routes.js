//This file will store all the routes for our API

import express from "express";
import {signupUser, loginUser} from "../controller/user-controller.js";


//This will allow us to to define specific routes and 
//middleware for different parts of your application, 
//such as users, products, or orders, in a more maintainable way.
const router = express.Router();

//This will help us hit the post route from the sign-up page
router.post("/signup", signupUser);
//This sign up function is the call-back function that is present in the 
//user-controller.js file and is working the same as the function(req,res)
//that we saw during the course on Udemy

//we are writing another API for the login part
router.post("/login", loginUser);
//This sign up function is the call-back function that is present in the 
//user-controller.js file and is working the same as the function(req,res)
//that we saw during the course on Udemy


export default router;